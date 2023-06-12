import { createClient } from "@supabase/supabase-js/src/index";

export const supabase = createClient(
  "https://uouptgqnmuxhigjoxocz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdXB0Z3FubXV4aGlnam94b2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1NDQzNDAsImV4cCI6MjAwMjEyMDM0MH0.IF6SKEIA55OIZ4MjhqvtFSmpMiR2eBLSrJBKEGDof6E"
);
