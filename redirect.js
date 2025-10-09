import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";
const supabase = createClient(supabaseUrl, supabaseKey);

async function redirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code"); // ← code に変更！

  if (!code) {
    document.body.innerHTML = "<h2>❌ コードが指定されていません</h2>";
    return;
  }

  // Supabaseからリンクを取得
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", code) // ← codeで検索！
    .single();

  if (error || !data) {
    console.error(error);
    document.body.innerHTML = "<h2>❌ リンクが見つかりません</h2>";
    return;
  }

  // リダイレクト
  window.location.href = data.url; // ← original_url じゃなく url カラム名に合わせる！
}

redirect();
