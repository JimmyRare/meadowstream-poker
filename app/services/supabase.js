import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uopmwgxckktctabjqlij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcG13Z3hja2t0Y3RhYmpxbGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNjk1NzcsImV4cCI6MjAxMDY0NTU3N30.VQztrrckbxgNm6L2B1RuWzGCWnFuk8aLnKJbKWNqCG4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
