let handler = async (m, { conn, text }) => {
  if (!text) return;
  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const { result } = await res.json();
    if (!result) return;
    await conn.sendMessage(m.chat, { audio: { url: result.downloadUrl }, mimetype: 'audio/mp4' }, { quoted: m });
  } catch {}
};
handler.customPrefix = /^play\s+/i;
handler.command = new RegExp;
handler.register = true;
export default handler;