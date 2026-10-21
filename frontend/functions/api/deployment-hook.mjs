/**
 * Fail-closed Cloudflare Pages deployment hook helpers.
 * A publication state change is not proof that a static rebuild was requested.
 */
export function validateDeploymentHookUrl(raw) {
  if (typeof raw !== 'string' || !raw.trim()) {
    const error = new Error('DEPLOY_HOOK_URL is not configured');
    error.code = 'DEPLOY_HOOK_NOT_CONFIGURED';
    throw error;
  }

  let url;
  try {
    url = new URL(raw.trim());
  } catch {
    const error = new Error('DEPLOY_HOOK_URL is not a valid URL');
    error.code = 'DEPLOY_HOOK_INVALID_URL';
    throw error;
  }

  const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && localHost)) {
    const error = new Error('DEPLOY_HOOK_URL must use HTTPS outside local development');
    error.code = 'DEPLOY_HOOK_INVALID_URL';
    throw error;
  }
  if (url.username || url.password) {
    const error = new Error('DEPLOY_HOOK_URL must not contain URL credentials');
    error.code = 'DEPLOY_HOOK_INVALID_URL';
    throw error;
  }
  return url.href;
}

export async function triggerDeploymentHook(raw, fetchImpl = fetch) {
  const url = validateDeploymentHookUrl(raw);
  let response;
  try {
    response = await fetchImpl(url, { method: 'POST' });
  } catch {
    const error = new Error('Deployment hook request failed');
    error.code = 'DEPLOY_HOOK_REQUEST_FAILED';
    throw error;
  }

  if (!response || !response.ok) {
    const error = new Error(`Deployment hook returned HTTP ${response?.status ?? 'unknown'}`);
    error.code = 'DEPLOY_HOOK_REJECTED';
    error.status = response?.status ?? 502;
    throw error;
  }
  return { status: response.status };
}
