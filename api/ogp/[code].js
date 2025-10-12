import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { code } = req.query;

  const { data, error } = await supabase
    .from("links")
    .select("url, title, description")
    .eq("code", code)
    .single();

  if (error || !data) {
    return res.status(404).send("リンクが見つかりません");
  }

  const { url, title, description } = data;

  // ✅ SNSに認識させるためのOGP HTMLを生成
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>${title || "リンク"}</title>

        <!-- OGP設定 -->
        <meta property="og:title" content="${title || "リンク"}">
        <meta property="og:description" content="${description || ""}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${url}">
        <meta name="twitter:card" content="summary_large_image">

        <!-- SNSがプレビューを読み取ったあと自動リダイレクト -->
        <meta http-equiv="refresh" content="1; url=${url}">
      </head>
      <body>
        <p>🔁 ${title || "リンク"} に移動中... <a href="${url}">${url}</a></p>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
