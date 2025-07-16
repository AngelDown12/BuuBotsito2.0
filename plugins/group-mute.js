import fetch from 'node-fetch'

let mutedUsers = new Set();

let handler = async (m, { conn, usedPrefix, command, isAdmin, isOwner, isBotAdmin, args }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn);
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn);

  let user;
  if (m.quoted) {
    user = m.quoted.sender;
  } else if (args[0]) {
    const mentionedJid = m.mentionedJid?.[0];
    if (!mentionedJid) return m.reply('⚠️ Etiqueta a un usuario válido.');
    user = mentionedJid;
  } else {
    return m.reply('⚠️ Usa: .mute @usuario o responde a su mensaje.');
  }

  if (user === m.sender) return m.reply('❌ No puedes mutearte o desmutearte a ti mismo.');

  const thumbnailUrlMute = 'https://telegra.ph/file/f8324d9798fa2ed2317bc.png';
  const thumbnailUrlUnmute = 'https://telegra.ph/file/aea704d0b242b8c41bf15.png';
  const thumbBuffer = await fetch(command === 'mute' ? thumbnailUrlMute : thumbnailUrlUnmute).then(res => res.buffer());

  const preview = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: m.chat
    },
    message: {
      locationMessage: {
        name: command === 'mute' ? 'Usuario mutado' : 'Usuario desmuteado',
        jpegThumbnail: thumbBuffer
      }
    }
  };

  if (command === 'mute') {
    mutedUsers.add(user);
    await conn.sendMessage(m.chat, { text: '*Tus mensajes serán eliminados*' }, { quoted: preview, mentions: [user] });
  } else if (command === 'unmute') {
    if (!mutedUsers.has(user)) return m.reply('⚠️ Ese usuario no está muteado.');
    mutedUsers.delete(user);
    await conn.sendMessage(m.chat, { text: '*Tus mensajes no serán eliminados*' }, { quoted: preview, mentions: [user] });
  }
};

// Middleware: borra todo lo que diga el usuario muteado
handler.before = async (m, { conn }) => {
  if (!m.isGroup || !m.sender || m.fromMe) return;
  if (mutedUsers.has(m.sender)) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch (e) {
      console.error('[MUTE] Error al eliminar mensaje:', e);
    }
  }
};

handler.help = ['mute @usuario', 'unmute @usuario'];
handler.tags = ['group'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;