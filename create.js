// SupabaseをCDN経由で使う
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("createBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const desc = document.getElementById("descInput").value.trim();
  const image = document.getElementById("imageInput").value.trim();
  const result = document.getElementById("result");

  if (!url) {
    alert("URLを入力してください！");
    return;
  }

  // ランダム6文字コードを作成
  const code = Math.random().toString(36).substring(2, 8);

  // Supabaseに保存
  const { error } = await supabase.from("links").insert([
    {
      code: code,
      url: url,
      title: title,
      description: desc,
      image: image
    }
  ]);

  if (error) {
    console.error("Error:", error);
    result.textContent = "❌ エラー：" + error.message;
  } else {
    const shortUrl = `${window.location.origin}/ogp/${code}`;
    result.innerHTML = `
      ✅ 短縮URL作成成功！<br>
      <a href="${shortUrl}" target="_blank">${shortUrl}</a>
    `;
  }
});
