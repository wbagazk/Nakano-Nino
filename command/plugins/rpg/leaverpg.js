let nakano = async (m, { wbk, args, prefix, command }) => {
    const db = global.db.data;
    const user = global.db.data.users[m.sender];

    if (command === 'leaverpg') {
        const buttonMessage = {
            document: { url: "https://www.youtube.com/" },
            mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            fileName: m.pushName,
            fileLength: Infinity,
            pageCount: 2025,
            contextInfo: {
                forwardingScore: 9999,
                isForwarded: true,
                externalAdReply: {
                    mediaUrl: global.sosmed.website,
                    mediaType: 1,
                    previewType: 1,
                    title: "RPG-GAME (Pirate Adventure)",
                    body: "Petualangan bajak laut untuk cari kekayaan! 💰",
                    thumbnailUrl: "https://files.catbox.moe/avmsjk.jpg",
                    sourceUrl: global.sosmed.website,
                    renderLargerThumbnail: true
                },
            },
            caption: "😟 Yakin mau *keluar* dari dunia RPG?\nProgress kamu bakal *terhapus loh!* Kalau kamu serius, pencet *Yakin* ya~\nTapi kalau masih sayang sama aku... pencet *Lanjut RPG* aja 😤💕",
            footer: global.wm,
            buttons: [
                { buttonId: prefix + "yaleaverpg", buttonText: { displayText: "💔 Yakin" } },
                { buttonId: prefix + "tidakleaverpg", buttonText: { displayText: "❤️ Lanjut RPG" } }
            ],
            viewOnce: true,
            headerType: 6,
        };
        return await wbk.sendMessage(m.chat, buttonMessage, { quoted: m });
    }

    if (command === 'yaleaverpg') {
        if (!user.rpg) return m.reply("😐 Kamu udah keluar dari RPG sebelumnya...");
        delete db.rpg[m.sender];
        user.rpg = false;
        const messages = {
            title: "RPG-GAME (Pirate Adventure)",
            body: "Petualangan bajak laut untuk cari kekayaan! 💰",
            thumbnailUrl: "https://files.catbox.moe/avmsjk.jpg",
            sourceUrl: global.sosmed.website,
            mediaType: 1,
            renderLargerThumbnail: true
        };
        return await wbk.sendMessage(m.chat, {
            text: "💤 *GAME RPG BERAKHIR!*\n\nKamu udah keluar dari RPG-Game...\nSekarang kamu gak bisa lagi pake command RPG 😔",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.sosmed.idchwa,
                    serverMessageId: null,
                    newsletterName: global.wm
                },
                externalAdReply: messages
            }
        }, { quoted: m });
    }

    if (command === 'tidakleaverpg') {
        if (user.rpg) return m.reply("💞 Yatta! Terima kasih udah tetap bareng RPG-ku~");
        user.rpg = true;
        const messages = {
            title: "RPG-GAME (Pirate Adventure)",
            body: "Petualangan bajak laut untuk cari kekayaan! 💰",
            thumbnailUrl: "https://telegra.ph/file/d661d7829411b8bff9f5f.jpg",
            sourceUrl: global.sosmed.website,
            mediaType: 1,
            renderLargerThumbnail: true
        };
        return await wbk.sendMessage(m.chat, {
            text: "💗 *GAME RPG DIMULAI LAGI!*\n\nKamu kembali ke RPG-Game 🎮\nPetualangan belum selesai loh~ jadi jangan tinggalin aku lagi ya 😤💕",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.sosmed.idchwa,
                    serverMessageId: null,
                    newsletterName: global.wm
                },
                externalAdReply: messages
            }
        }, { quoted: m });
    }
};

nakano.help = ['leaverpg'];
nakano.category = ['rpg'];
nakano.command = ['leaverpg', 'yaleaverpg', 'tidakleaverpg'];

module.exports = nakano;