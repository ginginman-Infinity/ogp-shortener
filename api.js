import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://jfpccwjwsgxkpnddnkrn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGNjd2p3c2d4a3BuZGRua3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAzNzUsImV4cCI6MjA3NTE4NjM3NX0.8gJuCKSE5KsaEG5GDGWH1brEBCfZ3dEHXtAELcX4KOk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { code } = req.query;

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("id", code)
    .single();

  if (error || !data) {
    return res.status(404).send("リンクが見つかりません");
  }

  // OGPを返すHTML
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta property="og:title" content="${data.title || "リンク"}" />
      <meta property="og:description" content="${
        data.description || "URL短縮リンク"
      }" />
      <meta property="og:url" content="https://${
        req.headers.host
      }/api/ogp/${code}" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <title>${data.title || "リンク"}</title>
      <script>
        setTimeout(() => {
          window.location.href = "https://ginginman-infinity.github.io/ogp-shortener/redirect.html?code=${code}";
        }, 1000);
      </script>
    </head>
    <body>
      <p>リダイレクト中...</p>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
