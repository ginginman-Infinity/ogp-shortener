// SupabaseをCDN経由で使う
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("create").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const image = document.getElementById("image").value;

  if (!url) {
    alert("URLを入力してください！");
    return;
  }

  // ランダムな短縮IDを作る
  const id = Math.random().toString(36).substring(2, 8);

  // Supabaseに保存
  const { error } = await supabase.from("links").insert([
    { id, url, title, description: desc, image }
  ]);

  if (error) {
    console.error("Error:", error);
    document.getElementById("result").textContent = "エラー：" + error.message;
  } else {
    const shortUrl = `https://ginginman-infinity.github.io/ogp-shortener/?id=${id}`;
    document.getElementById("result").innerHTML = `
      ✅ 短縮URL作成成功！<br>
      <a href="${shortUrl}" target="_blank">${shortUrl}</a>
    `;
  }
});
