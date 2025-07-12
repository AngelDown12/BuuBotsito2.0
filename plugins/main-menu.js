import os from 'os';

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

let handler = async (m, { conn }) => {
  const img = 'https://files.catbox.moe/5k7vwl.jpg';
  const totalreg = Object.keys(global.db.data.users).length;
  const uptime = process.uptime() * 1000;
  const muptime = clockString(uptime);
  const host = os.hostname();

  const text = `🔮 𝐌 𝐔 𝐋 𝐓 𝐈 - 𝐌 𝐄 𝐍 𝐔́ 🔮


┣━━━━━━━━━━━━━━┫
┃🔮 Activo: *${muptime}*
┃🔮 Host: *Sky*
┃🔮 Usuarios: *${totalreg}*
╰━━━━━━━

  「 🔮 𝘐𝘯𝘧𝘰 🔮 」
┣━━━━━━━━━━━━━━┫
┃⋗ 🔮 *.owner*  
┃⋗ 🔮 *.grupos*  
┃⋗ 🔮 *.menu*  
┃⋗ 🔮 *.menu2*  
┃⋗ 🔮 *.menu3* 
┃⋗ 🔮 *.menu4* 
┃⋗ 🔮 *.menu5*
┃⋗ 🔮 *.ping*  
┃⋗ 🔮 *.runtime*  
┃⋗ 🔮 *.reportar*  
┃⋗ 🔮 *.sugerencia*
┗━━━━━━━━━━━━━━┛

... [resto del menú aquí igual con 🔮] ...
`;

  await conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m });
};

handler.customPrefix = /^(menu|menú|ayuda|help)$/i;
handler.command = new RegExp();

export default handler;