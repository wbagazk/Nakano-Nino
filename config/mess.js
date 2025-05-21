const fs = require('fs');
const { logMessage } = require('../lib/library')

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
	rpg: 'Kamu belum terdaftar di RPG nih. Ayo daftar dulu, biar bisa main bareng aku! 🎮',
	success: 'Yatta~ berhasil! Tapi jangan senang dulu, masih banyak yang harus dilakukan, lho~ 😌',
	done: 'Sudah selesai, ya. Semoga bermanfaat! ✨',
	error: 'Eh? Kayaknya ada yang salah deh... Coba ulangi dengan benar, ya! 😥',
	wait: 'Tunggu sebentar, ya... Aku lagi proses nih! Jangan buru-buru dong~ 😖'
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