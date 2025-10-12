import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("create").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;

  if (!url) {
    alert("URLを入力してください！");
    return;
  }

  // 6文字のランダムコード生成
  const code = Math.random().toString(36).substring(2, 8);

  // Supabaseに保存
  const { error } = await supabase.from("links").insert([
    { code, url, title, description }
  ]);

  if (error) {
    console.error("Error inserting to Supabase:", error);
    document.getElementById("result").textContent = "エラー: " + error.message;
    return;
  }

  // ✅ VercelのOGP対応URL
  const shortUrl = `https://ogp-shortener-diy7xwb3y-ginginman-infinitys-projects.vercel.app/api/ogp/${code}`;

  document.getElementById("result").innerHTML = `
    ✅ 短縮URL作成成功！<br>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `;
});
