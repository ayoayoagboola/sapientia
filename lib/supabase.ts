import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mbwxgztbfdbpxfasqygv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbmF5c3VkeW9la3F0anllbnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNTYzNDksImV4cCI6MjAzMzYzMjM0OX0.XuXHr5RaD005Z9BTQ6gUHhFYW_r2ZpV5-wubC7P9wac"
);
