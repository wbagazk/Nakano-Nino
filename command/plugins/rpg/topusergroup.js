let nakano = async (m, { wbk, db }) => {
    const messages = db.data.messages || {};
    const groupMetadata = await wbk.groupMetadata(m.chat);
    const participants = groupMetadata.participants.map(p => p.id);

    const topLimit = 10;
    const excludedId = '6285183134846@s.whatsapp.net';

    const filteredUsers = Object.entries(messages)
        .filter(([id, data]) => 
            participants.includes(id) &&
            id !== excludedId &&
            typeof data.allchat === 'number' &&
            data.allchat > 0
        )
        .sort((a, b) => b[1].allchat - a[1].allchat)
        .slice(0, topLimit);

    if (filteredUsers.length === 0) return m.reply('Belum ada data pengguna dalam grup ini.');

    const medal = ['🥇', '🥈', '🥉'];

    const list = filteredUsers.map(([id, data], index) => {
        const rankNum = `${index + 1}.`;
        const emoji = medal[index] ? ` ${medal[index]}` : '';
        return `${rankNum} @${id.split('@')[0]}${emoji}\n> 📊 Chat: ${data.allchat}`;
    }).join('\n\n');

    const teks = `🏆 *Top ${topLimit} Member Teraktif Grup Ini*\n\n${list}\n\n_E-eh? Aku bukan nyuruh kalian aktif, cuma... grup ini jadi sepi kalau kalian diem semua. Jadi... jangan bikin aku khawatir, oke? 💗_`;

    m.reply(teks, null, {
        mentions: filteredUsers.map(([id]) => id)
    });
};

nakano.help = ['topusergroup'];
nakano.tags = ['rpg'];
nakano.command = ['topusergroup', 'leaderboardgroup', 'topusergrup', 'leaderboardgrup'];
nakano.group = true;

module.exports = nakano;