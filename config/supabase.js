import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	"https://uwyvxngkomxmobscfyve.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eXZ4bmdrb214bW9ic2NmeXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwNzYyOTcsImV4cCI6MTk3MzY1MjI5N30.W3sv2Ys6UhjHM3_-bzBsxBmDWVc8woeGhanqyRnvhvA"
);
