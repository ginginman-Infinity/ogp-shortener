import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { code } = req.query;

  // Supabaseから対象データ取得
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    return res.status(404).send("リンクが見つかりません");
  }

  // OGPメタタグ付きHTML
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta property="og:title" content="${data.title || "リンク"}" />
        <meta property="og:description" content="${data.description || ""}" />
        <meta property="og:url" content="${data.url}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta http-equiv="refresh" content="2; url=${data.url}" />
        <title>${data.title || "リダイレクト中..."}</title>
      </head>
      <body>
        <h2>🔗 ${data.title || "移動中..."}</h2>
        <p>${data.description || ""}</p>
        <p>➡ <a href="${data.url}">${data.url}</a> に移動します</p>
      </body>
    </html>
  `;

  res.status(200).setHeader("Content-Type", "text/html").send(html);
}
