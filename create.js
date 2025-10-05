import { supabase } from './supabase.js'

document.getElementById('create').onclick = async () => {
  const url = document.getElementById('url').value
  const title = document.getElementById('title').value
  const description = document.getElementById('desc').value
  const image = document.getElementById('image').value

  if (!url) {
    alert('URLを入力してください')
    return
  }

  const code = Math.random().toString(36).substring(2, 8) // ランダム6文字コード

  const { error } = await supabase.from('links').insert([{ code, url, title, description, image }])
  if (error) {
    alert('エラー: ' + error.message)
    return
  }

  const shortUrl = `${location.origin}/redirect.html?c=${code}`
  document.getElementById('result').innerHTML = `
    <p>✅ 短縮URLが作成されました：</p>
    <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `
}
