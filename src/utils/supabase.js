import { createClient } from '@supabase/supabase-js';

// Supabase 项目配置
// 请在 https://app.supabase.com 创建项目后获取以下信息
const SUPABASE_URL = 'https://ifbksbtxcjznudimfago.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3dm9kJUXGDAlHVjdxQ-sog_qz108wHh';

// 创建并导出 Supabase 客户端
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
