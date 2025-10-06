import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// あなたの Supabase プロジェクト情報
const supabaseUrl = 'https://khfflcfiwfmfchpbsqph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmZsY2Zpd2ZtZmNocGJzcXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkyODMsImV4cCI6MjA2NzM4NTI4M30.wW0FoCXGZYagQENgOzyEsCF9cWatH6UO5O8ic-T0pdA';
const supabase = createClient(supabaseUrl, supabaseKey);

// ランダムIDを生成する関数
function generateId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

// ボタン押下時の処理
document.getElementById('create').addEventListener('click', async () => {
  const url = document.getElementById('url').value.trim();
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const image = document.getElementById('image').value.trim();
  const result = document.getElementById('result');

  if (!url) {
    result.textContent = '❌ URLを入力してください。';
    return;
  }

  result.textContent = '⏳ 作成中...';

  const id = generateId();

  // Supabaseにデータを保存
  const { error } = await supabase.from('links').insert([
    { id, original_url: url, title, description: desc, image }
  ]);

  if (error) {
    console.error(error);
    result.textContent = '❌ エラーが発生しました。';
    return;
  }

  // GitHub Pages のベースURLを自動取得
  const baseUrl = window.location.origin;
  const shortUrl = `${baseUrl}/redirect.html?id=${id}`;

  // 結果を画面に表示
  result.innerHTML = `
    ✅ 短縮URLが作成されました！<br>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `;
});import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// あなたの Supabase プロジェクト情報
const supabaseUrl = 'https://khfflcfiwfmfchpbsqph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmZsY2Zpd2ZtZmNocGJzcXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkyODMsImV4cCI6MjA2NzM4NTI4M30.wW0FoCXGZYagQENgOzyEsCF9cWatH6UO5O8ic-T0pdA';
const supabase = createClient(supabaseUrl, supabaseKey);

// ランダムIDを生成する関数
function generateId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

// ボタン押下時の処理
document.getElementById('create').addEventListener('click', async () => {
  const url = document.getElementById('url').value.trim();
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const image = document.getElementById('image').value.trim();
  const result = document.getElementById('result');

  if (!url) {
    result.textContent = '❌ URLを入力してください。';
    return;
  }

  result.textContent = '⏳ 作成中...';

  const id = generateId();

  // Supabaseにデータを保存
  const { error } = await supabase.from('links').insert([
    { id, original_url: url, title, description: desc, image }
  ]);

  if (error) {
    console.error(error);
    result.textContent = '❌ エラーが発生しました。';
    return;
  }

  // GitHub Pages のベースURLを自動取得
  const baseUrl = window.location.origin;
  const shortUrl = `${baseUrl}/redirect.html?id=${id}`;

  // 結果を画面に表示
  result.innerHTML = `
    ✅ 短縮URLが作成されました！<br>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `;
});
