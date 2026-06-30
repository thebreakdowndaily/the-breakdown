const { supabase } = require('./lib/supabase');
const crypto = require('crypto');

const COOKIE_SECRET = process.env.SESSION_SECRET || 'the-breakdown-fact-check-cms-secret-key-change-me';
const COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours

// ==================== COOKIE AUTH HELPERS ====================
function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', COOKIE_SECRET).update(data).digest('base64url');
  return data + '.' + sig;
}

function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [data, sig] = parts;
    const expected = crypto.createHmac('sha256', COOKIE_SECRET).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach(c => {
    const parts = c.trim().split('=');
    if (parts.length >= 2) cookies[parts[0].trim()] = parts.slice(1).join('=');
  });
  return cookies;
}

function requireAuth(event) {
  const cookies = parseCookies(event.headers.cookie || '');
  const token = cookies['tb_session'];
  if (!token) return null;
  return verifyToken(token);
}

function setCookie(token) {
  return `tb_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
}

function clearCookie() {
  return `tb_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(body)
  };
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'the-breakdown-salt').digest('hex');
}

// ==================== ROUTER ====================
exports.handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api', '') || '/';
  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : {};
  const params = event.queryStringParameters || {};
  const segments = path.split('/').filter(Boolean); // ['api', 'auth', 'login'] etc.

  // Strip leading 'api' segment if present
  if (segments[0] === 'api') segments.shift();

  const route = '/' + segments.join('/');

  try {
    // ===== PUBLIC ROUTES (no auth) =====
    // POST /api/auth/login
    if (route === '/auth/login' && method === 'POST') {
      const { email, password } = body;
      if (!email || !password) return json(400, { error: 'Email and password required' });

      const { data: users, error } = await supabase
        .from('admin_users')
        .select('id, email, name, password_hash')
        .eq('email', email.toLowerCase().trim())
        .limit(1);

      if (error) return json(500, { error: 'Server error' });
      if (!users || users.length === 0) return json(401, { error: 'Invalid credentials' });

      const user = users[0];
      if (hashPassword(password) !== user.password_hash) return json(401, { error: 'Invalid credentials' });

      const token = signToken({ id: user.id, email: user.email, name: user.name, exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE });
      return json(200, { success: true, user: { id: user.id, name: user.name, email: user.email } }, { 'Set-Cookie': setCookie(token) });
    }

    // POST /api/auth/logout
    if (route === '/auth/logout' && method === 'POST') {
      return json(200, { success: true }, { 'Set-Cookie': clearCookie() });
    }

    // GET /api/stories/published (public)
    if (route === '/stories/published' && method === 'GET') {
      const { data, error } = await supabase
        .from('stories')
        .select('id, title, slug, category, summary, fact_check_image, author, read_time, published_at, created_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) return json(500, { error: 'Failed to fetch stories' });
      return json(200, { stories: data });
    }

    // GET /api/stats (public — or we can protect it)
    if (route === '/stats' && method === 'GET') {
      const user = requireAuth(event);
      if (!user) return json(401, { error: 'Unauthorized' });

      const { count: total } = await supabase
        .from('stories').select('id', { count: 'exact', head: true });
      const { count: published } = await supabase
        .from('stories').select('id', { count: 'exact', head: true }).eq('status', 'published');
      const { count: drafts } = await supabase
        .from('stories').select('id', { count: 'exact', head: true }).eq('status', 'draft');
      const { data: recent } = await supabase
        .from('stories').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5);

      return json(200, { stats: { total: total || 0, published: published || 0, drafts: drafts || 0 }, recent: recent || [] });
    }

    // ===== AUTHENTICATED ROUTES =====
    const user = requireAuth(event);
    if (!user) return json(401, { error: 'Unauthorized' });

    // GET /api/auth/me
    if (route === '/auth/me' && method === 'GET') {
      return json(200, { user: { id: user.id, name: user.name, email: user.email } });
    }

    // ===== STORIES CRUD =====
    // GET /api/stories (list, with optional status filter)
    if (route === '/stories' && method === 'GET') {
      let query = supabase.from('stories').select('*').order('created_at', { ascending: false });
      if (params.status) query = query.eq('status', params.status);
      const { data, error } = await query;
      if (error) return json(500, { error: 'Failed to fetch stories' });
      return json(200, { stories: data });
    }

    // POST /api/stories (create)
    if (route === '/stories' && method === 'POST') {
      const { title, category, summary, content } = body;
      if (!title) return json(400, { error: 'Title is required' });

      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

      const { data, error } = await supabase
        .from('stories')
        .insert({ title, slug, category: category || 'Uncategorized', summary: summary || '', content: content || '', author: user.name || 'The Breakdown' })
        .select().single();

      if (error) return json(500, { error: 'Failed to create story' });
      return json(201, { story: data });
    }

    // Routes with dynamic :id parameter
    // Patterns: /stories/:id, /stories/:id/sources, /stories/:id/publish, /sources/:id
    if (segments.length >= 2 && segments[0] === 'stories') {
      const storyId = segments[1];

      // GET /api/stories/:id
      if (segments.length === 2 && method === 'GET') {
        const { data, error } = await supabase
          .from('stories').select('*, story_sources(*)').eq('id', storyId).limit(1);
        if (error) return json(500, { error: 'Failed to fetch story' });
        if (!data || data.length === 0) return json(404, { error: 'Story not found' });
        return json(200, { story: data[0] });
      }

      // PUT /api/stories/:id
      if (segments.length === 2 && method === 'PUT') {
        const updates = { ...body };
        delete updates.id; delete updates.created_at; delete updates.updated_at; delete updates.story_sources;
        const { data, error } = await supabase.from('stories').update(updates).eq('id', storyId).select().single();
        if (error) return json(500, { error: 'Failed to update story' });
        if (!data) return json(404, { error: 'Story not found' });
        return json(200, { story: data });
      }

      // DELETE /api/stories/:id
      if (segments.length === 2 && method === 'DELETE') {
        const { error } = await supabase.from('stories').delete().eq('id', storyId);
        if (error) return json(500, { error: 'Failed to delete story' });
        return json(200, { success: true });
      }

      // ===== SOURCES (nested under stories) =====
      // GET /api/stories/:id/sources
      if (segments.length === 3 && segments[2] === 'sources' && method === 'GET') {
        const { data, error } = await supabase
          .from('story_sources').select('*').eq('story_id', storyId).order('sort_order', { ascending: true });
        if (error) return json(500, { error: 'Failed to fetch sources' });
        return json(200, { sources: data });
      }

      // POST /api/stories/:id/sources
      if (segments.length === 3 && segments[2] === 'sources' && method === 'POST') {
        const { label, url, source_type, verified } = body;
        if (!label || !url) return json(400, { error: 'Label and URL required' });

        const { count } = await supabase
          .from('story_sources').select('id', { count: 'exact', head: true }).eq('story_id', storyId);

        const { data, error } = await supabase
          .from('story_sources')
          .insert({ story_id: storyId, label, url, source_type: source_type || 'web', verified: verified || false, sort_order: (count || 0) + 1 })
          .select().single();
        if (error) return json(500, { error: 'Failed to add source' });
        return json(201, { source: data });
      }

      // ===== PUBLISH =====
      // POST /api/stories/:id/publish
      if (segments.length === 3 && segments[2] === 'publish' && method === 'POST') {
        const { data: story, error } = await supabase
          .from('stories').select('*').eq('id', storyId).single();
        if (error || !story) return json(404, { error: 'Story not found' });

        const { data: updated, error: updateError } = await supabase
          .from('stories').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', storyId).select().single();
        if (updateError) return json(500, { error: 'Failed to publish story' });

        await supabase.from('publish_log').insert({ story_id: storyId, published_by: user.id, deploy_status: 'success' });

        return json(200, { success: true, story: updated });
      }
    }

    // ===== SOURCES (standalone) =====
    // PUT /api/sources/:id
    if (segments.length === 2 && segments[0] === 'sources' && method === 'PUT') {
      const updates = { ...body }; delete updates.id; delete updates.story_id; delete updates.created_at;
      const { data, error } = await supabase.from('story_sources').update(updates).eq('id', segments[1]).select().single();
      if (error) return json(500, { error: 'Failed to update source' });
      return json(200, { source: data });
    }

    // DELETE /api/sources/:id
    if (segments.length === 2 && segments[0] === 'sources' && method === 'DELETE') {
      const { error } = await supabase.from('story_sources').delete().eq('id', segments[1]);
      if (error) return json(500, { error: 'Failed to delete source' });
      return json(200, { success: true });
    }

    // ===== GENERATORS =====
    // POST /api/generate/instagram
    if (route === '/generate/instagram' && method === 'POST') {
      const { data: story, error } = await supabase.from('stories').select('*').eq('id', body.storyId).single();
      if (error || !story) return json(404, { error: 'Story not found' });

      const slides = [
        { type: 'hook', text: story.summary ? `${story.summary.split('.')[0]}.` : story.title },
        { type: 'context', text: `What Happened\n${story.summary || 'Full breakdown on our website.'}` },
        { type: 'hidden_fact', text: `🔍 The Hidden Fact\n${story.content ? story.content.split('. ').slice(0, 2).join('. ') : 'Deeper analysis available.'}` },
        { type: 'stat', number: story.read_time + '+', label: 'min read', detail: 'Full analysis on site' },
        { type: 'why_matters', text: `Why It Matters\nThis story affects how we understand the world. Read the full breakdown.` },
        { type: 'sources', sources: `Sources verified from ${story.source_verification || 'multiple reliable outlets'}` },
        { type: 'cta', handle: '@thebreakdowndaily', tagline: 'Follow for daily breakdowns of stories that matter.' }
      ];
      const caption = `${story.title}\n\n${story.summary || ''}\n\n📌 Save this for later\n🔔 Follow @thebreakdowndaily\n\n#TheBreakdown #${(story.category || 'News').replace(/\s+/g, '')} #FactCheck #NewsAnalysis`;

      await supabase.from('stories').update({ instagram_caption: caption, instagram_carousel: slides }).eq('id', body.storyId);
      return json(200, { slides, caption });
    }

    // POST /api/generate/youtube
    if (route === '/generate/youtube' && method === 'POST') {
      const { data: story, error } = await supabase.from('stories').select('*').eq('id', body.storyId).single();
      if (error || !story) return json(404, { error: 'Story not found' });

      const script = `# ${story.title}\n\n**Hook (0:00-0:30):**\n${story.summary || 'The biggest story you are not hearing about.'}\n\n**Context (0:30-2:00):**\n${story.content ? story.content.split('. ').slice(0, 4).join('. ') : 'Full breakdown available on our website.'}\n\n**Why It Matters (2:00-3:30):**\nThis is not just news — it is a signal of what comes next.\n\n**Sources & Verification:**\n${story.source_verification || 'Sources linked in description.'}\n\n**Outro (3:30-4:00):**\nLike, subscribe, and hit the bell. Follow @thebreakdowndaily for daily analysis.`;

      await supabase.from('stories').update({ youtube_script: script }).eq('id', body.storyId);
      return json(200, { script });
    }

    // POST /api/generate/x-thread
    if (route === '/generate/x-thread' && method === 'POST') {
      const { data: story, error } = await supabase.from('stories').select('*').eq('id', body.storyId).single();
      if (error || !story) return json(404, { error: 'Story not found' });

      const summaryPoints = story.summary ? story.summary.split('. ').filter(s => s.trim()) : [story.title];
      const tweets = [
        `🧵 ${story.title}\n\nA breakdown of what happened, why it matters, and what comes next.\n\nFollow @thebreakdowndaily for more.`,
        ...summaryPoints.slice(0, 3).map((point, i) => `${i + 1}. ${point.trim()}${point.trim().endsWith('.') ? '' : '.'}`),
        `🔍 The full story with verified sources: thebreakdown.in\n\nWhat are your thoughts? Drop a reply below. 👇`,
        `Follow @thebreakdowndaily for daily breakdowns of geopolitics, tech, economy, and media.\n\nNo pundits. No hype. Just analysis.\n\n#TheBreakdown`
      ];
      const thread = tweets.join('\n\n');

      await supabase.from('stories').update({ x_thread: thread }).eq('id', body.storyId);
      return json(200, { thread, tweets });
    }

    // ===== 404 =====
    return json(404, { error: 'Not found', route, method });
  } catch (err) {
    console.error('API error:', err);
    return json(500, { error: 'Internal server error' });
  }
};
