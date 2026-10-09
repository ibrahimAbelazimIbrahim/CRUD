const SUPERBASE_URL = "https://xpfsvcriivscmhywpnpr.supabase.co";
const SUPERBASE_ANON_KEY = "sb_publishable_zP9Gfsg13JzG07TpVTsTkQ_17HUnRuk";
// انشاء اتصال مع قاعده البيانات
const supabaseClient = supabase.createClient(SUPERBASE_URL, SUPERBASE_ANON_KEY);
