import { xpRange } from '../lib/levelling.js'

let tags = {
  main: 'Info 📚',
  search: 'Busquedas 🔎',
  game: 'Juegos 🎮',
  rpg: 'RPG 🌠',
  rg: 'Registro 📁',
  sticker: 'Stickers 🏞',
  img: 'Imágenes 📸',
  freefire: 'Free Fire 📌',
  group: 'Grupos 👥',
  logo: 'Logo - maker 🎨',
  nable: 'On / Off 📴',
  downloader: 'Descargas 📥',
  tools: 'Herramientas 🔧',
  fun: 'Diversión 🎲',
  nsfw: 'Nsfw 🔞',
  owner: 'Creador 😺',
  audio: 'Audios 🔉',
  advanced: 'Avanzado 💠',
  anime: 'Anime 👑',
}

const defaultMenu = {
  before: `
╔══════『 𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 』══════╗
👤 Usuario: %name
📊 Nivel: %level | ⚡ EXP: %exp/%maxexp
🌐 Modo: %mode | ⏱ Activo: %muptime
📁 Registrados: %totalreg
╚════════════════════════════╝

┏━━━❲ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 ❳━━━┓
`.trim(),

  header: '\n╭──〔 %category 〕───╮',
  body: '│ ✅ %cmd',
  footer: '╰────────────────────╯',
  after: `\n✅ Menú cargado correctamente.`
}

let handler = async (m, { conn }) => {
  try {
    const { exp, level } = global.db.data.users[m.sender]
    const { min, xp, max } = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const totalreg = Object.keys(global.db.data.users).length
    const muptime = clockString(process.uptime() * 1000)
    const mode = global.opts.self ? 'Privado 🔒' : 'Público 🌍'

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [],
      prefix: 'customPrefix' in p
    }))

    const groups = {}
    for (const tag in tags) groups[tag] = []

    help.forEach(plugin => {
      plugin.tags.forEach(tag => {
        if (tag in groups) {
          groups[tag].push(...plugin.help.map(cmd => plugin.prefix ? cmd : cmd))
        }
      })
    })

    let menuText = [defaultMenu.before]
    for (const tag of Object.keys(tags)) {
      if (groups[tag].length) {
        menuText.push(
          defaultMenu.header.replace(/%category/g, tags[tag]),
          groups[tag].map(cmd => defaultMenu.body.replace(/%cmd/g, cmd)).join('\n'),
          defaultMenu.footer
        )
      }
    }
    menuText.push(defaultMenu.after)

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

    const finalMenu = menuText.join('\n').replace(/%(\w+)/g, (_, key) => replace[key] ?? '')

    await conn.sendMessage(m.chat, {
      caption: finalMenu,
      image: { url: 'https://files.catbox.moe/5k7vwl.jpg' },
      footer: null,
      buttons: [
        { buttonId: 'menurpg', buttonText: { displayText: '🏛️ M E N U  R P G' }, type: 1 },
        { buttonId: 'code', buttonText: { displayText: '⚙️ S U B B O T' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error al cargar el menú.', m)
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