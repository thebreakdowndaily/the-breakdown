import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateDeploymentHookUrl,
  triggerDeploymentHook,
} from '../functions/api/deployment-hook.mjs';

test('publication requires a configured deployment hook URL', () => {
  assert.throws(() => validateDeploymentHookUrl(''), error => error.code === 'DEPLOY_HOOK_NOT_CONFIGURED');
  assert.throws(() => validateDeploymentHookUrl(undefined), error => error.code === 'DEPLOY_HOOK_NOT_CONFIGURED');
});

test('only HTTPS URLs are accepted outside local development', () => {
  assert.equal(validateDeploymentHookUrl('https://deploy.example.test/hook?token=private'), 'https://deploy.example.test/hook?token=private');
  assert.equal(validateDeploymentHookUrl('http://localhost:8788/hook'), 'http://localhost:8788/hook');
  assert.throws(() => validateDeploymentHookUrl('http://deploy.example.test/hook'), error => error.code === 'DEPLOY_HOOK_INVALID_URL');
  assert.throws(() => validateDeploymentHookUrl('https://user:pass@deploy.example.test/hook'), error => error.code === 'DEPLOY_HOOK_INVALID_URL');
});

test('awaits the deploy hook and returns the acknowledgement status', async () => {
  let call;
  const result = await triggerDeploymentHook('https://deploy.example.test/hook', async (url, options) => {
    call = { url, options };
    return { ok: true, status: 202 };
  });
  assert.deepEqual(call, { url: 'https://deploy.example.test/hook', options: { method: 'POST' } });
  assert.deepEqual(result, { status: 202 });
});

test('surfaces non-success deploy hook responses without leaking its URL', async () => {
  await assert.rejects(
    () => triggerDeploymentHook('https://deploy.example.test/hook?token=private', async () => ({ ok: false, status: 503 })),
    error => {
      assert.equal(error.code, 'DEPLOY_HOOK_REJECTED');
      assert.equal(error.status, 503);
      assert.doesNotMatch(error.message, /private/);
      return true;
    },
  );
});

test('surfaces network errors as a stable deployment-hook failure', async () => {
  await assert.rejects(
    () => triggerDeploymentHook('https://deploy.example.test/hook', async () => { throw new Error('network details'); }),
    error => {
      assert.equal(error.code, 'DEPLOY_HOOK_REQUEST_FAILED');
      assert.doesNotMatch(error.message, /network details/);
      return true;
    },
  );
});
