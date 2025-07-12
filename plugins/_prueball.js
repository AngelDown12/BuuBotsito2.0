const handler = async (m, { conn }) => {
  const mensaje = {
    text: '✨ *Bienvenido a SonicBot-MF* ✨\n\nSelecciona una opción:',
    footer: '🤖 Sky Hosting • SonicBot-MF',
    buttons: [
      { buttonId: '.menu', buttonText: { displayText: '📋 Menú' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '👑 Creador' }, type: 1 },
      { buttonId: '.estado', buttonText: { displayText: '📊 Estado' }, type: 1 }
    ],
    headerType: 1
  }

  await conn.sendMessage(m.chat, mensaje, { quoted: m })
}

handler.command = ['po']
export default handler