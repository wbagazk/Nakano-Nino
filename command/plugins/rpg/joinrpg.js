let nakano = async (m, { wbk, args, prefix, command }) => {
    const user = global.db.data.users[m.sender];
    if (user.rpg) return m.reply("😒 Kamu udah join sebelumnya! Jangan sok lupa ya!");
    user.rpg = true;
    
    const saluranId = {
        newsletterJid: global.sosmed.idchwa,
        serverMessageId: null,
        newsletterName: global.wm
    };

    const messages = {
        title: "🏴‍☠️ RPG-GAME (Pirate Adventure)",
        body: "Petualangan bajak laut demi harta karun dan kejayaan! 💰⚔️",
        thumbnailUrl: "https://files.catbox.moe/ggoqql.jpg",
        sourceUrl: global.website,
        mediaType: 1,
        renderLargerThumbnail: true
    };
    
    const text = `✨ *RPG DIMULAI!* ✨

Yatta~ kamu berhasil join *RPG Game*!! 🎮
Sekarang kamu bisa mulai petualanganmu, jadi pahlawan bajak laut pencari harta karun! ⚔️💎

Ayo semangat ya, jangan bikin aku nyesel ngajak kamu main... 😤💕`;

    await wbk.sendMessage(m.chat, {
        text: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: saluranId,
            externalAdReply: messages
        }
    }, { quoted: m });
};

nakano.help = ['joinrpg'];
nakano.tags = ['rpg'];
nakano.command = ['joinrpg'];

module.exports = nakano;