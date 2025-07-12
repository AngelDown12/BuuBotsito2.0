let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Usa: play <nombre de canción>');

  try {
    let res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json?.result?.downloadUrl) return m.reply(`No encontré resultados para: ${text}`);

    let { title, artist, duration, cover, url } = json.result.metadata;
    let audio = json.result.downloadUrl;

    await conn.sendMessage(m.chat, { image: { url: cover }, caption: `${title} - ${artist} (${duration})\n${url}` }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4', fileName: `${title}.mp3` }, { quoted: m });

  } catch {
    return m.reply('Error. Intenta de nuevo.');
  }
};

handler.customPrefix = /^play\s+/i;
handler.command = new RegExp;
handler.register = true;

export default handler;