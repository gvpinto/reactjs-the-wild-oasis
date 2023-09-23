import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://oatmlqouzmcpugnmdbaq.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdG1scW91em1jcHVnbm1kYmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NzM5OTgsImV4cCI6MjAxMDQ0OTk5OH0.aNcRa7_ESw35G-Gtg8GXYcQk5yvIhxJc0j55bSfTElc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
