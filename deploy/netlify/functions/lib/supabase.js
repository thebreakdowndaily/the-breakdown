const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || supabaseUrl.includes('your-project-id')) {
  console.warn('Supabase not configured — set SUPABASE_URL and SUPABASE_SERVICE_KEY in Netlify environment variables');
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

module.exports = { supabase };
