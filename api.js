import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jfpccwjwsgxkpnddnkrn.supabase.co",
  "YOUR_SERVICE_ROLE_KEY"
);

export default async function handler(req, res) {
  const { code } = req.query;

  const { data, error } = await supabase
    .from("links")
    .select("url, title, description")
    .eq("code", code)
    .single();

  if (error || !data) {
    res.status(404).send("Not Found");
    return;
  }

  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta property="og:title" content="${data.title || 'リンク'}" />
      <meta property="og:description" content="${data.description || ''}" />
      <meta property="og:url" content="${data.url}" />
      <meta name="twitter:card" content="summary" />
      <meta http-equiv="refresh" content="1; url=${data.url}" />
      <title>${data.title || "リンク先に移動中..."}</title>
    </head>
    <body>
      <p>🔗 ${data.description || ""}</p>
      <p>数秒後に <a href="${data.url}">こちら</a> に移動します。</p>
    </body>
    </html>
  `);
}
