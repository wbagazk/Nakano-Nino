const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');
const { sleep } = require('../../utils/myfunc');

function eventGroupUpdate(NakanoNino, groupCache) {
	NakanoNino.ev.on('groups.update', async (event) => {
        const metadata = await NakanoNino.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })

    NakanoNino.ev.on("groups.update", async (json) => {
        const res = json[0];
        if (!db.data.chats[res.id]?.groupevent) return;

        try {
            if (res.announce === true) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🔒 *Oops, Gerbang Grup Ditutup!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Jangan sedih ya, tunggu admin buka lagi! 🥺✨`,
                });
            } else if (res.announce === false) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🔓 *Yay, Gerbang Grup Terbuka!* 🔓\n\nSekarang semua anggota bebas ngobrol seru lagi di sini. Ayo ramein! 🎉😄`,
                });
            }

            if (res.restrict === true) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🔐 *Info Grup Dikunci!* 🔐\n\nHanya *admin* yang bisa edit info grup sekarang. Tetap tertib ya! 😇📚`,
                });
            } else if (res.restrict === false) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🔓 *Info Grup Dibuka!* 🔓\n\nSemua anggota bisa ikut edit info grup. Jangan lupa sopan dan bijak ya! 😊📢`,
                });
            }

            if (res.desc) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `📝 *Deskripsi Baru Nih!* 📝\n\nGrup ini punya deskripsi baru lho:\n\n${res.desc}\n\nKeren gak? 😍✨`,
                });
            }

            if (res.subject) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🖊️ *Nama Grup Baru!* 🖊️\n\nSekarang grup kita punya nama baru:\n\n*${res.subject}*\n\nGimana, kece kan? 😎🔥`,
                });
            }

            if (res.memberAddMode === true) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🛡️ *Tambah Anggota? Tertutup Dulu!* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Yuk, patuhi aturan ya! 👀✨`,
                });
            } else if (res.memberAddMode === false) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `✅ *Tambah Anggota Bebas!* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Ayo tambah rame! 🥳🎈`,
                });
            }

            if (res.joinApprovalMode === true) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `🛡️ *Pintu Masuk Dijaga Ketat!* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🤝🔒`,
                });
            } else if (res.joinApprovalMode === false) {
                await sleep(2000);
                NakanoNino.sendMessage(res.id, {
                    text: `✅ *Pintu Masuk Terbuka Lebar!* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah rame di sini! 🎊😊`,
                });
            }

        } catch (error) {
            console.error('❌ Oops, ada yang error waktu proses pembaruan grup:', error);
        }
    });
}

module.exports = { eventGroupUpdate };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🆙  FILE UPDATE  🆙`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(20)}  : ${__filename.toUpperCase()}  `));
    console.log(chalk.greenBright(`📝  ${"MESSAGE".padEnd(20)}  : Changes have been applied!  ✅`));
    console.log(chalk.white("------------------------------------------"));
    delete require.cache[file];
    require(file);
});