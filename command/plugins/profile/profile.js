let nakano = async (m, { wbk, db, isOwner, isVip, isPremium, args }) => {
    let userId;

    if (m.quoted) {
        userId = m.quoted.sender;
    }
    else if (m.mentionedJid && m.mentionedJid[0]) {
        userId = m.mentionedJid[0];
    }
    else {
        userId = m.sender;
    }

    const user = db.data.users[userId];
    if (!user) return m.reply("🚫 Pengguna belum terdaftar di database.");

    const isSelf = userId === m.sender;
    const name = isSelf ? m.pushName : wbk.getName(userId);

    const teks = `💼 *Info Akun Pengguna* 💼\n\n` +
                 `> - 🧑‍💻 *Nama*: ${name}\n` +
                 `> - 🏷️ *Tag*: @${userId.split("@")[0]}\n` +
                 `> - 🎖️ *Status*: ${isOwner && isSelf ? "Developer" : user.vip ? 'VIP User' : user.premium ? 'Premium User' : 'Free User'}\n` +
                 `> - ⚖️ *Limit*: ${(isOwner && isSelf) ? "Unlimited" : `Tersisa: ${user.limit} penggunaan`}\n` +
                 `> - ⚡ *Point*: ${(isOwner && isSelf) ? "Unlimited" : `Total: ${user.point} poin`}\n` +
                 `> - 💵 *Saldo*: ${(isOwner && isSelf) ? "Unlimited" : `Rp${user.saldo.toLocaleString()}`}\n\n` +
                 `💡 *Keterangan*: \n` +
                 `- *Developer* (Pemilik) memiliki akses tak terbatas untuk semua fitur.\n` +
                 `- *VIP User* dan *Premium User* mendapatkan keistimewaan tertentu seperti akses lebih banyak limit dan poin.\n` +
                 `- *Free User* memiliki akses terbatas, namun masih dapat menikmati berbagai fitur dasar.\n\n` +
                 `Terus gunakan dengan bijak, dan tingkatkan statusmu untuk lebih banyak keuntungan! 🌟`;

    m.reply(teks);
};

nakano.help = ['profile'];
nakano.tags = ['profile'];
nakano.command = ['profile', 'ceklimit', 'limit'];

module.exports = nakano;