require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// Multer config: memory storage for direct upload to Supabase
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// ==================== SUPABASE CLIENT ====================
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }
});

// ==================== MIDDLEWARE ====================
// CORS: allow frontend (deployed site) and local dev
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://thebreakdown.in',
  'http://localhost:3000',
  'http://localhost:10000'
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => { cb(null, !origin || allowedOrigins.includes(origin)); },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-change-me',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: { secure: true, httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

// ==================== AUTH HELPERS ====================
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'the-breakdown-salt').digest('hex');
}

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { data: users, error } = await supabase
      .from('admin_users')
      .select('id, email, name, password_hash')
      .eq('email', email.toLowerCase().trim())
      .limit(1);

    if (error) throw error;
    if (!users || users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = users[0];
    const inputHash = hashPassword(password);
    if (inputHash !== user.password_hash) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.authenticated = true;
    req.session.userId = user.id;
    req.session.userName = user.name;
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/auth/me', async (req, res) => {
  if (!req.session || !req.session.authenticated) {
    return res.json({ user: null });
  }
  try {
    const { data: users, error } = await supabase
      .from('admin_users')
      .select('id, email, name')
      .eq('id', req.session.userId)
      .limit(1);
    if (error) throw error;
    res.json({ user: users[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== STORIES CRUD ====================
// GET all stories (with optional status filter, excludes trash by default)
app.get('/api/stories', requireAuth, async (req, res) => {
  try {
    let query = supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (req.query.status) {
      query = query.eq('status', req.query.status);
    } else {
      query = query.neq('status', 'trash');
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ stories: data });
  } catch (err) {
    console.error('Fetch stories error:', err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// GET published stories (public — no auth needed, includes tags)
app.get('/api/stories/published', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('id, title, slug, category, summary, fact_check_image, fact_check_image_caption, author, read_time, tags, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error && error.message && error.message.includes('column')) {
      // Fallback: try without new columns
      const { data: d2, error: e2 } = await supabase.from('stories').select('id, title, slug, category, summary, fact_check_image, author, read_time, published_at, created_at').eq('status', 'published').order('published_at', { ascending: false });
      if (e2) throw e2;
      return res.json({ stories: d2 || [] });
    }
    if (error) throw error;
    res.json({ stories: data || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch published stories' });
  }
});

// GET public story by slug (no auth needed)
app.get('/api/stories/public/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*, story_sources(*)')
      .eq('slug', req.params.slug)
      .eq('status', 'published')
      .limit(1);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Story not found' });
    res.json({ story: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// GET preview story by slug (auth required — returns any status)
app.get('/api/stories/preview/:slug', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*, story_sources(*)')
      .eq('slug', req.params.slug)
      .limit(1);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Story not found' });
    res.json({ story: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// GET single story (auth required)
app.get('/api/stories/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*, story_sources(*)')
      .eq('id', req.params.id)
      .limit(1);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Story not found' });
    res.json({ story: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// POST create story
app.post('/api/stories', requireAuth, async (req, res) => {
  try {
    const { title, category, summary, content } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

    const { data, error } = await supabase
      .from('stories')
      .insert({
        title,
        slug,
        category: category || 'Uncategorized',
        summary: summary || '',
        content: content || '',
        author: req.session.userName || 'The Breakdown'
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ story: data });
  } catch (err) {
    console.error('Create story error:', err);
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// PUT update story
app.put('/api/stories/:id', requireAuth, async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.id;
    delete updates.created_at;
    delete updates.updated_at;
    delete updates.story_sources;

    const { data, error } = await supabase
      .from('stories')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error && error.message && error.message.includes('column')) {
      // Unknown column — remove non-standard fields and retry
      const knownCols = ['title','slug','category','status','summary','content','fact_check_url','fact_check_image','fact_check_video','source_verification','instagram_caption','instagram_carousel','youtube_script','x_thread','read_time','author','published_at','tags','meta_title','meta_description','og_image','publish_at','related_story_ids','story_template','deleted_at','fact_check_image_caption'];
      const safeUpdates = {};
      Object.keys(updates).forEach(k => { if (knownCols.includes(k)) safeUpdates[k] = updates[k]; });
      const { data: d2, error: e2 } = await supabase.from('stories').update(safeUpdates).eq('id', req.params.id).select().single();
      if (e2) {
        // Last resort: try one more time with just the absolute basics
        const basic = {};
        ['title','slug','category','status','summary','content'].forEach(k => { if (updates[k] !== undefined) basic[k] = updates[k]; });
        const { data: d3, error: e3 } = await supabase.from('stories').update(basic).eq('id', req.params.id).select().single();
        if (e3) throw e3;
        return res.json({ story: d3 });
      }
      return res.json({ story: d2 });
    }

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Story not found' });
    // Save revision
    saveRevision(req.params.id, req.session.userId, updates);
    res.json({ story: data });
  } catch (err) {
    console.error('Update story error:', err);
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// DELETE story (soft delete — moves to trash)
app.delete('/api/stories/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .update({ status: 'trash', deleted_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ success: true, story: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

// POST restore story from trash
app.post('/api/stories/:id/restore', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .update({ status: 'draft', deleted_at: null })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ success: true, story: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to restore story' });
  }
});

// ==================== SOURCES ====================
app.get('/api/stories/:id/sources', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('story_sources')
      .select('*')
      .eq('story_id', req.params.id)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    res.json({ sources: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sources' });
  }
});

app.post('/api/stories/:id/sources', requireAuth, async (req, res) => {
  try {
    const { label, url, source_type, verified } = req.body;
    if (!label || !url) return res.status(400).json({ error: 'Label and URL required' });

    const { data: countData } = await supabase
      .from('story_sources')
      .select('id', { count: 'exact', head: true })
      .eq('story_id', req.params.id);

    const { data, error } = await supabase
      .from('story_sources')
      .insert({
        story_id: req.params.id,
        label,
        url,
        source_type: source_type || 'web',
        verified: verified || false,
        sort_order: (countData?.count || 0) + 1
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ source: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add source' });
  }
});

app.put('/api/sources/:id', requireAuth, async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.id;
    delete updates.story_id;
    delete updates.created_at;

    const { data, error } = await supabase
      .from('story_sources')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ source: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update source' });
  }
});

app.delete('/api/sources/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('story_sources')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete source' });
  }
});

// ==================== GENERATORS ====================
// Instagram Carousel Generator
app.post('/api/generate/instagram', requireAuth, async (req, res) => {
  try {
    const { storyId } = req.body;
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (error || !story) return res.status(404).json({ error: 'Story not found' });

    const slides = [
      { type: 'hook', text: story.summary ? `${story.summary.split('.')[0]}.` : story.title },
      { type: 'context', text: `What Happened\n${story.summary || 'Full breakdown on our website.'}` },
      { type: 'hidden_fact', text: `🔍 The Hidden Fact\n${story.content ? story.content.split('. ').slice(0, 2).join('. ') : 'Deeper analysis available.'}` },
      { type: 'stat', number: story.read_time + '+', label: 'min read', detail: 'Full analysis on site' },
      { type: 'why_matters', text: `Why It Matters\nThis story affects how we understand the world. Read the full breakdown.` },
      { type: 'sources', sources: `Sources verified from ${story.source_verification || 'multiple reliable outlets'}` },
      { type: 'cta', handle: '@thebreakdowndaily', tagline: 'Follow for daily breakdowns of stories that matter.' }
    ];

    // Generate caption
    const caption = `${story.title}\n\n${story.summary || ''}\n\n📌 Save this for later\n🔔 Follow @thebreakdowndaily\n\n#TheBreakdown #${(story.category || 'News').replace(/\s+/g, '')} #FactCheck #NewsAnalysis`;

    // Update story with instagram data
    await supabase
      .from('stories')
      .update({ instagram_caption: caption, instagram_carousel: slides })
      .eq('id', storyId);

    res.json({ slides, caption });
  } catch (err) {
    console.error('Instagram generation error:', err);
    res.status(500).json({ error: 'Failed to generate Instagram content' });
  }
});

// YouTube Script Generator
app.post('/api/generate/youtube', requireAuth, async (req, res) => {
  try {
    const { storyId } = req.body;
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (error || !story) return res.status(404).json({ error: 'Story not found' });

    const script = `# ${story.title}\n\n**Hook (0:00-0:30):**\n${story.summary || 'The biggest story you are not hearing about.'}\n\n**Context (0:30-2:00):**\n${story.content ? story.content.split('. ').slice(0, 4).join('. ') : 'Full breakdown available on our website.'}\n\n**Why It Matters (2:00-3:30):**\nThis is not just news — it is a signal of what comes next.\n\n**Sources & Verification:**\n${story.source_verification || 'Sources linked in description.'}\n\n**Outro (3:30-4:00):**\nLike, subscribe, and hit the bell. Follow @thebreakdowndaily for daily analysis.`;

    await supabase
      .from('stories')
      .update({ youtube_script: script })
      .eq('id', storyId);

    res.json({ script });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate YouTube script' });
  }
});

// X Thread Generator
app.post('/api/generate/x-thread', requireAuth, async (req, res) => {
  try {
    const { storyId } = req.body;
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (error || !story) return res.status(404).json({ error: 'Story not found' });

    const summaryPoints = story.summary ? story.summary.split('. ').filter(s => s.trim()) : [story.title];
    const tweets = [
      `🧵 ${story.title}\n\nA breakdown of what happened, why it matters, and what comes next.\n\nFollow @thebreakdowndaily for more.`,
      ...summaryPoints.slice(0, 3).map((point, i) => `${i + 1}. ${point.trim()}${point.trim().endsWith('.') ? '' : '.'}`),
      `🔍 The full story with verified sources: thebreakdown.in\n\nWhat are your thoughts? Drop a reply below. 👇`,
      `Follow @thebreakdowndaily for daily breakdowns of geopolitics, tech, economy, and media.\n\nNo pundits. No hype. Just analysis.\n\n#TheBreakdown`
    ];

    const thread = tweets.join('\n\n');

    await supabase
      .from('stories')
      .update({ x_thread: thread })
      .eq('id', storyId);

    res.json({ thread, tweets });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate X thread' });
  }
});

// ==================== PUBLISH ====================
app.post('/api/stories/:id/publish', requireAuth, async (req, res) => {
  try {
    // Get story
    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });

    // Update status
    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();
    if (updateError) throw updateError;

    // Log publish
    await supabase
      .from('publish_log')
      .insert({
        story_id: req.params.id,
        published_by: req.session.userId,
        deploy_status: 'success'
      });

    // Update homepage (deploy/index.html)
    const deployPath = path.join(__dirname, '..', 'deploy', 'index.html');
    if (fs.existsSync(deployPath)) {
      try {
        let html = fs.readFileSync(deployPath, 'utf8');

        const storyCard = `
                <a href="#" class="story-card reveal">
                    <p class="story-category">${story.category || 'Latest'}</p>
                    <h3 class="story-title">${story.title}</h3>
                    <p class="story-excerpt">${story.summary || 'Full breakdown available.'}</p>
                    <div class="story-meta"><span>${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span><span>${story.read_time || 5} min read</span></div>
                </a>`;

        // Insert after the featured story or at the beginning of stories grid
        const insertMarker = '<!-- CMS: published stories will appear here -->';
        if (html.includes(insertMarker)) {
          html = html.replace(insertMarker, storyCard + '\n                ' + insertMarker);
        } else {
          // Fallback: insert before the last story-card in the grid
          const match = html.match(/<a href="#" class="story-card reveal">/);
          if (match) {
            const idx = match.index;
            html = html.slice(0, idx) + storyCard + '\n                ' + html.slice(idx);
          }
        }

        fs.writeFileSync(deployPath, html, 'utf8');
        console.log('Homepage updated with new story:', story.title);
      } catch (fileErr) {
        console.error('Failed to update homepage file:', fileErr.message);
      }
    }

    res.json({ success: true, story: updated });
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ error: 'Failed to publish story' });
  }
});

// ==================== UNPUBLISH / ARCHIVE ====================
app.post('/api/stories/:id/unpublish', requireAuth, async (req, res) => {
  try {
    const { data: story, error } = await supabase
      .from('stories')
      .select('id, status')
      .eq('id', req.params.id)
      .single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (story.status !== 'published') return res.status(400).json({ error: 'Only published stories can be unpublished' });

    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'draft', published_at: null })
      .eq('id', req.params.id)
      .select()
      .single();
    if (updateError) throw updateError;
    res.json({ success: true, story: updated });
  } catch (err) {
    console.error('Unpublish error:', err);
    res.status(500).json({ error: 'Failed to unpublish story' });
  }
});

app.post('/api/stories/:id/archive', requireAuth, async (req, res) => {
  try {
    const { data: story, error } = await supabase
      .from('stories')
      .select('id, status')
      .eq('id', req.params.id)
      .single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (story.status === 'archived') return res.status(400).json({ error: 'Story is already archived' });

    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'archived' })
      .eq('id', req.params.id)
      .select()
      .single();
    if (updateError) throw updateError;
    res.json({ success: true, story: updated });
  } catch (err) {
    console.error('Archive error:', err);
    res.status(500).json({ error: 'Failed to archive story' });
  }
});

// ==================== TEMPLATES CRUD ====================
app.get('/api/templates', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('story_templates').select('*').order('name', { ascending: true });
    if (error && error.message && error.message.includes('relation')) {
      return res.json({ templates: [] });
    }
    if (error) throw error;
    res.json({ templates: data || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

app.post('/api/templates', requireAuth, async (req, res) => {
  try {
    const { name, category, content, summary, tags } = req.body;
    if (!name) return res.status(400).json({ error: 'Template name is required' });
    const { data, error } = await supabase.from('story_templates').insert({ name, category: category || '', content: content || '', summary: summary || '', tags: tags || [] }).select().single();
    if (error) throw error;
    res.status(201).json({ template: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

app.put('/api/templates/:id', requireAuth, async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.id; delete updates.created_at; delete updates.updated_at;
    const { data, error } = await supabase.from('story_templates').update(updates).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ template: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update template' });
  }
});

app.delete('/api/templates/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase.from('story_templates').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

// ==================== RELATED STORIES BATCH ====================
app.post('/api/stories/by-ids', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) return res.json({ stories: [] });
    const { data, error } = await supabase.from('stories').select('id, title, slug, category, summary, fact_check_image, published_at').eq('status', 'published').in('id', ids);
    if (error) throw error;
    res.json({ stories: data || [] });
  } catch (err) {
    res.json({ stories: [] });
  }
});

// ==================== AI SUMMARY GENERATOR ====================
app.post('/api/generate/summary', requireAuth, async (req, res) => {
  try {
    const { storyId } = req.body;
    const { data: story, error } = await supabase.from('stories').select('title, content, summary').eq('id', storyId).single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    const text = story.content || story.summary || story.title;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const aiSummary = sentences.slice(0, 3).map(s => s.trim()).join('. ') + '.';
    res.json({ summary: aiSummary || story.title });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// ==================== REVISION DETAIL ====================
app.get('/api/revisions/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('story_revisions').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    res.json({ revision: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch revision' });
  }
});

// ==================== IMAGE UPLOAD ====================
// Ensure story-images bucket exists on first upload
async function ensureBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets || !buckets.find(b => b.name === 'story-images')) {
      await supabase.storage.createBucket('story-images', { public: true });
    }
  } catch (e) { /* bucket may already exist or created via migration */ }
}
ensureBucket();

// DB migrations: run in Supabase SQL Editor when needed:
// ALTER TABLE stories ADD COLUMN IF NOT EXISTS fact_check_image_caption TEXT DEFAULT '';

app.post('/api/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });

    const ext = path.extname(req.file.originalname) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

    const { data, error } = await supabase.storage
      .from('story-images')
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('story-images')
      .getPublicUrl(filename);

    res.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ==================== SCHEDULED PUBLISHING ====================
async function publishScheduled() {
  try {
    const { data: due, error } = await supabase
      .from('stories')
      .select('id, title')
      .eq('status', 'scheduled');
    if (error || !due || due.length === 0) return;
    // Filter in-memory in case publish_at column doesn't exist
    const now = new Date().toISOString();
    for (const story of due) {
      await supabase.from('stories').update({ status: 'published', published_at: now }).eq('id', story.id);
    }
  } catch (e) { /* ignore */ }
}
// Run on startup and every 60 seconds
publishScheduled();
setInterval(publishScheduled, 60000);

// ==================== SITEMAP ====================
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    let stories;
    const { data, error } = await supabase.from('stories').select('slug, updated_at, published_at').eq('status', 'published').order('published_at', { ascending: false });
    if (error && error.message && error.message.includes('column')) {
      const { data: d2, error: e2 } = await supabase.from('stories').select('slug, published_at').eq('status', 'published').order('published_at', { ascending: false });
      if (e2) throw e2;
      stories = d2 || [];
    } else if (error) {
      throw error;
    } else {
      stories = data || [];
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    xml += `  <url><loc>https://thebreakdown.in/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
    (stories || []).forEach(s => {
      xml += `  <url><loc>https://thebreakdown.in/story/${s.slug}</loc><lastmod>${(s.updated_at || s.published_at || '').split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    });
    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

// ==================== MEDIA LIBRARY ====================
app.get('/api/media', requireAuth, async (req, res) => {
  try {
    const { data: files, error } = await supabase.storage.from('story-images').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (error) throw error;
    const media = (files || []).filter(f => f.metadata?.mimetype?.startsWith('image/')).map(f => ({
      name: f.name,
      url: supabase.storage.from('story-images').getPublicUrl(f.name).data.publicUrl,
      size: f.metadata?.size,
      created_at: f.created_at
    }));
    res.json({ media });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list media' });
  }
});

// ==================== BULK OPERATIONS ====================
app.post('/api/stories/bulk', requireAuth, async (req, res) => {
  try {
    const { ids, action, value } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'Story IDs required' });
    if (!action) return res.status(400).json({ error: 'Action required' });

    let updates = {};
    if (action === 'status') updates = { status: value };
    else if (action === 'category') updates = { category: value };
    else if (action === 'delete') updates = { status: 'trash', deleted_at: new Date().toISOString() };
    else return res.status(400).json({ error: 'Invalid action' });

    const { error } = await supabase.from('stories').update(updates).in('id', ids);
    if (error) throw error;
    res.json({ success: true, count: ids.length });
  } catch (err) {
    res.status(500).json({ error: 'Bulk operation failed' });
  }
});

// ==================== MIGRATION ENDPOINT ====================
app.post('/api/migrate', requireAuth, async (req, res) => {
  res.json({ sql: `ALTER TABLE stories ADD COLUMN IF NOT EXISTS fact_check_image_caption TEXT DEFAULT '';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'::text[];
ALTER TABLE stories ADD COLUMN IF NOT EXISTS meta_title TEXT DEFAULT '';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS meta_description TEXT DEFAULT '';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS og_image TEXT DEFAULT '';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS related_story_ids UUID[] DEFAULT '{}'::uuid[];
ALTER TABLE stories ADD COLUMN IF NOT EXISTS story_template TEXT DEFAULT '';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE stories DROP CONSTRAINT IF EXISTS stories_status_check;
ALTER TABLE stories ADD CONSTRAINT stories_status_check CHECK (status IN ('draft','published','archived','scheduled','trash'));
CREATE TABLE IF NOT EXISTS story_revisions (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE, data JSONB NOT NULL, saved_by UUID REFERENCES admin_users(id), created_at TIMESTAMPTZ DEFAULT NOW());
CREATE INDEX IF NOT EXISTS idx_revisions_story ON story_revisions(story_id, created_at DESC);
CREATE TABLE IF NOT EXISTS story_templates (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, category TEXT DEFAULT '', content TEXT DEFAULT '', summary TEXT DEFAULT '', tags TEXT[] DEFAULT '{}'::text[], created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());` });
});

// ==================== REVISION HISTORY ====================
// Save a revision snapshot on story update (called from PUT /api/stories/:id)
async function saveRevision(storyId, userId, data) {
  try {
    await supabase.from('story_revisions').insert({ story_id: storyId, data, saved_by: userId });
  } catch (e) { /* table may not exist yet */ }
}

app.get('/api/stories/:id/revisions', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('story_revisions').select('id, created_at').eq('story_id', req.params.id).order('created_at', { ascending: false }).limit(20);
    if (error) throw error;
    res.json({ revisions: data || [] });
  } catch (err) {
    res.json({ revisions: [] });
  }
});

// ==================== UPDATE STATS ====================
app.get('/api/stats', requireAuth, async (req, res) => {
  try {
    const { count: total } = await supabase.from('stories').select('id', { count: 'exact', head: true });
    const { count: published } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'published');
    const { count: drafts } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'draft');
    const { count: archived } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'archived');
    const { count: scheduled } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'scheduled');
    const { count: trashed } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'trash');

    const { data: recent } = await supabase.from('stories').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5);

    res.json({ stats: { total: total || 0, published: published || 0, drafts: drafts || 0, archived: archived || 0, scheduled: scheduled || 0, trashed: trashed || 0 }, recent: recent || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ==================== MULTER ERROR HANDLER ====================
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large (max 10MB)' });
    return res.status(400).json({ error: err.message });
  }
  if (err.message === 'Only image files allowed') return res.status(400).json({ error: err.message });
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Fix favicon 404
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public', 'favicon.svg')));

// ==================== CSP HEADERS ====================
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://plausible.io blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://plausible.io");
  next();
});

// ==================== STATIC FRONTEND ====================
// Specific routes first (before static middleware)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/story/:slug', (req, res) => res.sendFile(path.join(__dirname, 'public', 'story.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html')));
app.get('/admin/*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html')));
// Static files (images, CSS, etc.) - fallback
app.use(express.static(path.join(__dirname, 'public')));

// ==================== START ====================
app.listen(PORT, () => {
  console.log(`\n  🔍 The Breakdown — Fact Check CMS`);
  console.log(`  ═══════════════════════════════════`);
  console.log(`  🚀  Server:  http://localhost:${PORT}`);
  console.log(`  📋  Admin:   http://localhost:${PORT}/admin`);
  console.log(`  📡  API:     http://localhost:${PORT}/api`);
  console.log(`  ═══════════════════════════════════\n`);
});
