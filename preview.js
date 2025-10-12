import { supabase } from "./supabase.js";

async function loadPreview() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const { data, error } = await supabase
    .from("links")
    .select("url, title, description, image")
    .eq("code", code)
    .single();

  if (error || !data) {
    document.body.innerHTML = "<h2>❌ リンクが見つかりません</h2>";
    return;
  }

  // HTMLを構築
  document.title = data.title || "リンクプレビュー";
  document.getElementById("content").innerHTML = `
    <div style="text-align:center">
      <img src="${data.image}" alt="preview" style="max-width:300px;border-radius:12px;margin:10px;">
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <a href="${data.url}" target="_blank">🔗 元のページへ</a>
    </div>
  `;
}

loadPreview();
