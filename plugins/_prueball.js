const handler = async (m, { conn }) => {
  const templateMessage = {
    image: { url: 'https://files.catbox.moe/5k7vwl.jpg' }, // Puedes cambiar la imagen
    caption: `✨ *Bienvenido a SonicBot-MF* ✨\n\nSelecciona una opción del menú:`,
    footer: '🤖 Sky Hosting • SonicBot-MF',
    templateButtons: [
      { index: 1, urlButton: { displayText: '🌐 Instagram', url: 'https://instagram.com' } },
      { index: 2, callButton: { displayText: '📞 Llamar al Owner', phoneNumber: '+5212731590195' } },
      { index: 3, quickReplyButton: { displayText: '📋 Menú', id: '.menu' } },
      { index: 4, quickReplyButton: { displayText: '👑 Creador', id: '.owner' } },
      { index: 5, quickReplyButton: { displayText: '📊 Estado', id: '.estado' } }
    ]
  }

  await conn.sendMessage(m.chat, templateMessage, { quoted: m })
}

handler.command = ['po2'] // Actívalo con .po2
export default handler