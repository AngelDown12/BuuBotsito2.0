// Código creado por Deylin
// https://github.com/Deylin-eliac 
// código creado para https://github.com/Deylin-eliac/Pikachu-bot 
// No quites créditos

import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  m.react('🔮')

  const imageUrl = 'https://files.catbox.moe/2txrtp.jpg'
  const numCreador = '5215565238431'
  const ownerJid = numCreador + '@s.whatsapp.net'
  const name = await conn.getName(ownerJid) || 'Alee'
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `𝐒𝐨𝐲 𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧, 𝐃𝐮𝐞𝐧̃𝐨 𝐝𝐞 𝐁𝐔𝐔 𝐁𝐎𝐓 🔮.`
  const empresa = '𝐌𝐚𝐮 - 𝐒𝐞𝐫𝐯𝐢𝐜𝐢𝐨𝐬 𝐭𝐞𝐜𝐧𝐨𝐥𝐨𝐠𝐢𝐜𝐨𝐬'

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim()

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      },
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐁𝐔𝐔 𝐁𝐎𝐓 𝐎𝐟𝐢𝐜𝐢𝐚𝐥 🔮',
          body: '𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐚𝐝𝐨 𝐩𝐨𝐫 𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 🔮',
          thumbnailUrl: imageUrl,
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        }
      }
    },
    { quoted: m }
  )
}

// ✅ ACTIVACIÓN SOLO CON PREFIJO (ej. .owner)
handler.command = /^owner|creator|creador|dueño$/i
handler.tags = ['main']
handler.help = ['owner']
handler.register = false

export default handler// Código creado por Deylin
// https://github.com/Deylin-eliac 
// código creado para https://github.com/Deylin-eliac/Pikachu-bot 
// No quites créditos

import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  m.react('🔮')

  const imageUrl = 'https://files.catbox.moe/2txrtp.jpg'
  const numCreador = '5215565238431'
  const ownerJid = numCreador + '@s.whatsapp.net'
  const name = await conn.getName(ownerJid) || 'Alee'
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `𝐒𝐨𝐲 𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧, 𝐃𝐮𝐞𝐧̃𝐨 𝐝𝐞 𝐁𝐔𝐔 𝐁𝐎𝐓 🔮.`
  const empresa = '𝐌𝐚𝐮 - 𝐒𝐞𝐫𝐯𝐢𝐜𝐢𝐨𝐬 𝐭𝐞𝐜𝐧𝐨𝐥𝐨𝐠𝐢𝐜𝐨𝐬'

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim()

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      },
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐁𝐔𝐔 𝐁𝐎𝐓 𝐎𝐟𝐢𝐜𝐢𝐚𝐥 🔮',
          body: '𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐚𝐝𝐨 𝐩𝐨𝐫 𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 🔮',
          thumbnailUrl: imageUrl,
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        }
      }
    },
    { quoted: m }
  )
}

// ✅ ACTIVACIÓN SOLO CON PREFIJO (ej. .owner)
handler.command = /^owner|creator|creador|dueño$/i
handler.tags = ['main']
handler.help = ['owner']
handler.register = false

export default handler