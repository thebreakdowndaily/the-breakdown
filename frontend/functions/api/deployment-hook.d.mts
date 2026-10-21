export interface DeploymentHookError extends Error {
  code: 'DEPLOY_HOOK_NOT_CONFIGURED' | 'DEPLOY_HOOK_INVALID_URL' | 'DEPLOY_HOOK_REQUEST_FAILED' | 'DEPLOY_HOOK_REJECTED';
  status?: number;
}
export function validateDeploymentHookUrl(raw: unknown): string;
export function triggerDeploymentHook(raw: unknown, fetchImpl?: typeof fetch): Promise<{ status: number }>;
