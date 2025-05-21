let nakano = async (m, { wbk, isOwner, isVip, isPremium, args, prefix, command }) => {
    let userId;

    if (m.quoted) {
        userId = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid[0]) {
        userId = m.mentionedJid[0];
    } else {
        userId = m.sender;
    }

    if (!db.data.users || !db.data.users[userId]) {
        return m.reply('🚫 Pengguna belum terdaftar di database.');
    }

    const user = db.data.users[userId];
    const isSelf = userId === m.sender;
    const name = isSelf ? m.pushName : wbk.getName(userId);

    const teks = `💼 *Info Akun Pengguna* 💼

> 🧑‍💻 *Nama*: ${name}
> 🏷️ *Tag*: @${userId.split("@")[0]}
> 🎖️ *Status*: ${isOwner && isSelf ? "Developer" : user.premium ? 'Premium User' : 'Free User'}
> ⚖️ *Limit*: ${(isOwner && isSelf) ? "Unlimited" : `Tersisa: ${user.limit} penggunaan`}
> ⚡ *Point*: ${(isOwner && isSelf) ? "Unlimited" : `Total: ${user.point} poin`}
> 💵 *Saldo*: ${(isOwner && isSelf) ? "Unlimited" : `Rp${user.saldo.toLocaleString()}`}

💡 *Keterangan Status*:
> *Developer* (Pemilik): Akses tak terbatas untuk semua fitur.
> *Premium User*: Limit dan poin lebih banyak.
> *Free User*: Akses terbatas ke fitur dasar.

🎁 *Tukar Point ke Limit?*
Setiap 1 Limit seharga *2000 Point*. Tukar dengan format:
> ➡️ *${prefix}changepoint limit <jumlah>*
> Contoh: *${prefix}changepoint limit 5*

Yuk manfaatkan pointmu dengan bijak! ✨`;

    m.reply(teks);
};

nakano.help = ['profile'];
nakano.category = ['profile'];
nakano.command = ['profile', 'ceklimit', 'limit'];

module.exports = nakano;