import { createClient } from "@supabase/supabase-js"
export const supabaseUrl = "https://okikpwrjqydvwlukcctx.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9raWtwd3JqcXlkdndsdWtjY3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1Njg0MDQsImV4cCI6MjAyNjE0NDQwNH0.jHIBEApAxwwPVrGEybG8oKyNIZSrmYD822vD0Qe_ks4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

/* Exposed supabase key but due to Row Level security (RLS) write is not allowed */
