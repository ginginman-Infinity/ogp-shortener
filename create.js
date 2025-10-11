import { supabase } from "./supabase.js";

async function createLink() {
  const input = document.getElementById("urlInput");
  const result = document.getElementById("result");
  const url = input.value.trim();

  if (!url) {
    result.textContent = "URLを入力してください。";
    return;
  }

  // 短縮コードをランダム生成
  const code = Math.random().toString(36).substring(2, 7);

  // Supabaseに保存
  const { error } = await supabase.from("links").insert([{ code, url }]);
  if (error) {
    result.textContent = "保存中にエラーが発生しました。";
    console.error(error);
    return;
  }

  // 短縮URL表示
  const shortUrl = `${window.location.origin}/redirect.html?code=${code}`;
  result.innerHTML = `
    ✅ 短縮URLが作成されました！<br>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `;
}

document.getElementById("createBtn").addEventListener("click", createLink);
