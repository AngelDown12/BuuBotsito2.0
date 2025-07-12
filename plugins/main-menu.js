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

  const text = `🔮 𝐌𝐄𝐍𝐔́ 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋 🔮

🔮 𝐀𝐜𝐭𝐢𝐯𝐨: *${muptime}*
🔮 𝐇𝐨𝐬𝐭: *𝐒𝐤𝐲*
🔮 𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐬: *${totalreg}*

🔮 𝐔𝐬𝐚: *.𝐦𝐞𝐧𝐮* 𝐩𝐚𝐫𝐚 𝐯𝐞𝐫 𝐞𝐥 𝐦𝐞𝐧𝐮́ 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐨.
`;

  const templateButtons = [
    { index: 1, urlButton: { displayText: '👑 𝐎𝐰𝐧𝐞𝐫', url: 'https://wa.me/5212731590195' } },
    { index: 2, urlButton: { displayText: '🛒 𝐂𝐨𝐦𝐩𝐫𝐚𝐫', url: 'https://wa.me/5212731590195' } }
  ];

  const templateMessage = {
    image: { url: img },
    caption: text,
    footer: '🔮 𝐁𝐨𝐭 𝐳𝐳𝐳 | 𝐁𝐲: 𝘼𝙡𝙚𝙚 👑',
    templateButtons: templateButtons,
    headerType: 4
  };

  await conn.sendMessage(m.chat, templateMessage, { quoted: m });
};

handler.customPrefix = /^(menu|menú|ayuda|help)$/i;
handler.command = new RegExp();
export default handler;