import { xpRange } from '../lib/levelling.js'

let tags = {
  main: 'Información',
  search: 'Búsquedas',
  game: 'Juegos',
  rpg: 'RPG',
  rg: 'Registro',
  sticker: 'Stickers',
  img: 'Imágenes',
  freefire: 'Free Fire',
  group: 'Grupos',
  logo: 'Logos',
  nable: 'Funciones',
  downloader: 'Descargas',
  tools: 'Herramientas',
  fun: 'Diversión',
  nsfw: 'Contenido para adultos',
  owner: 'Administrador',
  audio: 'Audios',
  advanced: 'Avanzado',
  anime: 'Anime'
}

const defaultMenu = {
  before: `
══════════════════════════════
         MENÚ DE COMANDOS
══════════════════════════════

Usuario: %name
Nivel: %level      EXP: %exp / %maxexp
Modo: %mode        Tiempo activo: %muptime
Registrados: %totalreg

ÍNDICE DE SECCIONES:
%index

══════════════════════════════
`.trim(),

  header: '\n═ %category ═',
  body: '  • %cmd',
  footer: '',
  after: `

══════════════════════════════
© Bot Formal • Todos los derechos reservados.
`
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

    // Crear objeto con categorías y comandos
    const categories = {}
    for (const tag in tags) categories[tag] = []

    help.forEach(plugin => {
      plugin.tags.forEach(tag => {
        if (tag in categories) {
          categories[tag].push(...plugin.help.map(cmd => plugin.prefix ? cmd : cmd))
        }
      })
    })

    // Generar índice de secciones disponibles
    let indexSections = ''
    for (const tag of Object.keys(tags)) {
      if (categories[tag].length) {
        indexSections += `  - ${tags[tag]} (${categories[tag].length} comandos)\n`
      }
    }

    // Construir texto del menú
    let text = defaultMenu.before.replace('%index', indexSections)
    for (const tag of Object.keys(tags)) {
      if (categories[tag].length) {
        text += `\n${defaultMenu.header.replace('%category', tags[tag])}\n`
        text += categories[tag].map(cmd => defaultMenu.body.replace('%cmd', cmd)).join('\n')
        text += defaultMenu.footer
      }
    }
    text += defaultMenu.after

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

    const finalText = text.replace(/%(\w+)/g, (_, key) => replace[key] ?? '')

    await conn.sendMessage(m.chat, {
      caption: finalText,
      image: { url: 'https://files.catbox.moe/5k7vwl.jpg' },
      buttons: [
        { buttonId: 'menurpg', buttonText: { displayText: 'Ver RPG' }, type: 1 },
        { buttonId: 'code', buttonText: { displayText: 'Ver Subbot' }, type: 1 }
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