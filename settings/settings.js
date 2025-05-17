/*
Ganti bagian yang dibutuhkan saja:)

false = mati
true  = hidup

Nakano Nino by WBK
*/

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

//=========================================================
// BOT
global.botName = 'Nakano Nino';
global.desc = '~Anata no koto o motto shiritai…';
global.ownerName = 'WBK';
global.ownerNumber = '0';
global.botNumber = '0@s.whatsapp.net'
global.creator = '0@s.whatsapp.net';
global.location = '11 Naitōmachi, Shinjuku City, Tokyo 160-0014, Jepang';
global.packname = '';
global.author = 'Nakano Nino - 覚悟しなさいよ！\n~ Kakugo shinasai yo!\n\n\n©WBK';
global.wm = 'Nakano Nino | WBK';
global.footer = 'Nakano Nino - 覚悟しなさいよ！';
//=========================================================

//=========================================================
// PREFIX, DB, DLL
global.idgcbackup = '0@g.us'; // untuk backup otomatis
global.prefa = '#', '.', '!';
global.databaseName = 'nakano-db.json';
global.sessionName = 'nakano-sesi';
global.hituet = 0;
global.autoblockcmd = true
global.public = true;
//=========================================================

// ========================================================
global.sosmed = {
    email: "0@gmail.com",
    yt: "",
    ig: "",
    tt: "",
    gh: "https://github.com/wbagazk",
    website: "https://wbagazk.my.id",
    gcwa: "https://chat.whatsapp.com/",
    chwa: "https://whatsapp.com/channel/",
    idgcwa: "0@g.us",
    idchwa: "0@newsletter",
};
// ========================================================

// ==================================================
// HEHEHE BANYAK, BIAR THUMBNAILNYA GANTI-GANTI
global.image = {
    main: fs.readFileSync(path.join(__dirname, '../src/media/thumbnail.jpeg')),
    thumb: [
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail1.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail2.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail3.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail4.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail5.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail6.jpeg'))
    ],
    thumbmusic: fs.readFileSync(path.join(__dirname, '../src/media/thumb-music.jpg')),
    thumbrpg: fs.readFileSync(path.join(__dirname, '../src/media/thumb-rpg.jpg')),
    levelup: fs.readFileSync(path.join(__dirname, '../src/media/levelup.png')),
    profile: fs.readFileSync(path.join(__dirname, '../src/media/profile.png')),
    avatar: fs.readFileSync(path.join(__dirname, '../src/media/avatar.png')),
    status: {
        error: fs.readFileSync(path.join(__dirname, '../src/media/error.png')),
    	denied: fs.readFileSync(path.join(__dirname, '../src/media/accessdenied.png')),
        detectbot: fs.readFileSync(path.join(__dirname, '../src/media/detectedBot.png')),
        detectlink: fs.readFileSync(path.join(__dirname, '../src/media/detectedLink.png')),
        detectbadword: fs.readFileSync(path.join(__dirname, '../src/media/detectedBadword.png')),
    },
    thumbUrl: [
        "https://qu.ax/epDkj.jpeg", "https://qu.ax/KzVqU.jpeg",
        "https://qu.ax/noTwC.jpeg", "https://qu.ax/XNwUD.jpg",
        "https://qu.ax/voCyG.jpeg", "https://qu.ax/KqtWr.jpeg"
    ],
    errorUrl: "https://files.catbox.moe/rclqvi.jpeg"
};
// ==================================================

//=========================================================
// LIMIT DAN UANG
global.limit = {
	free: 20, // Limit User Non-premium
	premium: 999, // Limit User Premium
	vip: 9999 // Limit User VIP 👑
};
global.point = {
	free: 10000, // Uang User Non-premium
	premium: 100000, // Uang User Premium
	vip: 1000000 // Uang User VIP 👑
};
global.bot = {
	limit: 0, // Limit Awal Bot
	uang: 0 // Uang Awal Bot
};
//=========================================================

//=========================================================
// REPLY/BALASAN PESAN
global.mess = {
	admin: 'Ehh? Fitur ini cuma bisa dipakai admin grup, ya... Jangan asal coba-coba~ 🙅‍♀️',
	botAdmin: 'Aku harus jadi admin dulu nih, baru bisa jalankan ini. Bantu aku, ya! 😣',
	group: 'Fitur ini cuma berlaku di grup, jangan dipakai di sini dong~ 🙃',
	limit: 'Limit kamu sudah habis, ya... Jangan boros-boros dong! 😤\n\n- Ketik #cpoint\n> untuk menukar point jadi limit\n- Ketik #daily\n> untuk ambil limit harianmu~\n─────────────────────────\n\n> ⏰Limit akan direset tiap hari jam 02.00 WIB',
	nocmd: 'Eh? Perintah itu nggak ada, deh... Jangan bikin aku bingung begitu dong! 🤨',
	nsfw: 'Fitur NSFW-nya lagi dimatikan di grup ini. Kalau perlu, izin dulu ke admin ya~ 😳',
	owner: 'Ini... cuma bisa dipakai pemilik bot aja. Jangan maksa, ya~ 🙏',
	premium: 'Maaf ya, fitur ini khusus buat pengguna premium... Tapi kamu bisa jadi premium juga, kok! ✨',
	private: 'Umm... fitur ini cuma bisa dipakai di chat pribadi. Yuk, chat aku langsung aja~ 💌',
	rpg: 'Kamu belum terdaftar di RPG nih. Ayo Join dulu, biar bisa main bareng aku! 🎮\n> Ketik #joinrpg',
	success: 'Yatta~ berhasil! Tapi jangan senang dulu, masih banyak yang harus dilakukan, lho~ 😌',
	done: 'Sudah selesai, ya. Semoga bermanfaat! ✨',
	error: 'Eh? Kayaknya ada yang salah deh... Coba ulangi dengan benar, ya! 😥',
	wait: 'Tunggu sebentar, ya... Aku lagi proses nih! Jangan buru-buru dong~ 😖'
};
//=========================================================

//=========================================================
// SETTING GITHUB CDN
global.githubCDN = {
    user: "0", // Ganti dengan username GitHub
    repo: "0", // Ganti dengan nama repositori
    token: "0" // Ganti dengan token, ambil di > https://github.com/settings/tokens/new
}
//=========================================================

//=========================================================
// SETTING ORDER KUOTA >>> CEK OKECONNECT
global.orderkuota = {
    merchant: "0",
    member: "0",
    pin: "0",
    password: "0",
    apikey: "0",
    qrcode: "00020101021226670016COM.NOBUBANK.WWW01189360050300000879140214459472381924500303UMI51440014ID.CO.QRIS.WWW0215ID20222129272240303UMI520448145303360540115802ID5914BAGAZ STORE ID6006JEMBER61056811162070703A0163049B3E"
}
//=========================================================

//=========================================================
// SETTING ALL APIKEY
global.apikey = {
    atlantic: "0",
    groqapi: "0",
    openaiapi: "0",
    geminiapi: "0",
    mistral: "0"
};
//=========================================================

//=========================================================
// SETTING API
global.api = {
    siputzx: "https://api.siputzx.my.id/api",
    fastrestapis: "https://fastrestapis.fasturl.cloud",
    betabotz: {
        url: "https://api.betabotz.eu.org/api",
        key: "WBKApikey"
    }
};
//=========================================================

//=========================================================
// NOTif CONSOLE
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🆙  FILE UPDATE  🆙`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(10)} : ${__filename.toUpperCase()}  `));
    console.log(chalk.greenBright(`📝  ${"MESSAGE".padEnd(10)} : Changes have been applied!  ✅`));
    console.log(chalk.white("------------------------------------------"));
    delete require.cache[file];
    require(file);
});