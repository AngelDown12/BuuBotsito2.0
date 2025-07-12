import { xpRange } from '../lib/levelling.js'

let tags = {
  main: 'Información 📚',
  search: 'Búsquedas 🔎',
  game: 'Juegos 🎮',
  rpg: 'RPG 🌠',
  rg: 'Registro 📁',
  sticker: 'Stickers 🏞',
  img: 'Imágenes 📸',
  freefire: 'Free Fire 📌',
  group: 'Grupos 👥',
  logo: 'Logos 🎨',
  nable: 'Funciones 🔁',
  downloader: 'Descargas 📥',
  tools: 'Herramientas 🔧',
  fun: 'Diversión 🎲',
  nsfw: 'Contenido 🔞',
  owner: 'Administrador 👤',
  audio: 'Audios 🔉',
  advanced: 'Avanzado ⚙️',
  anime: 'Anime 👑'
}

const defaultMenu = {
  before: `
╭─────〔 PANEL DEL USUARIO 〕─────╮
│ 👤 Usuario: %name
│ 🔢 Nivel: %level (%exp/%maxexp XP)
│ 🌐 Modo: %mode
│ 🕒 Activo: %muptime
│ 📋 Usuarios registrados: %totalreg
╰────────────────────────────────╯

▸ *Módulos disponibles:*
`.trim(),

  header: '\n📂 %category',
  body: '   • %cmd',
  footer: '',
  after: `

▸ Sistema operativo del bot funcionando correctamente.
▸ Usa los comandos según las categorías.`
}

let handler = async (m, { conn }) => {
  try {
    const { exp, level } = global.db.data.users[m.sender]
    const { min, xp, max } = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const totalreg = Object.keys(global.db.data.users).length
    const muptime = clockString(process.uptime() * 1000)
    const mode = global.opts.self ? 'Privado' : 'Público'

    const help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [],
      prefix: 'customPrefix' in p
    }))

    const categories = {}
    for (const tag in tags) categories[tag] = []

    help.forEach(plugin => {
      plugin.tags.forEach(tag => {
        if (tag in categories) {
          categories[tag].push(...plugin.help.map(cmd => plugin.prefix ? cmd : cmd))
        }
      })
    })

    let text = [defaultMenu.before]
    for (const tag of Object.keys(tags)) {
      if (categories[tag].length) {
        text.push(
          defaultMenu.header.replace(/%category/g, tags[tag]),
          categories[tag].map(cmd => defaultMenu.body.replace(/%cmd/g, cmd)).join('\n'),
          defaultMenu.footer
        )
      }
    }
    text.push(defaultMenu.after)

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
        { buttonId: 'menurpg', buttonText: { displayText: '📌 Ver RPG' }, type: 1 },
        { buttonId: 'code', buttonText: { displayText: '⚙️ Ver Subbot' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error al generar el menú.', m)
  }
}

handler.command = new RegExp
handler.tags = ['main']
handler.register = true
handler.customPrefix = /^(menu|menú|help|ayuda)$/i

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}