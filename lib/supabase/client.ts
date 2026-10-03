import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zccybnjnfyrdcdrqvwvv.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY3libmpuZnlyZGNkcnF2d3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NDkxMDMsImV4cCI6MjEwMjEyNTEwM30.whckW_9ASeil6BAimEFxmujAq8Jz-jkGGVAjxmBt5NM';

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
