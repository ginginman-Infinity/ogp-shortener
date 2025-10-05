import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://khfflcfiwfmfchpbsqph.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmZsY2Zpd2ZtZmNocGJzcXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkyODMsImV4cCI6MjA2NzM4NTI4M30.wW0FoCXGZYagQENgOzyEsCF9cWatH6UO5O8ic-T0pdA'

export const supabase = createClient(supabaseUrl, supabaseKey)
