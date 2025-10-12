import { supabase } from "./supabase.js";

document.getElementById("create").addEventListener("click", async () => {
  const url = document.getElementById("url").value.trim();
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!url) {
    alert("URLを入力してください！");
    return;
  }

  // ✅ 短縮コードを5文字ランダム生成
  const code = Math.random().toString(36).substring(2, 7);

  // ✅ Supabaseにデータを保存
  const { error } = await supabase.from("links").insert([
    { code, url, title, description: desc, image }
  ]);

  if (error) {
    console.error("Error:", error);
    document.getElementById("result").textContent = "エラー：" + error.message;
  } else {
    // ✅ GitHub Pages のリポジトリ名を含める
    const base = `${window.location.origin}/ogp-shortener`;
    const shortUrl = `${base}/redirect.html?code=${code}`;
    const previewUrl = `${base}/preview.html?code=${code}`;

    document.getElementById("result").innerHTML = `
      ✅ 短縮URL作成成功！<br><br>
      🔗 <a href="${shortUrl}" target="_blank">${shortUrl}</a><br><br>
      🖼️ プレビュー付きURL：<br>
      <a href="${previewUrl}" target="_blank">${previewUrl}</a>
    `;
  }
});
