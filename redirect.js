import { supabase } from "./supabase.js";

async function redirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    document.body.innerHTML = "<h2>❌ コードが指定されていません。</h2>";
    return;
  }

  const { data, error } = await supabase
    .from("links")
    .select("url")
    .eq("code", code)
    .single();

  if (error || !data) {
    console.error(error);
    document.body.innerHTML = "<h2>❌ リンクが見つかりません。</h2>";
    return;
  }

  window.location.href = data.url;
}

redirect();
