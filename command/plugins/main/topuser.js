let nakano = async (m, { db }) => {
    const messages = db.data.messages || {};
    const topLimit = 10;
    const excludedId = '6285183134846@s.whatsapp.net';

    const sortedUsers = Object.entries(messages)
        .filter(([id, data]) => id !== excludedId && typeof data.allchat === 'number' && data.allchat > 0)
        .sort((a, b) => b[1].allchat - a[1].allchat)
        .slice(0, topLimit);

    if (sortedUsers.length === 0) return m.reply('Belum ada data pengguna.');

    const mentions = [];
    const medal = ['🥇', '🥈', '🥉'];

    const list = sortedUsers.map(([id, data], index) => {
        mentions.push(id);
        const rankNum = `${index + 1}.`;
        const emoji = medal[index] ? ` ${medal[index]}` : '';
        return `${rankNum} @${id.split('@')[0]}${emoji}\n> 📊 Chat: ${data.allchat}`;
    }).join('\n\n');

    const teks = `📈 *Top ${topLimit} Pengguna Teraktif*\n\n${list}\n\n_“Jangan khawatir kalau kamu belum terlihat, teruslah berinteraksi dan bersinar dengan caramu sendiri. Setiap bintang punya waktunya sendiri untuk bersinar.”_ ✨`;
    m.reply(teks, null, { mentions });
};

nakano.help = ['topuser'];
nakano.tags = ['main'];
nakano.command = ['topuser'];

module.exports = nakano;