const fs = require('fs');
const { logMessage } = require('../lib/library')

//=========================================================
// BOT
global.botName = 'Nakano Nino';
global.desc = '~Anata no koto o motto shiritai…';
global.ownerName = 'WBK';
global.ownerNumber = '6285183134846';
global.creator = '6285183134846@s.whatsapp.net';
global.location = '11 Naitōmachi, Shinjuku City, Tokyo 160-0014, Jepang';
global.packname = '';
global.author = 'Nakano Nino - 覚悟しなさいよ！\n~ Kakugo shinasai yo!\n\n\n©WBK';
global.wm = 'Nakano Nino | WBK';
global.footer = 'Nakano Nino - 覚悟しなさいよ！';
//=========================================================

//=========================================================
// PREFIX, DB, DLL
global.idgcbackup = '120363410701967881@g.us'; // untuk backup otomatis
global.prefa = '#', '.', '!';
global.databaseName = 'nakano-db.json';
global.sessionName = 'nakano-sesi';
global.hituet = 0;
global.autoblocknumber = '60';
global.antiforeignnumber = '60';
global.public = true;
global.autoblockcmd = true;
//=========================================================

// ========================================================
global.sosmed = {
    email: "wbagazk@gmail.com",
    yt: "",
    ig: "",
    tt: "",
    gh: "https://github.com/wbagazk",
    website: "https://wbagazk.my.id",
    gcwa: "https://chat.whatsapp.com/L7MxIu1273d7fCl1p8Gbhk",
    chwa: "https://whatsapp.com/channel/0029Vaxp0W0CXC3RhmaRUt2b",
    idgcwa: "6281938781378-1613534871@g.us",
    idchwa: "120363369378768979@newsletter",
};
// ========================================================

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
// NOTif CONSOLE
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});