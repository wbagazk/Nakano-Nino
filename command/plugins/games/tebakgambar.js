/*const fetch = require('node-fetch');
const { pickRandom } = require('../../../utils/myfunc');
global.tebakgambar = global.tebakgambar || {};

let nakano = async (m, { wbk, db }) => {
    const chatId = m.chat;
    const user = db.data.users[m.sender];

    if (global.tebakgambar[chatId]) return m.reply('❗ Masih ada soal yang belum dijawab.\nKetik *.nyerah* untuk menyerah.');

    const res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json');
    const data = await res.json();
    const soal = pickRandom(data);

    const kirim = await wbk.sendMessage(chatId, {
        image: { url: soal.img },
        caption:
            `🧠 *Tebak Gambar!*\n\n` +
            `📌 Deskripsi: ${soal.deskripsi}\n` +
            `⏱️ Waktu: 60 detik\n\n` +
            `_Ketik *.nyerah* untuk menyerah_\n` +
            `_Ketik *.bantuan* untuk petunjuk_`
    }, { quoted: m });

    global.tebakgambar[chatId] = [
        kirim,
        soal,
        setTimeout(() => {
            if (global.tebakgambar[chatId]) {
                wbk.sendMessage(chatId, { text: `⏰ Waktu habis!\nJawabannya adalah: *${soal.jawaban}*` });
                delete global.tebakgambar[chatId];
            }
        }, 60000)
    ];
};

nakano.help = ['tebakgambar'];
nakano.tags = ['games'];
nakano.command = ['tebakgambar'];

module.exports = nakano;*/