import { canLevelUp, xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.fromMe 
    ? conn.user.jid 
    : m.sender

  let user = global.db.data.users[who]
  let { exp, limit, name, registered, regTime, age, level } = user
  let { min, xp, max } = xpRange(level, global.multiplier)
  let username = conn.getName(who)
  let prem = global.prems.includes(who.split`@`[0])

  let txt = `╭─⬣「 *User Perfil* 」⬣\n`
  txt += `│  ≡◦ *🪴 Nombre ∙* ${name}\n`
  txt += `│  ≡◦ *🐢 Edad ∙* ${age} años\n`
  txt += `│  ≡◦ *📞 Numero ∙* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
  txt += `│  ≡◦ *🍬 Dulces ∙* ${limit}\n`
  txt += `│  ≡◦ *💫 Experiencia ∙* Total ${exp} ( *${user.exp - min}/${xp}* )\n`
  txt += `│  ≡◦ *👑 Premium ∙* ${prem ? 'Si' : 'No'}\n`
  txt += `╰─⬣`

  let imagenFija = 'https://files.catbox.moe/2txrtp.jpg'
  await conn.sendFile(m.chat, imagenFija, 'perfil.jpg', txt, m)
}

handler.help = ['perfil', 'perfil @user']
handler.tags = ['rg']
handler.command = ['perfil', 'profile']

export default handler