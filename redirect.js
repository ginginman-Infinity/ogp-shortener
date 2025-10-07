import { supabase } from './supabase.js';

async function redirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code'); // ← idではなくcodeに変更！
  if (!code) {
    document.body.innerHTML = '<h2>エラー: codeが指定されていません</h2>';
    return;
  }

  // Supabaseから該当する短縮リンクを取得
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('code', code) // ← idではなくcodeで検索
    .single();

  if (error || !data) {
    document.body.innerHTML = '<h2>リンクが見つかりません</h2>';
    return;
  }

  // 本来のURLへリダイレクト
  window.location.href = data.url; // ← original_url → url に修正
}

redirect();
