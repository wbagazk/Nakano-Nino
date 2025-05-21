const fs = require('fs');
const chalk = require('chalk');
const canvafy = require("canvafy");
const moment = require('moment-timezone');

const fakeQuoted = require('../../utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');
const { logMessage } = require('../../lib/library')

async function generateImage({ profilePicUrl, type, deskripsi }) {
    const image = await new canvafy.WelcomeLeave()
        .setAvatar(profilePicUrl)
        .setBackground("image", "https://64.media.tumblr.com/ff2339f5e880bfc411a8021d801cfa0d/8c60b3c305b23826-7c/s2048x3072/8e6d0e48ce004c027a70a757dba48283c2c872f4.png")
        .setTitle(type)
        .setDescription(deskripsi)
        .setBorder("#2a2e35")
        .setAvatarBorder("#2a2e35")
        .setOverlayOpacity(0.3)
        .build();
    return image;
}

function eventWelcomeLeave(NakanoNino, groupCache) {
    NakanoNino.ev.on('group-participants.update', async (event) => { 
        if (event.action !== 'add') return;
        if (!db.data.chats[event.id]?.welcome.check) return;
        try {
            const chatId = event.id;
            const metadata = await NakanoNino.groupMetadata(chatId);
            groupCache.set(chatId, metadata);
            const subject = metadata.subject;
            const participants = event.participants;
            for (let num of participants) {
                const profilePicUrl = await NakanoNino.profilePictureUrl(num, 'image')
                    .catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
                const participantName = `@${num.split('@')[0]}`;
                const pushname = await NakanoNino.getName(num);
                const imageBuffer = await generateImage({
                    profilePicUrl,
                    type: 'Welcome',
                    deskripsi: `Welcome to ${subject}`
                });
                const rawWelcomeText = db.data.chats[chatId]?.welcome.text || 
                    `✨ *Selamat Datang di Grup, Kak @user!* 👋\n\nHai Kak @pushname! Senang banget kamu bisa join di grup ini. Yuk, saling sapa dan kenalan sama member lainnya. Jangan lupa baca deskripsi grup ya~ 💬💕`;
                const welcomeText = rawWelcomeText
                    .replace(/@[^ ]*user/gi, participantName)
                    .replace(/@[^ ]*pushname/gi, pushname)
                    .replace(/@[^ ]*subject/gi, subject);
                NakanoNino.sendMessage(chatId, {
                    contextInfo: {
                        mentionedJid: [num],
                        externalAdReply: {
                            title: "W E L C O M E",
                            body: global.botName,
                            previewType: "PHOTO",
                            thumbnail: imageBuffer,
                            sourceUrl: "",
                            mediaType: 1
                        }
                    },
                    text: welcomeText
                }, { quoted: ftroli });
            }
        } catch (error) {
            console.error('❌ Terjadi kesalahan di fitur welcome (add):', error);
        }
    });

    NakanoNino.ev.on('group-participants.update', async (event) => {
        if (event.action !== 'remove') return;
        if (!db.data.chats[event.id]?.leave.check) return;
        try {
            const chatId = event.id;
            const metadata = await NakanoNino.groupMetadata(chatId);
            groupCache.set(chatId, metadata);
            const subject = metadata.subject;
            const participants = event.participants;
            for (let num of participants) {
                const profilePicUrl = await NakanoNino.profilePictureUrl(num, 'image')
                    .catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
                const participantName = `@${num.split('@')[0]}`;
                const pushname = await NakanoNino.getName(num);
                const imageBuffer = await generateImage({
                    profilePicUrl,
                    type: 'Goodbye',
                    deskripsi: `Goodbye from ${subject}`
                });
                const rawLeaveText = db.data.chats[chatId]?.leave.textleave || 
                    `😢 *Selamat Tinggal, Kak @user!* 👋\n\nTerima kasih sudah menjadi bagian dari grup ini. Semoga kita bisa bertemu lagi di lain kesempatan. Hati-hati di perjalanan ya~ 💐`;
                const leaveText = rawLeaveText
                    .replace(/@[^ ]*user/gi, participantName)
                    .replace(/@[^ ]*pushname/gi, pushname)
                    .replace(/@[^ ]*subject/gi, subject);
                NakanoNino.sendMessage(chatId, {
                    contextInfo: {
                        mentionedJid: [num],
                        externalAdReply: {
                            title: "G O O D  B Y E",
                            body: global.botName,
                            previewType: "PHOTO",
                            thumbnail: imageBuffer,
                            sourceUrl: "",
                            mediaType: 1
                        }
                    },
                    text: leaveText
                }, { quoted: ftroli });
            }
        } catch (error) {
            console.error('❌ Terjadi kesalahan di fitur goodbye (remove):', error);
        }
    });
};

function eventAdminUpdate(NakanoNino, groupCache) {
    NakanoNino.ev.on('group-participants.update', async (event) => {
        if (!db.data.chats[event.id]?.adminevent) return;

        try {
            const chatId = event.id;
            const metadata = await NakanoNino.groupMetadata(chatId);
            groupCache.set(chatId, metadata);
            const participants = event.participants;
            const subject = metadata.subject;
            const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
            const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');

            for (let num of participants) {
                const profilePicUrl = await NakanoNino.profilePictureUrl(num, 'image')
                    .catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
                const mentionName = `@${num.split('@')[0]}`;

                if (event.action === 'promote' || event.action === 'demote') {
                    const type = event.action === 'promote' ? 'Promote' : 'Demote';
                    const title = event.action === 'promote' ? 'P R O M O T E' : 'D E M O T E';
                    const message = event.action === 'promote'
                        ? `🎉 *Selamat ${mentionName}!* Kamu baru saja dipromosikan menjadi *admin* 🥳\n\nWaktu: ${time}\nTanggal: ${date}`
                        : `😬 *Ups, ${mentionName}!* Kamu telah *di-demote* dari posisi *admin*.\n\nWaktu: ${time}\nTanggal: ${date}`;

                    const imageBuffer = await generateImage({
                        profilePicUrl,
                        type,
                        deskripsi: `${type} in ${subject}`
                    });

                    await NakanoNino.sendMessage(chatId, {
                        contextInfo: {
                            mentionedJid: [num],
                            externalAdReply: {
                                title,
                                body: global.botName,
                                previewType: "PHOTO",
                                thumbnail: imageBuffer,
                                sourceUrl: "",
                                mediaType: 1
                            }
                        },
                        text: message
                    }, { quoted: ftroli });
                }
            }
        } catch (err) {
            console.error('❌ Terjadi kesalahan di fitur admin promote/demote:', err);
        }
    });
};

module.exports = { eventWelcomeLeave, eventAdminUpdate };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});