/** Shared, fail-closed publication approval checks for Cloudflare Pages API. */
export const APPROVAL_NOTE_PREFIX = 'PUBLICATION_APPROVAL_V1:';
export const APPROVAL_TTL_MS = 60 * 60 * 1000;

function normaliseList(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch { /* a malformed list is not treated as verified data */ }
  }
  return [];
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  }
  return value;
}

function normaliseRichField(value) {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object') return stableValue(parsed);
    } catch { /* normal text content */ }
    return value;
  }
  return stableValue(value);
}

export function storyVersionPayload(story) {
  return {
    slug: String(story.slug || ''),
    title: String(story.title || ''),
    summary: String(story.summary || ''),
    body: String(story.body ?? story.content ?? ''),
    category: String(story.category || 'Uncategorised'),
    tags: normaliseList(story.tags),
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
    relatedStoryIds: normaliseList(story.related_story_ids ?? story.relatedStoryIds),
    storyTemplate: String(story.story_template ?? story.storyTemplate ?? ''),
    instagramCaption: String(story.instagram_caption ?? story.instagramCaption ?? ''),
    instagramCarousel: normaliseRichField(story.instagram_carousel ?? story.instagramCarousel),
    youtubeScript: String(story.youtube_script ?? story.youtubeScript ?? ''),
    xThread: String(story.x_thread ?? story.xThread ?? ''),
  };
}

export async function hashStoryVersion(story) {
  const canonical = JSON.stringify(storyVersionPayload(story));
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}

export function createApprovalNote({ contentHash, destination, approvedBy, approvedAt }) {
  if (!contentHash || !destination || !approvedBy || !approvedAt) {
    throw new TypeError('Publication approval requires a content hash, destination, approver and timestamp');
  }
  return APPROVAL_NOTE_PREFIX + JSON.stringify({ schema: 1, contentHash, destination, approvedBy, approvedAt });
}

export function parseApprovalNote(note) {
  if (typeof note !== 'string' || !note.startsWith(APPROVAL_NOTE_PREFIX)) return null;
  try {
    const value = JSON.parse(note.slice(APPROVAL_NOTE_PREFIX.length));
    if (value?.schema !== 1 || typeof value.contentHash !== 'string' ||
        typeof value.destination !== 'string' || typeof value.approvedBy !== 'string' ||
        typeof value.approvedAt !== 'string') return null;
    return value;
  } catch {
    return null;
  }
}

export function latestStoryLog(logs, storyId) {
  return (Array.isArray(logs) ? logs : [])
    .filter(entry => String(entry.story_id) === String(storyId))
    .sort((a, b) => {
      const byTime = Date.parse(b.created_at || '') - Date.parse(a.created_at || '');
      if (Number.isFinite(byTime) && byTime !== 0) return byTime;
      return Number(b.id || 0) - Number(a.id || 0);
    })[0] || null;
}

export async function validatePublicationApproval({ logs, story, destination, now = Date.now() }) {
  if (!story?.id) return { ok: false, reason: 'Story identity is missing' };
  const latest = latestStoryLog(logs, story.id);
  if (!latest || latest.to_status !== 'approved-for-release') {
    return { ok: false, reason: 'No current approval event for this story' };
  }
  const approval = parseApprovalNote(latest.note);
  if (!approval) return { ok: false, reason: 'Approval record is missing or invalid' };
  if (String(latest.changed_by) !== approval.approvedBy) {
    return { ok: false, reason: 'Approval identity does not match the audit record' };
  }
  if (approval.destination !== destination) {
    return { ok: false, reason: 'Approval is for a different publication destination' };
  }
  const approvedAt = Date.parse(approval.approvedAt);
  if (!Number.isFinite(approvedAt) || approvedAt > now + 60_000 || now - approvedAt > APPROVAL_TTL_MS) {
    return { ok: false, reason: 'Approval has expired or has an invalid timestamp' };
  }
  const currentHash = await hashStoryVersion(story);
  if (approval.contentHash !== currentHash) {
    return { ok: false, reason: 'Story content changed after approval' };
  }
  return { ok: true, approval, contentHash: currentHash };
}
