
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://jsxipcqondgbmlkmnzyv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeGlwY3FvbmRnYm1sa21uenl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNTg0ODMsImV4cCI6MjA0OTczNDQ4M30.tQp0KnP5JTqkN-vSuedxGRwOd4YtyZ-Xoly6qSK-Frs";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;