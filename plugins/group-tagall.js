const wm = '𝐁𝐔𝐔 𝐁𝐎𝐓 🔮';

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup) return global.dfail('group', m, conn);
  if (!isAdmin && !isOwner) return global.dfail('admin', m, conn);

  const texto = (m.text || '').trim().toLowerCase();
  if (texto !== 'todos' && texto !== '.todos') return; // Solo responde a "todos" o ".todos" exacto

  const emoji = '👅';
  const lista = participants.map(u => `${emoji} @${u.id.split('@')[0]}`).join('\n');

  const textoFinal = `𝐈𝐍𝐕𝐎𝐂𝐀𝐍𝐃𝐎 𝐁𝐔𝐒𝐒 🔮\n\n${lista}\n\n${wm}`;

  await conn.sendMessage(m.chat, {
    text: textoFinal,
    mentions: participants.map(u => u.id)
  });
};

handler.customPrefix = /^(\.|)?todos$/i; // Solo "todos" o ".todos"
handler.command = new RegExp(); // sin prefijo
handler.group = true;
handler.admin = true;

export default handler;