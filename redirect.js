import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";
const supabase = createClient(supabaseUrl, supabaseKey);

async function redirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) return;

  const { data, error } = await supabase
    .from("links")
    .select("url, title, description")
    .eq("code", code)
    .single();

  if (error || !data) {
    document.body.innerHTML = "<h2>❌ リンクが見つかりません</h2>";
    return;
  }

  document.body.innerHTML = `
    <h1>${data.title || "タイトルなし"}</h1>
    <p>${data.description || "説明なし"}</p>
    <a href="${data.url}">移動する</a>
  `;

  setTimeout(() => {
    window.location.href = data.url;
  }, 2000);
}

redirect();
