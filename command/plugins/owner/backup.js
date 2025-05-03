const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const { generateRandomHexName } = require('../../../utils/myfunc');

let nakano = async (m, { wbk }) => {
    try {
        const filename = await generateRandomHexName(5);
        const excluded = ['node_modules', 'package-lock.json', '.git', '.cache', '.npm'];

        const allFiles = execSync('ls').toString().split('\n').filter(file =>
            file && !excluded.includes(file)
        );

        if (!allFiles.length) return m.reply('📂 Tidak ada file yang bisa dibackup.');

        if (!m.isGroup) {
            await m.reply('🗂️ Membuat backup...');
        } else {
            await m.reply('🗂️ Membuat backup...\nFile akan dikirim lewat chat pribadi.');
        }

        execSync(`zip -r -q ${filename}.zip ${allFiles.join(' ')}`);

        const zipPath = path.resolve(`${filename}.zip`);
        const buffer = fs.readFileSync(zipPath);

        await wbk.sendMessage(m.sender, {
            document: buffer,
            mimetype: 'application/zip',
            fileName: `Backup-${filename}.zip`,
            caption: '✅ Backup berhasil! Simpan file ini baik-baik ya.'
        }, { quoted: m });

        fs.unlinkSync(zipPath);
    } catch (err) {
        console.error('[ERROR BACKUP]', err);
        return m.reply('❌ Gagal melakukan backup. Coba lagi nanti.');
    }
};

nakano.help = ['backup'];
nakano.tags = ['owner'];
nakano.command = ['backup'];
nakano.owner = true;

module.exports = nakano;