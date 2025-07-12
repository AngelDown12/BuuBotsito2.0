const handler = async (m, { conn }) => {
  const texto = `✨ *Bienvenido al Bot* ✨\n\nElige una opción del menú:`

  const botones = [
    { buttonId: '.menu', buttonText: { displayText: '📋 Menú' }, type: 1 },
    { buttonId: '.owner', buttonText: { displayText: '👑 Creador' }, type: 1 },
    { buttonId: '.estado', buttonText: { displayText: '📊 Estado' }, type: 1 }
  ]

  const mensajeBotones = {
    text: texto,
    footer: '🤖 SonicBot-MF • Sky Hosting',
    buttons: botones,
    headerType: 1
  }

  await conn.sendMessage(m.chat, mensajeBotones, { quoted: m })
}

handler.command = ['botones', 'menuprueba'] // Puedes cambiar el nombre del comando
export default handler