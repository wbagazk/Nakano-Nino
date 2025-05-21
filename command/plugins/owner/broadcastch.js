const fs = require('fs');
const path = require('path');
const fakeQuoted = require('@utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');

const whitelistPath = require.resolve('@function/whitelistbcch.json');

const loadWhitelist = () => fs.existsSync(whitelistPath) ? JSON.parse(fs.readFileSync(whitelistPath, 'utf-8')) : [];
const saveWhitelist = (data) => fs.writeFileSync(whitelistPath, JSON.stringify(data, null, 2));

const nakano = async (m, { wbk, quoted, prefix, command, args }) => {
    const arg0 = (args[0] || '').toLowerCase();
    const id = args[1] || '';
    const whitelist = loadWhitelist();

    if (!m.quoted && !arg0) {
        return m.reply(`📢 *Fitur Broadcast & Whitelist Channel*

🔹 *${prefix + command}* (reply pesan)
> Untuk broadcast pesan ke semua channel
🔹 *${prefix + command} whitelist* <id channel>
> Menambahkan channel ke whitelist\n
🔹 *${prefix + command} unwhitelist* <id channel>
> Menghapus channel dari whitelist
🔹 *${prefix + command} list*
> Menampilkan channel yang ada pada whitelist

Whitelist berguna agar hanya channel tertentu yang menerima broadcast`);
    }

    if (arg0 === 'whitelist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID channel.\nContoh: *${prefix + command} whitelist 123456-123@g.us*`);
        if (whitelist.includes(id)) return m.reply('✅ Channel sudah ada di whitelist.');
        whitelist.push(id);
        saveWhitelist(whitelist);
        return m.reply(`✅ Channel *${id}* berhasil ditambahkan ke whitelist.`);
    }

    if (arg0 === 'unwhitelist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID channel.\nContoh: *${prefix + command} unwhitelist 123456-123@g.us*`);
        if (!whitelist.includes(id)) return m.reply('⚠️ Channel tidak ditemukan di whitelist.');
        const updated = whitelist.filter(cid => cid !== id);
        saveWhitelist(updated);
        return m.reply(`✅ Channel *${id}* berhasil dihapus dari whitelist.`);
    }

    if (arg0 === 'list') {
        if (!whitelist.length) return m.reply('📭 Tidak ada channel dalam whitelist.');
        let listText = `📃 *Daftar Channel dalam Whitelist:*\n\n`;
        whitelist.forEach((cid, i) => {
            listText += `🔹 ${i + 1}. ${cid}\n`;
        });
        return m.reply(listText.trim());
    }

    if (!m.quoted) {
        return m.reply(`⚠️ Kakak harus reply pesan yang mau di-broadcast ya~\n\nContoh:\n1. Kirim dulu pesan atau media\n2. Lalu reply dengan:\n*${prefix + command}*`);
    }

    const broadcastText = quoted.text || quoted.caption;
    if (!whitelist.length) return m.reply(`📭 Tidak ada channel yang terdaftar dalam whitelist.`);

    m.reply(`📢 Mulai broadcast ke ${whitelist.length} channel...`);

    let success = 0, failed = 0;
    for (const id of whitelist) {
        try {
            await m.react('🕛')
            await wbk.sendMessage(id, {
                text: broadcastText
            }, { quoted: ftroli });

            await new Promise(res => setTimeout(res, 3000));
            success++;
            await m.react('✅')
        } catch (e) {
            console.error(`❌ Gagal kirim ke ${id}: ${e.message}`);
            failed++;
        }
    }

    m.reply(`✅ Broadcast ke Channel selesai!

📬 Berhasil: ${success} channel
❌ Gagal: ${failed} channel

📊 Total channel: ${whitelist.length}`);
};

nakano.help = ['broadcastch'];
nakano.category = ['owner'];
nakano.command = ['broadcastch', 'broadcastchannel', 'bcch'];
nakano.owner = true;

module.exports = nakano;