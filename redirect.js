import { supabase } from './supabase.js'

const params = new URLSearchParams(location.search)
const code = params.get('c')

if (code) {
  const { data, error } = await supabase.from('links').select('*').eq('code', code).single()

  if (error || !data) {
    document.body.innerText = 'リンクが存在しません。'
  } else {
    // OGP情報をセット
    document.querySelector('#og-title').setAttribute('content', data.title || 'リンク')
    document.querySelector('#og-desc').setAttribute('content', data.description || '')
    document.querySelector('#og-img').setAttribute('content', data.image || '')

    // 1.5秒後に元URLに移動
    setTimeout(() => {
      window.location.href = data.url
    }, 1500)
  }
}
