// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ciytzpndicknvvyvhcmg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpeXR6cG5kaWNrbnZ2eXZoY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMjU5MjAsImV4cCI6MjA2MzgwMTkyMH0.iYzfgNK-tn6eakkGXP37nslw1QFG7SY9a7Faf1PjzOk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
