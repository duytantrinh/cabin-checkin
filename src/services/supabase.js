import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ibzdhmupeiarrneigyrp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliemRobXVwZWlhcnJuZWlneXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNzg4ODYsImV4cCI6MjAzNjk1NDg4Nn0.1xGo3T3lrYTIY4fiBFEjmajBqS5afhjy1wNtEGmUI5Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

/* tại trang supabse 
    Project Settings -> API -> Project API keys (copy và dán vào const supabaseKey)
 */
