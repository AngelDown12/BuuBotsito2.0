import { xpRange } from '../lib/levelling.js';
import ws from 'ws';
import fetch from 'node-fetch';
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@whiskeysockets/baileys';


const textbot = '𝐊𝐈𝐑𝐈𝐓𝐎 - 𝐁𝐎𝐓 𝐌𝐃☆';
const dev = 'Deylin - Bot';
const redes = 'https://github.com/Deylin-Eliac';
const channelRD = {
  id: '120363162731134342@newsletter',
  name: '𝐊𝐈𝐑𝐈𝐓𝐎 - 𝐁𝐎𝐓 𝐌𝐃☆'
};

const tags = {
  anime: 'ANIME',
  main: 'INFO',
  search: 'SEARCH',
  game: 'GAME',
  serbot: 'SUB BOTS',
  rpg: 'RPG',
  sticker: 'STICKER',
  group: 'GROUPS',
  nable: 'ON / OFF',
  premium: 'PREMIUM',
  downloader: 'DOWNLOAD',
  tools: 'TOOLS',
  fun: 'FUN',
  nsfw: 'NSFW',
  cmd: 'DATABASE',
  owner: 'OWNER',
  audio: 'AUDIOS',
  advanced: 'ADVANCED',
  weather: 'WEATHER',
  news: 'NEWS',
  finance: 'FINANCE',
  education: 'EDUCATION',
  health: 'HEALTH',
  entertainment: 'ENTERTAINMENT',
  sports: 'SPORTS',
  travel: 'TRAVEL',
  food: 'FOOD',
  shopping: 'SHOPPING',
  productivity: 'PRODUCTIVITY',
  social: 'SOCIAL',
  security: 'SECURITY',
  custom: 'CUSTOM'
};

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let mode = global.opts["self"] ? "Privado" : "Público";
    let totalCommands = Object.keys(global.plugins).length;
    let totalreg = Object.keys(global.db.data.users).length;
    let uptime = clockString(process.uptime() * 1000);
    const users = [...new Set([
      ...(global.conns || []).filter(conn => 
        conn.user && conn.ws?.socket?.readyState !== ws.CLOSED
      )
    ])];

    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { exp: 0, level: 1 };
    }

    let { exp, level } = global.db.data.users[userId];
    let { min, xp, max } = xpRange(level, global.multiplier);

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }));

    let menuText = `
╭━〔 𝐊𝐈𝐑𝐈𝐓𝐎 - 𝐁𝐎𝐓 𝐌𝐃☆ 〕━⬣
┃ ✦ Nombre: @${userId.split('@')[0]}
┃ ✦ Tipo: ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
┃ ✦ Modo: ${mode}
┃ ✦ Usuarios: ${totalreg}
┃ ✦ Uptime: ${uptime}
┃ ✦ Comandos: ${totalCommands}
┃ ✦ Sub-Bots: ${users.length}
╰━──────────────⬣
（＾∀＾●）ﾉｼ 𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒↷↷

${Object.keys(tags).map(tag => {
      const commandsForTag = help.filter(menu => menu.tags.includes(tag));
      if (commandsForTag.length === 0) return ''; 
      
      const commands = commandsForTag.map(menu => 
        menu.help.map(help => `┃ ✦ ${_p}${help}${menu.limit ? ' ◜⭐◞' : ''}${menu.premium ? ' ◜🪪◞' : ''}`).join('\n')
      ).join('\n');

      return `╭━━〔 ${tags[tag]} ${getRandomEmoji()} 〕━━⬣\n${commands}\n╰━━━━━━━━━━━━━━⬣`;
    }).filter(Boolean).join('\n\n')}

👑 © Powered by Deylin - Bot`;

    await m.react('👑');

    const image = await (await fetch('https://raw.githubusercontent.com/Deylin-Eliac/kirito-bot-MD/main/src/catalogo.jpg')).buffer();
    const media = await prepareWAMessageMedia({ image: image }, { upload: conn.waUploadToServer });

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: {
            header: {
              hasMediaAttachment: true,
              title: textbot,
              imageMessage: media.imageMessage
            },
            body: {
              text: menuText.trim()
            },
            footer: {
              text: dev
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "quick_reply",
                  buttonParamsJson: "{\"display_text\":\"Donar\",\"id\":\".donar\"}"
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: "{\"display_text\":\"Auto Verificar\",\"id\":\".reg name.19\"}"
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: "{\"display_text\":\"Sistema\",\"id\":\".sistema\"}"
                },
                {
                  name: "cta_url",
                  buttonParamsJson: "{\"display_text\":\"Canal Kirito\",\"url\":\"https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m\"}"
                }
              ]
            }
          }
        }
      }
    }, {});

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error('Error in menu:', e);
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
    throw e;
  }
};

handler.help = ['menu', 'allmenu'];
handler.tags = ['main'];
handler.command = ['menu', 'allm', 'menú'];
handler.register = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function getRandomEmoji() {
  const emojis = ['👑', '🔥', '🌟', '⚡'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}