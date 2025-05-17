const { dailyReward } = require('../../../utils/canvas');
const { clockString } = require('../../../utils/myfunc');

let nakano = async (m, { wbk }) => {
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
    user.point += 5000;
    user.saldo += 1;
    rpg.coins += 300
    rpg.exp += 250
    rpg.lastclaim = now;
    
    const profilePicUrl = await wbk.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
    const image = await dailyReward(m.pushName || 'User', profilePicUrl);
	
    m.reply({
        image: image,
        caption: `U-uhm... ini hadiah harian buat kamu ya... 🎁
Jangan bilang ke yang lain aku kasih segini banyak ya! 😳💦

+10 Limit
+5.000 Point
+1 Saldo
+300 Coins
+250 Exp

Karena kamu spesial... gitu deh! 🙈💕`
    })
}

nakano.help = ['daily'];
nakano.tags = ['rpg'];
nakano.command = ['daily'];

module.exports = nakano;