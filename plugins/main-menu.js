import { xpRange } from '../lib/levelling.js'

let tags = {
  main: '📚 Información',
  search: '🔎 Búsquedas',
  game: '🎮 Juegos',
  rpg: '🌠 RPG',
  rg: '📁 Registro',
  sticker: '🏞 Stickers',
  img: '📸 Imágenes',
  freefire: '📌 Free Fire',
  group: '👥 Grupos',
  logo: '🎨 Logos',
  nable: '📴 On / Off',
  downloader: '📥 Descargas',
  tools: '🔧 Herramientas',
  fun: '🎲 Diversión',
  nsfw: '🔞 NSFW',
  owner: '😺 Creador',
  audio: '🔉 Audios',
  advanced: '💠 Avanzado',
  anime: '👑 Anime'
}

const menuDesign = {
  before: `
┌───〔 🧠 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 𝗗𝗘𝗧𝗘𝗖𝗧𝗔𝗗𝗢 〕───┐
│👤 Usuario: %name
│📊 Nivel: %level | ⚡ EXP: %exp/%maxexp
│🌐 Modo: %mode
│⏱ Tiempo Activo: %muptime
│📁 Registrados: %totalreg
└────────────────────────────┘

🎯 *Bienvenido al menú del sistema.*
📂 A continuación verás todos los módulos disponibles:
━━━━━━━━━━━━━━━━━━━━━━━
`.trim(),

  header: '\n🔹 *%category*',
  body: '╰➤ %cmd',
  footer: '',
  after: `
━━━━━━━━━━━━━━━━━━━━━━━

💡 Usa cada comando con sabiduría.
👑 Sistema ejecutado con éxito.
`.trim()
}

let handler = async (m, { conn }) => {
  try {
    const { exp, level } = global.db.data.users[m.sender]
    const { min, xp, max } = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const totalreg = Object.keys(global.db.data.users).length
    const muptime = clockString(process.uptime() * 1000)
    const mode = global.opts.self ? 'Privado 🔒' : 'Público 🌍'

    const help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [],
      prefix: 'customPrefix' in p
    }))

    const sections = {}
    for (const tag in tags) sections[tag] = []

    help.forEach(plugin => {
      plugin.tags.forEach(tag => {
        if (tag in sections) {
          sections[tag].push(...plugin.help.map(cmd => plugin.prefix ? cmd : cmd))
        }
      })
    })

    let text = [menuDesign.before]
    for (const tag of Object.keys(tags)) {
      if (sections[tag].length) {
        text.push(
          menuDesign.header.replace(/%category/g, tags[tag]),
          sections[tag].map(cmd => menuDesign.body.replace(/%cmd/g, cmd)).join('\n'),
          menuDesign.footer
        )
      }
    }
    text.push(menuDesign.after)

    const replace = {
      '%': '%',
      name,
      exp: exp - min,
      maxexp: xp,
      level,
      totalreg,
      muptime,
      mode
    }

    const finalText = text.join('\n').replace(/%(\w+)/g, (_, key) => replace[key] ?? '')

    await conn.sendMessage(m.chat, {
      caption: finalText,
      image: { url: 'https://files.catbox.moe/5k7vwl.jpg' },
      buttons: [
        { buttonId: 'menurpg', buttonText: { displayText: '🏛️ MENU RPG' }, type: 1 },
        { buttonId: 'code', buttonText: { displayText: '⚙️ SUBBOT' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error al generar el menú visual.', m)
  }
}

handler.command = new RegExp
handler.tags = ['main']
handler.register = true
handler.customPrefix = /^(menu|menú|ayuda|help)$/i

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}