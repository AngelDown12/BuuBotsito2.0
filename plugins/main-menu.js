import { xpRange } from '../lib/levelling.js'

function clockString(ms) { let h = Math.floor(ms / 3600000) let m = Math.floor(ms / 60000) % 60 let s = Math.floor(ms / 1000) % 60 return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':') }

let handler = async (m, { conn, usedPrefix, command }) => { const img = 'https://files.catbox.moe/5k7vwl.jpg'; const name = await conn.getName(m.sender); const _uptime = process.uptime() * 1000; const muptime = clockString(_uptime); const totalreg = Object.keys(global.db.data.users).length;

const text = `🪙 𝐌 𝐔 𝐋 𝐓 𝐈 - 𝐌 𝐄 𝐍 𝐔́

━━━《  📡  ESTADO DEL BOT  📡  》━━━╮ 🔮  Activo: ${muptime} 🔮  Host: Sky Hosting 🔮  Usuarios: ${totalreg} ╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

🔮 𝘐𝘯𝘧𝘰 ┣━━━━━━━━━━━━━━┫ 🔮 .owner
🔮 .grupos
🔮 .menu
🔮 .menu2
🔮 .menu3 🔮 .menu4 🔮 .menu5 🔮 .ping
🔮 .runtime
🔮 .reportar
🔮 .sugerencia
┗━━━━━━━━━━━━━━┛

🔮 𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢𝘴 ┣━━━━━━━━━━━━━━┫
🔮 .mercadolibre
🔮 .pinterest <texto>
🔮 .imagen <texto>
🔮 .imag <texto>
🔮 .ytsearch <búsqueda>
┗━━━━━━━━━━━━━━┛

🔮 𝘎𝘳𝘶𝘱𝘰𝘴 ┣━━━━━━━━━━━━━━┫
🔮 .record
🔮 .del
🔮 .link
🔮 .kick @user
🔮 .ruletaban
🔮 .admins < Texto >
🔮 .todos
🔮 .banchat
🔮 .unbanchat
🔮 .mute
🔮 .unmute
🔮 .horario
🔮 .hidetag
🔮 .reglas
🔮 .fantasmas
🔮 .nuevolink
🔮 .donarsala
🔮 .sorteo
🔮 .invite <número>
🔮 .group open / close
🔮 .grupo abrir / cerrar
🔮 .setppgc
🔮 .setname <text>
🔮 .setreglas + Texto
🔮 .abrirgrupoen minutos
🔮 .cerrargrupoen minutos
🔮 .setwelcome @user + texto
🔮 .delwelcome
🔮 .setbye @user + texto 🔮 .delbye 🔮 .encuesta pregunta|opciones
🔮 .promote @usuario
🔮 .demote @usuario
🔮 .darpoder @usuario
🔮 .delpoder @usuario
┗━━━━━━━━━━━━━━┛

🔮 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘴 ┣━━━━━━━━━━━━━━┫
🔮 .play <canción>
🔮 .play1 <canción>
🔮 .spotify <canción>
🔮 .ig <link>
🔮 .fb <link>
🔮 .tiktok <url tt>
🔮 .tiktokimg <url>
🔮 .tiktokuser <usuario>
┗━━━━━━━━━━━━━━┛

🔮 𝘊𝘳𝘦𝘢𝘥𝘰𝘳 ┣━━━━━━━━━━━━━━┫
🔮 .autoadmin
🔮 .ban @user
🔮 .unban @user 🔮 .dargod
🔮 .delgod
🔮 .emotag
🔮 .fechas
🔮 .anuncio
🔮 .darxp [@usuario]
🔮 .dsowner
🔮 .limpiar
🔮 .join <link>
🔮 .reiniciar
🔮 .salir
🔮 .update
🔮 .aviso
🔮 .cm
🔮 .cmd
┗━━━━━━━━━━━━━━┛

... (continúa el menú completo en mismo formato, usando 🔮 en todo) `.trim()

await conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m }); };

handler.customPrefix = /^(menu|menú|ayuda|help)$/i; handler.command = new RegExp; handler.register = true;

export default handler;

