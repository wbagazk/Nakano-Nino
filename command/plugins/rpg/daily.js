let nakano = async (m, { args, prefix, command }) => {
    const db = global.db.data;
    const user = db.users[m.sender];
    const rpg = db.rpg[m.sender];

    const cooldown = 86400000;
    const now = new Date().getTime();
    const lastClaim = rpg.lastclaim || 0;
    const remainingTime = cooldown - (now - lastClaim);

    if (remainingTime > 0) {
        return m.reply(`Eh?! Kamu pikir bisa klaim terus tiap saat?! Dasar serakah! 😡
Tunggu *${clockString(remainingTime)}* lagi baru bisa klaim, oke? Jangan nyebelin!`);
    }

    user.limit += 10;
    user.uang += 5000;
    rpg.coins += 500
    rpg.exp += 500
    rpg.lastclaim = now;

    m.reply(`U-uhm... ini hadiah harian buat kamu ya... 🎁
Jangan bilang ke yang lain aku kasih segini banyak ya! 😳💦

+10 Limit
+5.000 Uang
+500 Coins
+500 Exp

Karena kamu spesial... gitu deh! 🙈💕`);
}

nakano.help = ['daily'];
nakano.tags = ['rpg'];
nakano.command = ['daily'];

module.exports = nakano;