export interface SupabaseCmsSchemaProbe {
  readonly table: string;
  readonly columns: readonly string[];
}

export const SUPABASE_CMS_SCHEMA_PROBES: readonly SupabaseCmsSchemaProbe[];
export const REQUIRED_CMS_WORKFLOW_STATUSES: readonly string[];

export function assertSupabaseCmsSchema(options: {
  baseUrl: string;
  serviceKey: string;
  fetchImpl?: typeof fetch;
}): Promise<{ checkedTables: number; checkedStatuses: number }>;

export interface SupabaseCmsSchemaError extends Error {
  code: 'SUPABASE_CMS_SCHEMA_MISMATCH';
}
