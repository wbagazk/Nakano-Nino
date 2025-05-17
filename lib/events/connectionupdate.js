require('../../settings/settings')
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const moment = require('moment-timezone');
const { DisconnectReason } = require('baileys');

const { runtime, sleep } = require('../../utils/myfunc');
const fakeQuoted = require('../../utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');

function getRandomThumb() {
    const thumbs = global.image?.thumb || []
    if (!thumbs.length) return null
    return thumbs[Math.floor(Math.random() * thumbs.length)]
}
const nakanonino = getRandomThumb()

function logMessage(title, message) {
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SISTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🚀  ${title}  🚀`)));
    console.log(chalk.cyanBright(`📅  ${"Tanggal".padEnd(20)} : ${new Date().toLocaleString("id-ID")}`));
    console.log(chalk.yellowBright(`📝  ${"Pesan".padEnd(20)} : ${message}`));
    console.log(chalk.white("------------------------------------------"));
}

function eventConnectionUpdate(NakanoNino, letsGoNakano) {
    NakanoNino.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            logMessage("Restart Required", `${lastDisconnect?.error?.message}`);
			process.exit();
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                logMessage("Bad Session File", "Please Delete Session and Scan Again");
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                logMessage("Connection closed", "Trying to reconnect....");
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                logMessage("Connection Lost from Server", "Trying to reconnect....");
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                logMessage("Connection Replaced", "Another New Session Opened, Please Restart Bot");
                await sleep(2000);
                logMessage("Restart Required", "Restarting....");
                // process.exit();
            } else if (reason === DisconnectReason.loggedOut) {
                logMessage("Device Logged Out", "Please Delete Folder Session and Scan Again.");
                NakanoNino.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                logMessage("Restart Required", "Restarting....");
                letsGoNakano();
            } else if (reason === DisconnectReason.timedOut) {
                logMessage("Connection TimedOut", "Reconnecting....");
                letsGoNakano();
            }
        } else if (connection === "connecting") {
            logMessage("Connecting", "Connecting....");
        } else if (connection === "open") {
            await sleep(5000);
            console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
            console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🚀  CONNECTION SUCCESS  🚀`)));
            console.log(chalk.cyanBright(`📅  ${"DATE".padEnd(20)} : ${new Date().toLocaleString("id-ID")}`));
            console.log(chalk.greenBright(`📞  ${"CONNECTED TO".padEnd(20)} : ${NakanoNino.user.id.replace(/:[^@]+/, '')}`));
            console.log(chalk.yellowBright(`📝  ${"MESSAGE".padEnd(20)} : Nakano sudah siap, kak! Selamat menjalankan bot-nya ya~ 🥳🎈`));
            console.log(chalk.white("------------------------------------------"));

            async function sendNotifToOwner() {
                const waktuSekarang = moment().tz("Asia/Jakarta").format("HH:mm:ss");
                const tanggalSekarang = moment().tz("Asia/Jakarta").format("DD MMMM YYYY");
                const uptime = process.uptime();
                const ipAddress = os.networkInterfaces()?.eth0?.[0]?.address || "Tidak diketahui";

                let captionText = "✅ *Bot Berhasil Terhubung!*\n\n";
                captionText += `📅 *Tanggal:* ${tanggalSekarang}\n`;
                captionText += `⏰ *Waktu:* ${waktuSekarang} WIB\n`;
                captionText += `📡 *Status:* Online\n`;
                captionText += `🌍 *IP Address:* ${ipAddress}\n`;
                captionText += `⏳ *Runtime:* ${runtime(uptime)}\n\n`;
                captionText += "🚀 Bot siap digunakan, silahkan ketik *.menu* untuk melihat daftar menu yang tersedia.";

                await NakanoNino.sendMessage(global.creator, {
                    image: nakanonino,
                    caption: captionText
                }, { quoted: ftroli });
            }

            await sendNotifToOwner();
        }
    });
}

module.exports = { eventConnectionUpdate };

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