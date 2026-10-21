/**
 * Publication policy for filesystem-backed stories in the static site build.
 * New stories and edited legacy sources must be released through the approved CMS path.
 */
export function decideStaticStoryEligibility({ status, isLegacyRegistered, sourceHashMatches }) {
  if (!isLegacyRegistered) {
    return { include: false, reason: 'Story has no pinned legacy publication record; use the approved CMS release path' };
  }

  const normalisedStatus = status == null ? '' : String(status).trim().toLowerCase();
  if (normalisedStatus && normalisedStatus !== 'published') {
    return { include: false, reason: `Story status is "${normalisedStatus}", not "published"` };
  }

  if (!sourceHashMatches) {
    return { include: false, reason: 'Pinned source or relevant metadata changed; re-review and release through CMS' };
  }

  return {
    include: true,
    reason: normalisedStatus ? 'Published legacy source matches the pinned registry' : 'Unchanged legacy source retained for compatibility',
  };
}
