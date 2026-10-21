export const APPROVAL_NOTE_PREFIX: string;
export const APPROVAL_TTL_MS: number;
export const DEFAULT_PUBLICATION_DESTINATION: string;
export function storyVersionPayload(story: any): Record<string, unknown>;
export function hashStoryVersion(story: any): Promise<string>;
export function createApprovalNote(value: { contentHash: string; destination: string; approvedBy: string; approvedAt: string }): string;
export function parseApprovalNote(note: unknown): { schema: number; contentHash: string; destination: string; approvedBy: string; approvedAt: string } | null;
export function latestStoryLog(logs: any[], storyId: string | number): any | null;
export function validatePublicationApproval(value: { logs: any[]; story: any; destination: string; now?: number }): Promise<{ ok: true; approval: any; contentHash: string } | { ok: false; reason: string }>;
