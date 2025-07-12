let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`╭─⬣「 *𝐁𝐔𝐔 𝐁𝐎𝐓 🔮* 」⬣
│ ≡◦ 🎧 *Uso correcto del comando:*
│ ≡◦ play shakira soltera
╰─⬣`);

  try {
    let res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw '❌ No se pudo acceder al servidor.';
    let json = await res.json();

    let result = json?.result;
    if (!result?.downloadUrl) return m.reply(`╭─⬣「 *𝐁𝐔𝐔 𝐁𝐎𝐓 🔮* 」⬣
│ ≡◦ ❌ *No se encontró resultado para:* ${text}
╰─⬣`);

    let { title, artist, duration, cover, url } = result.metadata;
    let audio = result.downloadUrl;

    await conn.sendMessage(m.chat, {
      image: { url: cover },
      caption: `╭─⬣「 *MÚSICA SPOTIFY* 」⬣
│ ≡◦ 🎵 *Título:* ${title}
│ ≡◦ 👤 *Artista:* ${artist}
│ ≡◦ ⏱️ *Duración:* ${duration}
│ ≡◦ 🌐 *Spotify:* ${url}
╰─⬣`
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`
    }, { quoted: m });

  } catch (e) {
    console.error('[PLAY ERROR]', e);
    m.reply(`╭─⬣「 *𝐁𝐔𝐔 𝐁𝐎𝐓 🔮* 」⬣
│ ≡◦ ⚠️ *Error al procesar la solicitud.*
│ ≡◦ Intenta más tarde.
╰─⬣`);
  }
};

handler.customPrefix = /^play\s+/i;
handler.command = new RegExp;
handler.register = true;

export default handler;