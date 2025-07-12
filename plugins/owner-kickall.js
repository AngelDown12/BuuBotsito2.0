const handler = async (m, { conn, participants, isAdmin, isOwner, isBotAdmin }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn);
  if (!(isAdmin || isOwner)) return global.dfail('admin', m, conn);

  const permisos = new Set([
    '5215565238431@s.whatsapp.net',
    '5217227584934@s.whatsapp.net',
    '2773655@s.whatsapp.net'
  ]);
  if (!permisos.has(m.sender)) return m.reply('🚫 No tienes permiso.');

  const bot = conn.user.jid, owners = (global.owner || []).map(([id]) => id);
  const expulsar = participants
    .filter(p => !p.admin && ![bot, m.sender, ...owners].includes(p.id))
    .map(p => p.id);

  if (!expulsar.length) return m.reply('✅ Nadie para expulsar.');

  try {
    await conn.groupParticipantsUpdate(m.chat, expulsar, 'remove');
    m.reply(`✅ Expulsados: *${expulsar.length}*`);
  } catch (e) {
    console.error('[❌] Error:', e);
    m.reply('⚠️ Error al expulsar usuarios.');
  }
};

handler.customPrefix = /^(kickall|banall|kikoall)$/i;
handler.command = () => true;
handler.group = handler.botAdmin = true;

export default handler;