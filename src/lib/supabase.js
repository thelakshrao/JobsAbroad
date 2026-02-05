import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljgzmjeczfmougjjeqmj.supabase.co';
const supabaseKey = 'sb_publishable_yjCjkgrUoInIcBiZenIE5Q_1--vebVp';

export const supabase = createClient(supabaseUrl, supabaseKey);