import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import {
  createApprovalNote,
  hashStoryVersion,
  validatePublicationApproval,
} from '../functions/api/publication-gate.mjs';

if (!globalThis.crypto) globalThis.crypto = webcrypto;

const now = Date.parse('2026-10-21T10:00:00.000Z');
const destination = 'https://thebreakdown.in';
function story() {
  return {
    id: 'story-123', slug: 'example-story', title: 'Example',
    summary: 'A short summary', body: 'Evidence-led article text.',
    category: 'Policy', tags: ['India', 'Policy'],
    hero: 'https://cdn.example.test/hero.jpg', caption: 'Caption',
    author: 'The Breakdown Desk', readTime: 5, status: 'ready',
    updatedAt: '2026-10-21T09:00:00.000Z',
    fact_check_url: 'https://example.test/source',
    fact_check_video: '',
    source_verification: 'Verified against the original report',
    meta_title: 'Example | The Breakdown',
    meta_description: 'A short, accurate description',
    og_image: 'https://cdn.example.test/og.jpg',
    publish_at: '',
    related_story_ids: [],
    story_template: 'analysis',
  };
}
async function approvalLog(value, override = {}) {
  const contentHash = await hashStoryVersion(value);
  const approvedAt = new Date(now - 5 * 60_000).toISOString();
  return {
    id: 1, story_id: value.id, from_status: 'ready',
    to_status: 'approved-for-release', changed_by: 'chief-editor',
    note: createApprovalNote({ contentHash, destination, approvedBy: 'chief-editor', approvedAt }),
    created_at: approvedAt, ...override,
  };
}

test('accepts a current approval tied to the exact story version and destination', async () => {
  const value = story();
  const result = await validatePublicationApproval({ logs: [await approvalLog(value)], story: value, destination, now });
  assert.equal(result.ok, true);
});

test('rejects a story whose content changed after approval', async () => {
  const value = story();
  const log = await approvalLog(value);
  value.body += ' New paragraph.';
  const result = await validatePublicationApproval({ logs: [log], story: value, destination, now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /changed after approval/i);
});

test('rejects a story whose public metadata changes after approval', async () => {
  const value = story();
  const log = await approvalLog(value);
  value.meta_description = 'A materially different description';
  const result = await validatePublicationApproval({ logs: [log], story: value, destination, now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /changed after approval/i);
});

test('normalises array and JSON-string tag representations to the same version hash', async () => {
  const value = story();
  const hashArray = await hashStoryVersion(value);
  const hashString = await hashStoryVersion({ ...value, tags: JSON.stringify(value.tags) });
  assert.equal(hashArray, hashString);
});

test('rejects an approval for a different destination', async () => {
  const value = story();
  const result = await validatePublicationApproval({ logs: [await approvalLog(value)], story: value, destination: 'https://staging.example.test', now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /different publication destination/i);
});

test('rejects replay after any later pipeline event', async () => {
  const value = story();
  const log = await approvalLog(value);
  const later = { id: 2, story_id: value.id, to_status: 'draft', note: 'Returned to draft', changed_by: 'chief-editor', created_at: new Date(now).toISOString() };
  const result = await validatePublicationApproval({ logs: [log, later], story: value, destination, now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /No current approval event/i);
});

test('rejects expired approvals', async () => {
  const value = story();
  const approvedAt = new Date(now - 2 * 60 * 60_000).toISOString();
  const log = {
    id: 1, story_id: value.id, from_status: 'ready', to_status: 'approved-for-release',
    changed_by: 'chief-editor',
    note: createApprovalNote({ contentHash: await hashStoryVersion(value), destination, approvedBy: 'chief-editor', approvedAt }),
    created_at: approvedAt,
  };
  const result = await validatePublicationApproval({ logs: [log], story: value, destination, now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /expired/i);
});

test('rejects malformed or missing approval records', async () => {
  const value = story();
  const result = await validatePublicationApproval({
    logs: [{ id: 1, story_id: value.id, to_status: 'approved-for-release', changed_by: 'chief-editor', note: 'approved', created_at: new Date(now).toISOString() }],
    story: value, destination, now,
  });
  assert.equal(result.ok, false);
  assert.match(result.reason, /missing or invalid/i);
});

test('rejects approval if the recorded approver differs from the actor', async () => {
  const value = story();
  const log = await approvalLog(value, { changed_by: 'other-user' });
  const result = await validatePublicationApproval({ logs: [log], story: value, destination, now });
  assert.equal(result.ok, false);
  assert.match(result.reason, /identity does not match/i);
});
