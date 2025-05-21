const { createCanvas, loadImage } = require('canvas');

async function dailyReward(pushName, profilePicUrl) {
    const width = 1366, height = 768;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    function getRandomThumb() {
        const thumbs = global.image?.thumb || [];
        if (!thumbs.length) return null;
        return thumbs[Math.floor(Math.random() * thumbs.length)];
    }
    const randomThumb = getRandomThumb();
    const bg = await loadImage(randomThumb);
    const bgAspect = bg.width / bg.height, canvasAspect = width / height;
    let sx = 0, sy = 0, sWidth = bg.width, sHeight = bg.height;
    if (bgAspect > canvasAspect) {
        sWidth = sHeight * canvasAspect;
        sx = (bg.width - sWidth) / 2;
    } else {
        sHeight = sWidth / canvasAspect;
        sy = (bg.height - sHeight) / 2;
    }
    ctx.drawImage(bg, sx, sy, sWidth, sHeight, 0, 0, width, height);
    const rectW = 1240, rectH = 530, radius = 30;
    const rectX = (width - rectW) / 2;
    const rectY = (height - rectH) / 2;
    const gradient = ctx.createLinearGradient(rectX, rectY, rectX + rectW, rectY + rectH);
    gradient.addColorStop(0, 'rgba(120, 80, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(80, 200, 255, 0.6)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(rectX + radius, rectY);
    ctx.lineTo(rectX + rectW - radius, rectY);
    ctx.quadraticCurveTo(rectX + rectW, rectY, rectX + rectW, rectY + radius);
    ctx.lineTo(rectX + rectW, rectY + rectH - radius);
    ctx.quadraticCurveTo(rectX + rectW, rectY + rectH, rectX + rectW - radius, rectY + rectH);
    ctx.lineTo(rectX + radius, rectY + rectH);
    ctx.quadraticCurveTo(rectX, rectY + rectH, rectX, rectY + rectH - radius);
    ctx.lineTo(rectX, rectY + radius);
    ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
    ctx.closePath();
    ctx.fill();
    const avatar = await loadImage(profilePicUrl);
    const avatarSize = 300;
    const avatarX = rectX + 125;
    const avatarY = rectY + (rectH - avatarSize) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 34px Sans';
    let displayName = pushName;
    if (pushName.length > 15) {
        displayName = pushName.slice(0, 15) + '...';
    }
    ctx.fillText(displayName, avatarX + avatarSize / 2, avatarY + avatarSize + 40);
    const titleY = rectY + 120;
    const rewardsStartY = titleY + 80;
    ctx.textAlign = 'left';
    ctx.font = 'bold 54px Sans';
    ctx.fillText('HADIAH HARIAN', rectX + 650, titleY);
    const rewards = [
        '+ 10 Limit',
        '+ 5.000 Point',
        '+ 1 Saldo',
        '+ 300 Coins',
        '+ 250 Exp'
    ];
    ctx.font = 'bold 42px Sans';
    rewards.forEach((text, i) => {
        ctx.fillText(text, rectX + 650, rewardsStartY + i * 60);
    });
    let buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
    if (buffer.length > 400 * 1024) { // 400KB
        buffer = canvas.toBuffer('image/jpeg', { quality: 0.6 });
    }
    return buffer;
};

let nakano = async (m, { wbk }) => {
    const db = global.db.data;
    const user = db.users[m.sender];
    const rpg = db.rpg[m.sender];

    const cooldown = 86400000;
    const now = new Date().getTime();
    const lastClaim = rpg.lastclaim || 0;
    const remainingTime = cooldown - (now - lastClaim);
    
    const clockString = (ms) => {
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
        return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
    };

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
nakano.category = ['rpg'];
nakano.command = ['daily'];

module.exports = nakano;