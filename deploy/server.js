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
const { assertLegacyCmsSchema } = require('./lib/cms-schema-contract.cjs');
const { validateDeploymentHookUrl, triggerDeploymentHook } = require('./lib/publication-deploy-hook.cjs');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || '';
if (sessionSecret.length < 32) {
  throw new Error('SESSION_SECRET must be configured with at least 32 characters; refusing insecure startup.');
}

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
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY are required for the newsroom CMS; refusing to use an anonymous fallback.');
}
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
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: { secure: true, httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }
}));

// Cache a read-only CMS schema preflight for API routes only. A mismatched CMS
// database must block writes without taking the static public website offline.
let cmsSchemaPreflightPromise;
async function ensureCmsSchemaPreflight() {
  if (!cmsSchemaPreflightPromise) {
    cmsSchemaPreflightPromise = assertLegacyCmsSchema({ baseUrl: supabaseUrl, serviceKey: supabaseKey });
  }
  return cmsSchemaPreflightPromise;
}
app.use('/api', async (req, res, next) => {
  try {
    await ensureCmsSchemaPreflight();
    next();
  } catch (schemaError) {
    console.error('[cms-schema] CMS API blocked because the configured database does not match the legacy CMS contract');
    res.status(503).json({ error: 'CMS database schema is incompatible; service unavailable. No content writes were attempted.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// ==================== AUTH HELPERS ====================
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'the-breakdown-salt').digest('hex');
}

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

const PUBLICATION_APPROVAL_PREFIX = 'PUBLICATION_APPROVAL_V1:';
const PUBLICATION_APPROVAL_TTL_MS = 60 * 60 * 1000;

function publicationDestination() {
  const raw = process.env.PUBLICATION_DESTINATION || '';
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost') return null;
    if (parsed.pathname !== '/' || parsed.search || parsed.hash) return null;
    return parsed.origin;
  } catch { return null; }
}

function isEditorInChief(req) {
  const allowed = String(process.env.EDITOR_IN_CHIEF_EMAILS || '')
    .split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  const email = String(req.session?.userEmail || '').trim().toLowerCase();
  return Boolean(email && allowed.includes(email));
}

function normalisePublicationList(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch { /* malformed lists are not considered verified data */ }
  }
  return [];
}

// Keep this ordered schema aligned with the other approval validators.
function storyVersionPayload(story) {
  return {
    slug: String(story.slug || ''),
    title: String(story.title || ''),
    summary: String(story.summary || ''),
    body: String(story.body ?? story.content ?? ''),
    category: String(story.category || 'Uncategorised'),
    tags: normalisePublicationList(story.tags),
    hero: String(story.hero ?? story.fact_check_image ?? ''),
    caption: String(story.caption ?? story.fact_check_image_caption ?? ''),
    author: String(story.author || 'The Breakdown Desk'),
    readTime: Number(story.readTime ?? story.read_time ?? 5),
    sourceUrl: String(story.fact_check_url ?? story.source_url ?? ''),
    video: String(story.fact_check_video ?? story.video ?? ''),
    sourceVerification: String(story.source_verification ?? ''),
    metaTitle: String(story.meta_title ?? story.metaTitle ?? ''),
    metaDescription: String(story.meta_description ?? story.metaDescription ?? ''),
    ogImage: String(story.og_image ?? story.ogImage ?? ''),
    publishAt: String(story.publish_at ?? story.publishAt ?? ''),
    relatedStoryIds: normalisePublicationList(story.related_story_ids ?? story.relatedStoryIds),
    storyTemplate: String(story.story_template ?? story.storyTemplate ?? ''),
  };
}

function storyVersionHash(story) {
  return crypto.createHash('sha256').update(JSON.stringify(storyVersionPayload(story))).digest('hex');
}

function parsePublicationApproval(note) {
  if (typeof note !== 'string' || !note.startsWith(PUBLICATION_APPROVAL_PREFIX)) return null;
  try {
    const value = JSON.parse(note.slice(PUBLICATION_APPROVAL_PREFIX.length));
    if (value?.schema !== 1 || typeof value.contentHash !== 'string' ||
        typeof value.destination !== 'string' || typeof value.approvedBy !== 'string' ||
        typeof value.approvedAt !== 'string') return null;
    return value;
  } catch { return null; }
}

async function insertPipelineEvent(storyId, fromStatus, toStatus, actor, note) {
  const { data, error } = await supabase.from('pipeline_log').insert({
    story_id: storyId,
    from_status: fromStatus,
    to_status: toStatus,
    changed_by: actor,
    note,
  }).select('id, story_id, from_status, to_status, changed_by, note, created_at').single();
  if (error) throw new Error(`Pipeline audit event could not be persisted: ${error.message || error}`);
  if (!data || data.id == null) throw new Error('Pipeline audit event was not returned by storage');
  return data;
}

async function reopenStoryForSourceMutation(storyId, actor, description) {
  const { data: story, error } = await supabase.from('stories').select('id, status, published_at').eq('id', storyId).single();
  if (error || !story) throw new Error('Story for source mutation was not found');
  const status = String(story.status || 'draft');
  if (['draft', 'archived', 'trash'].includes(status)) return;
  // Persist a blocking event first; source changes are refused if the story cannot
  // be safely reopened or the audit trail cannot be written.
  await insertPipelineEvent(
    story.id, status, 'draft', actor,
    `Source evidence changed (${description}); prior editorial review/publication approval invalidated`,
  );
  const { data: updated, error: updateError } = await supabase.from('stories')
    .update({ status: 'draft', published_at: null })
    .eq('id', storyId).eq('status', status)
    .select('id').maybeSingle();
  if (updateError) throw updateError;
  if (!updated) throw new Error('Story state changed during source mutation; reload and retry after review');
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
    req.session.userEmail = String(user.email || '').toLowerCase().trim();
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
        author: req.session.userName || 'The Breakdown',
        status: 'draft',
        published_at: null
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
    const { data: existing, error: fetchError } = await supabase
      .from('stories').select('*').eq('id', req.params.id).single();
    if (fetchError || !existing) return res.status(404).json({ error: 'Story not found' });

    const updates = { ...req.body };
    delete updates.id;
    delete updates.created_at;
    delete updates.updated_at;
    delete updates.story_sources;
    // Workflow and publication fields are never writable through a generic edit.
    delete updates.status;
    delete updates.published_at;
    delete updates.deleted_at;

    if (Object.keys(updates).length === 0) {
      return res.json({ story: existing, approvalInvalidated: false });
    }

    const beforeHash = storyVersionHash(existing);
    const afterHash = storyVersionHash({ ...existing, ...updates });
    const contentChanged = beforeHash !== afterHash;
    const approvalInvalidated = contentChanged && existing.status !== 'draft';
    if (approvalInvalidated) {
      updates.status = 'draft';
      updates.published_at = null;
    }

    let data, error;
    ({ data, error } = await supabase
      .from('stories').update(updates).eq('id', req.params.id).select().single());

    if (error && error.message && error.message.includes('column')) {
      const knownCols = [
        'title','slug','category','status','summary','content','fact_check_url',
        'fact_check_image','fact_check_video','source_verification','instagram_caption',
        'instagram_carousel','youtube_script','x_thread','read_time','author',
        'published_at','tags','meta_title','meta_description','og_image','publish_at',
        'related_story_ids','story_template','fact_check_image_caption',
      ];
      const safeUpdates = {};
      Object.keys(updates).forEach(key => { if (knownCols.includes(key)) safeUpdates[key] = updates[key]; });
      const second = await supabase.from('stories').update(safeUpdates).eq('id', req.params.id).select().single();
      data = second.data;
      error = second.error;
      if (error && error.message && error.message.includes('column')) {
        const basic = {};
        ['title','slug','category','status','summary','content','published_at'].forEach(key => {
          if (updates[key] !== undefined) basic[key] = updates[key];
        });
        const third = await supabase.from('stories').update(basic).eq('id', req.params.id).select().single();
        data = third.data;
        error = third.error;
      }
    }

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Story not found' });

    saveRevision(req.params.id, req.session.userId, updates);
    if (approvalInvalidated) {
      try {
        await insertPipelineEvent(
          req.params.id, existing.status, 'draft',
          req.session.userEmail || String(req.session.userId || 'system'),
          'Material story edit invalidated prior review/publication approval',
        );
      } catch (auditError) {
        console.error('[publication-gate] Content was reopened as draft, but the invalidation audit failed:', auditError);
        return res.status(500).json({
          error: 'Story was moved back to draft but the audit record failed; investigate before release.',
          approvalInvalidated: true,
        });
      }
    }
    res.json({ story: data, approvalInvalidated });
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

    await reopenStoryForSourceMutation(
      req.params.id, req.session.userEmail || String(req.session.userId || 'system'), 'source added',
    );

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
    const { data: source, error: sourceError } = await supabase
      .from('story_sources').select('id, story_id').eq('id', req.params.id).single();
    if (sourceError || !source) return res.status(404).json({ error: 'Source not found' });
    await reopenStoryForSourceMutation(
      source.story_id, req.session.userEmail || String(req.session.userId || 'system'), 'source updated',
    );

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
    const { data: source, error: sourceError } = await supabase
      .from('story_sources').select('id, story_id').eq('id', req.params.id).single();
    if (sourceError || !source) return res.status(404).json({ error: 'Source not found' });
    await reopenStoryForSourceMutation(
      source.story_id, req.session.userEmail || String(req.session.userId || 'system'), 'source deleted',
    );
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

// Revoke pending approval and return the story to draft for re-review.
app.post('/api/stories/:id/return-to-draft', requireAuth, async (req, res) => {
  try {
    const { data: story, error } = await supabase.from('stories').select('id, status')
      .eq('id', req.params.id).single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (!['approved-for-release', 'ready', 'in-review', 'fact-checking', 'scheduled'].includes(String(story.status))) {
      return res.status(409).json({ error: 'Only a pending-release or in-review story can be returned to draft; use Unpublish for live stories.' });
    }
    const actor = String(req.session.userEmail || req.session.userId || 'cms-user');
    await insertPipelineEvent(story.id, story.status, 'draft', actor, 'Human returned story to draft; previous release approval revoked');
    const { data: updated, error: updateError } = await supabase.from('stories')
      .update({ status: 'draft', published_at: null })
      .eq('id', story.id).eq('status', story.status).select().maybeSingle();
    if (updateError) throw updateError;
    if (!updated) return res.status(409).json({ error: 'Story status changed concurrently; reload and retry' });
    return res.json({ success: true, story: updated });
  } catch (err) {
    console.error('[publication-gate] Failed to revoke approval:', err);
    return res.status(503).json({ error: 'Could not revoke approval safely; inspect the audit log' });
  }
});

// ==================== VERSION-BOUND HUMAN APPROVAL + PUBLISH ====================
app.post('/api/stories/:id/approve-release', requireAuth, async (req, res) => {
  try {
    if (!isEditorInChief(req)) {
      return res.status(403).json({ error: 'Only an email listed in EDITOR_IN_CHIEF_EMAILS can approve public release' });
    }
    const destination = publicationDestination();
    if (!destination) {
      return res.status(503).json({ error: 'PUBLICATION_DESTINATION must be configured as a valid HTTPS origin' });
    }

    const { data: story, error } = await supabase
      .from('stories').select('*').eq('id', req.params.id).single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });

    const approvalFromStatus = String(story.status || '');
    if (!['draft', 'ready', 'scheduled'].includes(approvalFromStatus)) {
      return res.status(409).json({ error: 'Only draft, ready, or due scheduled stories can be approved for release' });
    }
    const scheduledAt = story.publish_at ? Date.parse(story.publish_at) : NaN;
    if (approvalFromStatus === 'scheduled' && !Number.isFinite(scheduledAt)) {
      return res.status(409).json({ error: 'Scheduled story has no valid publish_at time; resolve scheduling before approval' });
    }
    if (Number.isFinite(scheduledAt) && scheduledAt > Date.now()) {
      return res.status(409).json({ error: 'Scheduled time has not arrived; release approval is not yet available' });
    }

    const approvedAt = new Date().toISOString();
    const approvedBy = String(req.session.userEmail || '').trim().toLowerCase();
    const approval = {
      schema: 1,
      contentHash: storyVersionHash(story),
      destination,
      approvedBy,
      approvedAt,
    };
    await insertPipelineEvent(
      story.id, approvalFromStatus, 'approved-for-release', approvedBy,
      PUBLICATION_APPROVAL_PREFIX + JSON.stringify(approval),
    );

    // Compare the expected prior status to avoid approving over a concurrent state change.
    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'approved-for-release' })
      .eq('id', req.params.id)
      .eq('status', approvalFromStatus)
      .select()
      .maybeSingle();
    if (updateError) throw updateError;
    if (!updated) return res.status(409).json({ error: 'Story changed during approval; reload and review the latest version' });

    return res.json({
      success: true,
      story: updated,
      approval: { approvedBy, approvedAt, destination, contentHash: approval.contentHash },
    });
  } catch (err) {
    console.error('[publication-gate] Approval failed:', err);
    return res.status(503).json({ error: 'Could not persist the approval or update story status; release is blocked' });
  }
});

app.post('/api/stories/:id/publish', requireAuth, async (req, res) => {
  try {
    let deploymentHookUrl;
    try { deploymentHookUrl = validateDeploymentHookUrl(process.env.DEPLOY_HOOK_URL || ''); }
    catch { return res.status(503).json({ error: 'DEPLOY_HOOK_URL must be configured before publication; story status remains unchanged.' }); }
    const destination = publicationDestination();
    if (!destination) {
      return res.status(503).json({ error: 'PUBLICATION_DESTINATION must be configured as a valid HTTPS origin' });
    }

    const { data: story, error } = await supabase
      .from('stories').select('*').eq('id', req.params.id).single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (story.status !== 'approved-for-release') {
      return res.status(409).json({ error: 'Story is not approved for release; obtain Editor-in-Chief approval first' });
    }

    const { data: logs, error: logsError } = await supabase
      .from('pipeline_log')
      .select('*')
      .eq('story_id', story.id)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(1);
    if (logsError) {
      console.error('[publication-gate] Approval history unavailable:', logsError);
      return res.status(503).json({ error: 'Approval history unavailable; release is blocked' });
    }
    const latest = Array.isArray(logs) ? logs[0] : null;
    if (!latest || latest.to_status !== 'approved-for-release') {
      return res.status(409).json({ error: 'There is no current release approval for this story' });
    }

    const approval = parsePublicationApproval(latest.note);
    if (!approval) return res.status(409).json({ error: 'Release approval record is malformed or missing' });
    if (String(latest.changed_by || '').trim().toLowerCase() !== approval.approvedBy) {
      return res.status(409).json({ error: 'Approval identity does not match its audit event' });
    }
    if (approval.destination !== destination) {
      return res.status(409).json({ error: 'Approval was recorded for a different publication destination' });
    }
    const approvedAt = Date.parse(approval.approvedAt);
    const now = Date.now();
    if (!Number.isFinite(approvedAt) || approvedAt > now + 60000 || now - approvedAt > PUBLICATION_APPROVAL_TTL_MS) {
      return res.status(409).json({ error: 'Release approval expired or has an invalid timestamp' });
    }
    if (approval.contentHash !== storyVersionHash(story)) {
      return res.status(409).json({ error: 'Story content or public metadata changed after approval; release is blocked' });
    }

    // Write the terminal event first. If the status write fails, this approval
    // cannot be replayed; a fresh review and approval will be required.
    await insertPipelineEvent(
      story.id, 'approved-for-release', 'release-attempted',
      String(req.session.userEmail || req.session.userId || 'system'),
      'Approval consumed after version-bound validation; conditional publication transition follows',
    );

    const publishedAt = new Date().toISOString();
    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'published', published_at: publishedAt })
      .eq('id', req.params.id)
      .eq('status', 'approved-for-release')
      .select()
      .maybeSingle();
    if (updateError) throw updateError;
    if (!updated) {
      return res.status(409).json({ error: 'Story status changed during release; approval has been consumed and fresh review is required' });
    }

    try {
      await insertPipelineEvent(
        story.id, 'approved-for-release', 'published',
        String(req.session.userEmail || req.session.userId || 'system'),
        'Published after version-bound human approval and successful conditional status transition',
      );
    } catch (auditError) {
      console.error('[publication-gate] Story is published but final release audit could not be recorded:', auditError);
      return res.status(500).json({ error: 'Story is published but final release audit logging failed; investigate before retrying' });
    }

    // Secondary publish telemetry is written after the primary, durable pipeline
    // release event. If it fails, the release is auditable but needs operator review.
    const { error: publishLogError } = await supabase.from('publish_log').insert({
      story_id: req.params.id,
      published_by: req.session.userId,
      deploy_status: 'success',
    });
    if (publishLogError) {
      console.error('[publication-gate] Published status was saved but publish_log failed:', publishLogError);
    }

    // Update the legacy static homepage after the gated database transition.
    const deployPath = path.join(__dirname, '..', 'deploy', 'index.html');
    if (fs.existsSync(deployPath)) {
      try {
        let html = fs.readFileSync(deployPath, 'utf8');
        const escapeText = value => String(value || '').replace(/[&<>"]/g, ch => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
        }[ch]));
        const storyCard = `
                <a href="/story/${escapeText(story.slug)}" class="story-card reveal">
                    <p class="story-category">${escapeText(story.category || 'Latest')}</p>
                    <h3 class="story-title">${escapeText(story.title)}</h3>
                    <p class="story-excerpt">${escapeText(story.summary || 'Full breakdown available.')}</p>
                    <div class="story-meta"><span>${new Date(publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span><span>${Number(story.read_time || 5)} min read</span></div>
                </a>`;
        const insertMarker = '<!-- CMS: published stories will appear here -->';
        if (html.includes(insertMarker) && !html.includes(`href="/story/${escapeText(story.slug)}"`)) {
          html = html.replace(insertMarker, storyCard + '\\n                ' + insertMarker);
          fs.writeFileSync(deployPath, html, 'utf8');
        }
      } catch (fileErr) {
        console.error('Published in CMS, but legacy homepage file update failed:', fileErr.message);
      }
    }

    let deploymentAcknowledgement;
    try {
      deploymentAcknowledgement = await triggerDeploymentHook(deploymentHookUrl);
    } catch (deployError) {
      console.error('[deploy-hook] Story is published and audited, but rebuild was not acknowledged:', deployError && deployError.code || 'unknown failure');
      return res.status(502).json({
        error: 'Story is published and audited in CMS, but the public rebuild was not acknowledged. Re-trigger deployment manually; do not retry publication.',
        releaseStatus: 'published',
        deploymentStatus: 'not-acknowledged',
      });
    }

    return res.json({
      success: true,
      story: updated,
      approval: { approvedBy: approval.approvedBy, approvedAt: approval.approvedAt, destination },
      deployment: { status: 'triggered', httpStatus: deploymentAcknowledgement.status },
    });
  } catch (err) {
    console.error('[publication-gate] Publish failed:', err);
    return res.status(503).json({ error: 'Release audit or publication failed; inspect the story and audit log before retrying' });
  }
});

// ==================== UNPUBLISH / ARCHIVE ====================
app.post('/api/stories/:id/unpublish', requireAuth, async (req, res) => {
  try {
    let deploymentHookUrl;
    try { deploymentHookUrl = validateDeploymentHookUrl(process.env.DEPLOY_HOOK_URL || ''); }
    catch { return res.status(503).json({ error: 'DEPLOY_HOOK_URL must be configured before unpublishing; story status remains unchanged.' }); }

    const { data: story, error } = await supabase
      .from('stories')
      .select('id, slug, status')
      .eq('id', req.params.id)
      .single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (story.status !== 'published') return res.status(400).json({ error: 'Only published stories can be unpublished' });

    const actor = String(req.session.userEmail || req.session.userId || 'system');
    // Persist an attempt first so a concurrent publisher cannot replay approval
    // while the takedown status update is in flight.
    await insertPipelineEvent(
      story.id, 'published', 'unpublish-attempted', actor,
      'Human requested takedown; static rebuild acknowledgement is required',
    );

    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'draft', published_at: null })
      .eq('id', req.params.id)
      .eq('status', 'published')
      .select()
      .maybeSingle();
    if (updateError) throw updateError;
    if (!updated) return res.status(409).json({ error: 'Story state changed during takedown; reload before retrying' });

    await insertPipelineEvent(story.id, 'published', 'draft', actor, 'Unpublished after conditional state transition');
    try {
      const acknowledgement = await triggerDeploymentHook(deploymentHookUrl);
      return res.json({
        success: true,
        story: updated,
        deployment: { status: 'triggered', httpStatus: acknowledgement.status },
      });
    } catch (deployError) {
      console.error('[deploy-hook] Story is unpublished in CMS, but public rebuild was not acknowledged:', deployError && deployError.code || 'unknown failure');
      return res.status(502).json({
        error: 'Story is unpublished in CMS, but the public rebuild was not acknowledged. Re-trigger deployment manually.',
        releaseStatus: 'draft',
        deploymentStatus: 'not-acknowledged',
      });
    }
  } catch (err) {
    console.error('Unpublish error:', err);
    return res.status(503).json({ error: 'Unpublish audit or state transition failed; inspect the story and audit log before retrying' });
  }
});

app.post('/api/stories/:id/archive', requireAuth, async (req, res) => {
  try {
    const { data: story, error } = await supabase
      .from('stories')
      .select('id, slug, status')
      .eq('id', req.params.id)
      .single();
    if (error || !story) return res.status(404).json({ error: 'Story not found' });
    if (story.status === 'archived') return res.status(400).json({ error: 'Story is already archived' });

    const wasPublished = story.status === 'published';
    let deploymentHookUrl = null;
    if (wasPublished) {
      try { deploymentHookUrl = validateDeploymentHookUrl(process.env.DEPLOY_HOOK_URL || ''); }
      catch { return res.status(503).json({ error: 'DEPLOY_HOOK_URL must be configured before archiving a published story; status remains unchanged.' }); }
    }

    const actor = String(req.session.userEmail || req.session.userId || 'system');
    await insertPipelineEvent(
      story.id, story.status, 'archive-attempted', actor,
      wasPublished ? 'Human requested archive of published content; rebuild acknowledgement is required'
        : 'Human requested archive; prior release approval will be invalidated',
    );

    const { data: updated, error: updateError } = await supabase
      .from('stories')
      .update({ status: 'archived', published_at: null })
      .eq('id', req.params.id)
      .eq('status', story.status)
      .select()
      .maybeSingle();
    if (updateError) throw updateError;
    if (!updated) return res.status(409).json({ error: 'Story state changed during archive; reload before retrying' });

    await insertPipelineEvent(story.id, story.status, 'archived', actor, 'Archived after conditional state transition');
    if (!wasPublished) return res.json({ success: true, story: updated });

    try {
      const acknowledgement = await triggerDeploymentHook(deploymentHookUrl);
      return res.json({
        success: true,
        story: updated,
        deployment: { status: 'triggered', httpStatus: acknowledgement.status },
      });
    } catch (deployError) {
      console.error('[deploy-hook] Story is archived in CMS, but public rebuild was not acknowledged:', deployError && deployError.code || 'unknown failure');
      return res.status(502).json({
        error: 'Story is archived in CMS, but the public rebuild was not acknowledged. Re-trigger deployment manually.',
        releaseStatus: 'archived',
        deploymentStatus: 'not-acknowledged',
      });
    }
  } catch (err) {
    console.error('Archive error:', err);
    return res.status(503).json({ error: 'Archive audit or state transition failed; inspect the story and audit log before retrying' });
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
// Automatic publication is intentionally disabled. A scheduled story stays queued
// until its publish_at time has arrived and an allowlisted human Editor-in-Chief
// explicitly approves the exact version. The /approve-release endpoint checks that time.
// Never add a timer that changes a story to 'published' directly.

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
    if (['status', 'delete', 'category'].includes(action)) {
      const { data: selected, error: statusError } = await supabase
        .from('stories').select('id, status').in('id', ids);
      if (statusError) throw statusError;
      if ((selected || []).some(story => ['published', 'approved-for-release'].includes(story.status))) {
        const actionLabel = action === 'category' ? 'category edits' : 'bulk status changes';
        return res.status(409).json({
          error: `Bulk ${actionLabel} are blocked for published or approval-pending stories. Use the individual audit/release workflow.`,
        });
      }
    }

    if (action === 'status') {
      if (['published', 'approved-for-release', 'ready'].includes(String(value))) {
        return res.status(403).json({ error: 'Bulk status changes cannot publish or approve stories; use the version-bound editorial release workflow.' });
      }
      if (!['draft', 'scheduled', 'archived', 'trash'].includes(String(value))) {
        return res.status(400).json({ error: 'Invalid bulk status value' });
      }
      updates = { status: value, published_at: null };
    } else if (action === 'category') {
      updates = { category: value };
    } else if (action === 'delete') {
      updates = { status: 'trash', deleted_at: new Date().toISOString(), published_at: null };
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

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
ALTER TABLE stories ADD CONSTRAINT stories_status_check CHECK (status IN ('draft','in-review','fact-checking','ready','approved-for-release','published','archived','scheduled','trash'));
CREATE TABLE IF NOT EXISTS story_revisions (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE, data JSONB NOT NULL, saved_by UUID REFERENCES admin_users(id), created_at TIMESTAMPTZ DEFAULT NOW());
CREATE INDEX IF NOT EXISTS idx_revisions_story ON story_revisions(story_id, created_at DESC);
CREATE TABLE IF NOT EXISTS pipeline_log (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE, from_status TEXT, to_status TEXT NOT NULL, changed_by TEXT NOT NULL DEFAULT 'system', note TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE INDEX IF NOT EXISTS idx_pipeline_log_story_created ON pipeline_log (story_id, created_at DESC, id DESC);
ALTER TABLE pipeline_log ENABLE ROW LEVEL SECURITY;
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
// The public static site remains available when CMS integration is misconfigured;
// only /api requests are blocked by the schema-contract middleware above.
app.listen(PORT, () => {
  console.log(`\n  🔍 The Breakdown — Fact Check CMS`);
  console.log(`  ═══════════════════════════════════`);
  console.log(`  🚀  Server:  http://localhost:${PORT}`);
  console.log(`  📋  Admin:   http://localhost:${PORT}/admin`);
  console.log(`  📡  API:     http://localhost:${PORT}/api`);
  console.log(`  ═══════════════════════════════════\n`);
});
