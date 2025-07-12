import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

const defaultMenu = {
  before: `
*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷*

“ hello *%name*, Cómo se encuentra el día de hoy? ”

*╭━〔*  *Info User* *〕*
*┃➤* *👤 Nombre ∙* %name
*┃➤* *🍬 Dulces ∙* %limit
*┃➤* *⭐ XP ∙* %totalexp
*┃➤* *⚡ Nivel ∙* %level
 ╰━━━━━━
%readmore

\t\t\t𝐁 𝐔 𝐔 - 𝐌 𝐄 𝐍 𝐔́
`.trimStart(),
  header: '*╭━〔* *%category* *〕*',
  body: '*┃➤* *%cmd*\n',
  footer: ' ╰━━━━━━\n',
  after: '',
}

const tags = {
  main: '𝘐𝘯𝘧𝘰 📚',
  search: '𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢𝘴 🔎',
  game: '𝘑𝘶𝘦𝘨𝘰𝘴 🎮',
  serbot: '𝘚𝘶𝘣 𝘉𝘰𝘵𝘴 🤖',
  rpg: '𝘙𝘗𝘎 🌠',
  rg: '𝘙𝘦𝘨𝘪𝘴𝘵𝘳𝘰 📁',
  sticker: '𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘴 🏞',
  img: '𝘐𝘮𝘢́𝘨𝘦𝘯𝘦𝘴 📸',
  group: '𝘎𝘳𝘶𝘱𝘰𝘴 👥',
  logo: '𝘓𝘰𝘨𝘰 - 𝘮𝘢𝘬𝘦𝘳 🎨',
  nable: '𝘖𝘯 / 𝘖𝘧𝘧 📴',
  downloader: '𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘴 📥',
  tools: '𝘏𝘦𝘳𝘳𝘢𝘮𝘪𝘦𝘯𝘵𝘢𝘴 🔧',
  fun: '𝘋𝘪𝘷𝘦𝘳𝘴𝘪𝘰́𝘯 🎲',
  nsfw: '𝘕𝘴𝘧𝘸 🔞',
  owner: '𝘊𝘳𝘦𝘢𝘥𝘰𝘳 😺',
  audio: '𝘈𝘶𝘥𝘪𝘰𝘴 🔉',
  advanced: '𝘈𝘷𝘢𝘯𝘻𝘢𝘥𝘰 💠',
  freefire: '𝘍𝘳𝘦𝘦 𝘍𝘪𝘳𝘦 📌',
  anime: '𝘈𝘯𝘪𝘮𝘦 🌸',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Datos de usuario
    const { exp, limit, level } = global.db.data.users[m.sender]
    const { min, xp, max } = xpRange(level, global.multiplier || 1)
    const name = m.name || m.pushName || 'Usuario'
    const totalreg = Object.keys(global.db.data.users).length
    const rtotalreg = Object.values(global.db.data.users).filter(u => u.registered).length

    // Hora y fecha
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    let week = d.toLocaleDateString(locale, { weekday: 'long' })

    // Carga de plugins
    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
    }))

    // Agrega tags dinámicos si faltan
    for (let plugin of help)
      for (let tag of plugin.tags)
        if (!(tag in tags)) tags[tag] = tag

    // Plantillas
    let before = defaultMenu.before
    let header = defaultMenu.header
    let body = defaultMenu.body
    let footer = defaultMenu.footer
    let after = defaultMenu.after

    // Generar menú completo
    let menu = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + help
          .filter(plugin => plugin.tags && plugin.tags.includes(tag))
          .map(plugin => plugin.help.map(cmd => body.replace(/%cmd/g, plugin.prefix ? cmd : _p + cmd)).join('\n'))
          .join('\n') + '\n' + footer
      }),
      after,
    ].join('\n')

    // Reemplazos
    const replace = {
      '%': '%', p: _p, name, limit, exp, level, xp4levelup: max - exp,
      totalexp: exp, maxexp: xp, date, time, week,
      totalreg, rtotalreg, readmore: readMore,
    }

    menu = menu.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, k) => replace[k])

    // Imagen de portada
    let url = 'https://files.catbox.moe/5k7vwl.jpg'
    await conn.sendMessage(m.chat, { image: { url }, caption: menu.trim() }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚠️ Error cargando el menú.', m)
  }
}

handler.customPrefix = /^(menu|help|menú|comandos|menucompleto|allmenu)$/i
handler.command = new RegExp
handler.noPrefix = true
handler.help = ['menu']
handler.tags = ['main']
handler.exp = 50
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)