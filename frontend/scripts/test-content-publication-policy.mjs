import test from 'node:test';
import assert from 'node:assert/strict';
import { decideStaticStoryEligibility } from './content-publication-policy.mjs';

test('preserves an unchanged legacy story with no status field', () => {
  const result = decideStaticStoryEligibility({ status: undefined, isLegacyRegistered: true, sourceHashMatches: true });
  assert.equal(result.include, true);
  assert.match(result.reason, /compatibility/i);
});

test('preserves a pinned legacy story explicitly marked published', () => {
  const result = decideStaticStoryEligibility({ status: 'published', isLegacyRegistered: true, sourceHashMatches: true });
  assert.equal(result.include, true);
});

test('excludes generated draft content even when the slug is a legacy slug', () => {
  const result = decideStaticStoryEligibility({ status: 'draft', isLegacyRegistered: true, sourceHashMatches: true });
  assert.equal(result.include, false);
  assert.match(result.reason, /not "published"/i);
});

test('excludes review and approval-pending states from static output', () => {
  for (const status of ['in-review', 'ready', 'approved-for-release', 'rejected']) {
    const result = decideStaticStoryEligibility({ status, isLegacyRegistered: true, sourceHashMatches: true });
    assert.equal(result.include, false, `Expected ${status} to be excluded`);
  }
});

test('does not allow a new filesystem story to publish by setting status to published', () => {
  const result = decideStaticStoryEligibility({ status: 'published', isLegacyRegistered: false, sourceHashMatches: true });
  assert.equal(result.include, false);
  assert.match(result.reason, /CMS release path/i);
});

test('rejects a legacy story after its source or metadata changes', () => {
  const result = decideStaticStoryEligibility({ status: undefined, isLegacyRegistered: true, sourceHashMatches: false });
  assert.equal(result.include, false);
  assert.match(result.reason, /changed/i);
});

test('an explicit draft stays excluded even if the source hash no longer matches', () => {
  const result = decideStaticStoryEligibility({ status: 'draft', isLegacyRegistered: true, sourceHashMatches: false });
  assert.equal(result.include, false);
});
