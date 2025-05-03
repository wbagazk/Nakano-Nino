const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

//=========================================================
// BOT
global.botName = 'Nakano Nino';
global.desc = '~Anata no koto o motto shiritai…';
global.ownerName = 'WBK';
global.ownerNumber = '6285183134846';
global.creator = '6285183134846@s.whatsapp.net';
global.location = '11 Naitōmachi, Shinjuku City, Tokyo 160-0014, Jepang';
global.packname = '';
global.author = 'Nakano Nino - 覚悟しなさいよ！\n~ Kakugo shinasai yo!\n\n\n©WBK\n\n\n\n\n\n\n\n\n\nhttps://wbagazk.my.id/';
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
global.autoblocknumber = '60';
global.antiforeignnumber = '60';
global.public = true;
global.welcome = true;
global.anticall = true;
global.antispam = true;
global.adminevent = true;
global.groupevent = true;
global.autoblockcmd = true
global.autoswview = true;
//=========================================================

//=========================================================
// ATUR SENDIRI WAKTUNYA & TRUE/FALSE
global.autobackup = true;
global.intervalautobackup = 2 * 60 * 60 * 1000; // artinya 2 jam sekali
global.autoclearsession = false;
global.intervalautoclearsession = 5 * 60 * 60 * 1000;
global.autocleartemp = true;
global.intervalautocleartemp = 3 * 60 * 60 * 1000;

// ========================================================
global.sosmed = {
    yt: "-",
    ig: "-",
    tt: "-",
    gh: "-",
    website: "https://github.com/wbagazk",
    gcwa: "https://chat.whatsapp.com/0",
    chwa: "-",
    idgcwa: "0@g.us",
    idchwa: "0@newsletter",
};
// ========================================================

// ==================================================
// hehehe banyak, biar thumbnailnya ganti-ganti
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
    error: fs.readFileSync(path.join(__dirname, '../src/media/error.png')),
    denied: fs.readFileSync(path.join(__dirname, '../src/media/accessdenied.png')),
    thumbUrl: [
        "https://files.catbox.moe/c5cv8j.jpeg", "https://files.catbox.moe/bl0ce5.jpeg",
        "https://files.catbox.moe/gjgwkx.jpg", "https://files.catbox.moe/t8mdo1.jpeg",
        "https://files.catbox.moe/b8nrqm.jpeg", "https://files.catbox.moe/3zs8ge.jpeg"
    ],
    errorUrl: "https://files.catbox.moe/rclqvi.jpeg"
};
// ==================================================

//=========================================================
// LIMIT DAN UANG
global.limit = {
    free: 20, // Limit User Non-premium
    premium: 999, // Limit User Premium
    vip: '9999' // Limit User VIP 👑
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
    admin: 'Fitur ini khusus buat admin aja ya, Kak! 🫢',
    botAdmin: 'AIzero harus jadi admin dulu biar bisa jalanin ini! 😭',
    group: 'Eits, fitur ini cuma bisa dipakai di grup~ 🫡',
    limit: 'Yah, limit penggunaan Kakak udah habis... 😢\n\n- Ketik #cpoint\n> untuk menukarkan point menjadi limit🌟\n- Ketik #daily\n> untuk mengambil limit harian ✨\n─────────────────────────\n\n> ⏰Limit akan direset setiap harinya dijam 02.00 WIB',
    nocmd: 'Hmm... perintahnya gak ada di daftar AIzero nih. Coba cek lagi ya, Kak! 🤔',
    nsfw: 'Fitur NSFW dimatikan di grup ini, coba minta izin ke admin dulu ya~ 🫣',
    owner: 'Hanya pemilik yang bisa akses fitur ini, Kak! 👑',
    premium: 'Fitur ini cuma buat pengguna premium, Kak! 🌟',
    private: 'Fitur ini cuma bisa dipakai di chat pribadi, Kak! 💌',
    rpg: 'Kamu belum terdaftar RPG',
    success: 'Yeay, berhasil! 🎉',
    done: 'Done Kak! ✨',
    error: 'Eh, ada yang salah nih... coba lagi ya, Kak! 😖',
    wait: 'Tunggu sebentar ya, Kak... Aizero lagi proses nih! ⏳🤗'
};

global.reply = {
    error: '‼️ERROR HUBUNGI OWNER‼️\n\n_Ada kesalahan saat menghubungi penyedia API/Server_',
    minusLimit: 'Limit kamu telah dikurangi sebanyak *1*\n┏ Limit kamu tersisa',
    noMinusLimit: 'Dikarenakan error maka limit kamu tidak dikurangi\n┏ Limit kamu tersisa',
};
//=========================================================

//=========================================================
// SETTING GITHUB CDN
global.githubCDN = {
    user: "-", // Ganti dengan username GitHub
    repo: "-", // Ganti dengan nama repositori
    token: "-" // Ganti dengan token, ambil di > https://github.com/settings/tokens/new
}
//=========================================================

//=========================================================
// SETTING ORDER KUOTA >>> CEK OKECONNECT
global.orderkuota = {
    merchant: "-",
    member: "-",
    pin: "-",
    password: "-",
    apikey: "-",
    qrcode: "-"
}
//=========================================================

//=========================================================
// SETTING ALL APIKEY
global.apikey = {
    atlantic: "-",
    groqapi: "-",
    openaiapi: "-",
    mistral: "-"
};
//=========================================================

//=========================================================
// SETTING API
global.api = {
    fastrestapis: "https://fastrestapis.fasturl.cloud",
    siputzx: "https://api.siputzx.my.id/api",
    agatz: "https://api.agatz.xyz/api",
    ryzendesu: "https://api.ryzendesu.vip/api"
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