import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzhnozrdrjoajulvxumy.supabase.co'
const supabaseAnonKey = 'sb_publishable_T3qyrOpBYaDOixGn2s9qMg_0A81YmbD'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
