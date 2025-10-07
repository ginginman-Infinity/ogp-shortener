import { supabase } from './supabase.js';

async function redirect() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    document.body.innerHTML = '<h2>エラー: IDが指定されていません</h2>';
    return;
  }

  // Supabaseから該当する短縮リンクを取得
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    document.body.innerHTML = '<h2>リンクが見つかりません</h2>';
    return;
  }

  // 本来のURLへリダイレクト
  window.location.href = data.original_url;
}

redirect();
