const { clockString } = require('../../../utils/myfunc')

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    const db = global.db.data;
    const jumlahTargetPoint = Math.floor(Math.random() * 10000);
    const jumlahTargetLimit = Math.floor(Math.random() * 10);
    const sender = m.sender;
    const botNumber = wbk.user.id.replace(/:[^@]+/, '');

    const target = 
        m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] :
        m.quoted && m.quoted.sender ? m.quoted.sender :
        text ? text.replace(/[^0-9]/g, '') + "@s.whatsapp.net" : null;

    const isRampok = command.toLowerCase() === 'rampok';
    const isRobbery = command.toLowerCase() === 'robbery';

    const aksi = isRampok ? 'rampok' : 'mencuri';
    const hasil = isRampok ? 'Rampokan' : 'Pencurian';

    if (!target) return m.reply(`😤 Kamu belum tag atau reply targetnya, tau?!\n\nCoba gini ya~\n${prefix + command} @tag`);
    if (target === sender) return m.reply(`😑 Mau ${aksi} diri sendiri tuh gimana sih, dasar aneh~`);
    if (target === botNumber) return m.reply(`😤 Berani-beraninya kamu mau ${aksi} aku?! Dasar nakal!! 🤬`);

    if (!db.users[target]) return m.reply("Hmmm... Targetnya belum terdaftar deh. Gagal deh misinya 😅");
    if (!db.rpg[sender]) db.rpg[sender] = { lastrampok: 0 };
    if (!db.users[sender].point) db.users[sender].point = 0;
    if (!db.users[target].point) db.users[target].point = 0;
    if (!db.users[sender].limit) db.users[sender].limit = 0;
    if (!db.users[target].limit) db.users[target].limit = 0;

    const lastAksi = db.rpg[sender].lastrampok || 0;
    const now = new Date() * 1;
    const cooldown = 36000000;
    const waktuTunggu = cooldown - (now - lastAksi);

    if (now - lastAksi < cooldown) {
        const waktuTungguString = clockString(waktuTunggu);
        return m.reply(`⏳ Kamu baru aja ${aksi} tau~\nSabar ya, tunggu *${waktuTungguString}* dulu baru boleh ${aksi} lagi 😤`);
    }

    if (db.users[target].point < 10000) {
        return m.reply("😕 Eh, dia tuh miskin banget tau... Mau ambil apa coba? 😭");
    }
    if (db.users[target].limit < 10) {
        return m.reply("😕 Eh, dia tuh miskin banget tau... Mau ambil apa coba? 😭");
    }

    db.users[target].point -= jumlahTargetPoint;
    db.users[sender].point += jumlahTargetPoint;
    db.users[target].limit -= jumlahTargetLimit;
    db.users[sender].limit += jumlahTargetLimit;
    db.rpg[sender].lastrampok = now;

    return m.reply(`🎉 Yeay~ ${hasil} sukses!\nKamu dapet *${jumlahTargetPoint.toLocaleString()} Point* dan *${jumlahTargetLimit} Limit* dari orang itu~ 😈💰`);
};

nakano.help = ['rampok', 'robbery'];
nakano.tags = ['rpg'];
nakano.command = ['rampok', 'robbery'];
nakano.rpg = true;
nakano.group = true;

module.exports = nakano;