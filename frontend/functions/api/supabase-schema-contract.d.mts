export interface SupabaseCmsSchemaProbe {
  readonly table: string;
  readonly columns: readonly string[];
}

export const SUPABASE_CMS_SCHEMA_PROBES: readonly SupabaseCmsSchemaProbe[];

export function assertSupabaseCmsSchema(options: {
  baseUrl: string;
  serviceKey: string;
  fetchImpl?: typeof fetch;
}): Promise<{ checkedTables: number }>;
