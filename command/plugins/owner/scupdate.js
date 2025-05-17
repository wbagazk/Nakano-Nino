const fs = require('fs');
const path = require('path');
const axios = require('axios');

const nakano = async (m, { args, prefix, command }) => {
    if (!args[0]) {
        return m.reply(`⚠️ Contoh penggunaan:\n${prefix + command} https://github.com/user/repo/blob/branch/path/file1.js|https://github.com/user/repo/blob/branch/path/file2.js`);
    }

    const urls = args[0].split('|').map(u => u.trim()).filter(Boolean);

    let resultLog = '🛠️ *UPDATE LOG*\n\n';

    for (const link of urls) {
        let url = link;

        if (url.includes('github.com') && url.includes('/blob/')) {
            url = url
                .replace('https://github.com/', 'https://raw.githubusercontent.com/')
                .replace('/blob/', '/refs/heads/');
        }

        if (!url.startsWith('https://raw.githubusercontent.com/')) {
            resultLog += `❌ *Gagal:* URL tidak valid\n🔗 ${link}\n\n`;
            continue;
        }

        try {
            const res = await axios.get(url);
            let content = res.data;

            const match = url.match(/githubusercontent\.com\/[^/]+\/[^/]+\/refs\/heads\/[^/]+\/(.+)/);
            if (!match) {
                resultLog += `❌ *Gagal:* Tidak bisa membaca path\n🔗 ${link}\n\n`;
                continue;
            }

            const relativePath = match[1];
            const filePath = path.resolve(__dirname, '../../../', relativePath);
            const dirPath = path.dirname(filePath);

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            if (typeof content !== 'string') {
                content = JSON.stringify(content, null, 2);
            }

            fs.writeFileSync(filePath, content, 'utf-8');

            resultLog += `✅ *Berhasil update file!*\n📁 ${relativePath}\n🔗 ${link}\n\n`;

        } catch (err) {
            resultLog += `❌ *Gagal download atau update:*\n🔗 ${link}\n🪲 Error: ${err.message}\n\n`;
        }
    }

    m.reply(resultLog.trim());
};

nakano.help = ['scupdate'];
nakano.tags = ['owner'];
nakano.command = ['scupdate'];
nakano.owner = true;

module.exports = nakano;