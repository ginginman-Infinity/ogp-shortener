// Supabaseの設定ファイル
// あなたのプロジェクト用（ginginman-Infinity's Project 短縮）

const SUPABASE_URL = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

// Supabaseクライアントを初期化
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 他のスクリプトでも使えるようにexport
window.supabaseClient = supabase;
