const fs = require('fs');
const path = require('path');

const fiturErrorPath = path.join(__dirname, '../../../src/data/function/fiturerror.json');

const handler = async (m, { args, prefix, command }) => {
    let data;
    try {
        const fileContent = fs.readFileSync(fiturErrorPath, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (e) {
        return m.reply('⚠️ Gagal membaca data error.');
    }

    if (!Array.isArray(data.listcmdblock) || data.listcmdblock.length === 0) {
        return m.reply('✅ Tidak ada command yang diblokir karena error.');
    }

    // Handle fixerror clear
    if (args[0] === 'all') {
        data.listcmdblock = [];
        fs.writeFileSync(fiturErrorPath, JSON.stringify(data, null, 2));
        return m.reply('✅ Semua command yang diblokir berhasil dibuka kembali!');
    }

    // Handle fixerror <nomor> (berdasarkan nomor urut)
    if (args[0] && !isNaN(args[0])) {
        const index = parseInt(args[0]) - 1;
        if (index >= 0 && index < data.listcmdblock.length) {
            const removed = data.listcmdblock.splice(index, 1)[0];
            fs.writeFileSync(fiturErrorPath, JSON.stringify(data, null, 2));
            return m.reply(`✅ Command "${removed.command}" dari plugin "${removed.plugin}" berhasil dibuka kembali!`);
        } else {
            return m.reply('❌ Nomor tidak valid!');
        }
    }

    // Handle fixerror <item.command> (berdasarkan nama command)
    if (args[0]) {
        const commandName = args[0];
        const index = data.listcmdblock.findIndex(item => item.command === commandName);

        if (index !== -1) {
            const removed = data.listcmdblock.splice(index, 1)[0];
            fs.writeFileSync(fiturErrorPath, JSON.stringify(data, null, 2));
            return m.reply(`✅ Command "${removed.command}" dari plugin "${removed.plugin}" berhasil dibuka kembali!`);
        } else {
            return m.reply('❌ Command tidak ditemukan!');
        }
    }

    // Tampilkan daftar blok
    let teks = `📛 *Daftar Command Terblokir (karena error)*\n\n`;
    data.listcmdblock.forEach((item, i) => {
        teks += `${i + 1} Command: ${item.command}\n- Plugin: ${item.plugin}\n- Attempt: ${item.attempt}\n\n`;
    });

    teks += `Ketik:\n➡️ *${prefix + command} <nomor>* untuk membuka blokir berdasarkan nomor\n➡️ *${prefix + command} <command>* untuk membuka blokir berdasarkan nama command\n➡️ *${prefix + command} all* untuk membuka semua`;

    m.reply(teks.trim());
};

handler.help = ['fixplugin'];
handler.tags = ['owner'];
handler.command = ['fixplugin'];
handler.owner = true;

module.exports = handler;