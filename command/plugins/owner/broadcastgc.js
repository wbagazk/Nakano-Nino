const fs = require('fs');
const path = require('path');
const fakeQuoted = require('../../../utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');
const blacklistPath = path.join(__dirname, '../../../src/data/function/blacklistbcgc.json');

const loadBlacklist = () => fs.existsSync(blacklistPath) ? JSON.parse(fs.readFileSync(blacklistPath, 'utf-8')) : [];
const saveBlacklist = (data) => fs.writeFileSync(blacklistPath, JSON.stringify(data, null, 2));

const nakano = async (m, { wbk, quoted, prefix, command, args, isGroup }) => {
    const arg0 = (args[0] || '').toLowerCase();
    const id = isGroup ? m.chat : (args[1] || '').trim();
    const blacklist = loadBlacklist();

    if (!m.quoted && !arg0) {
        return m.reply(
            `📢 *Fitur Broadcast & Blacklist Grup*\n\n` +
            `🔹 *${prefix + command}* (reply pesan)\n> Untuk broadcast pesan ke semua grup\n` +
            `🔹 *${prefix + command} blacklist* <id grup>\n> Menambahkan grup ke list\n` +
            `🔹 *${prefix + command} unblacklist* <id grup>\n> Menghapus grup dari list\n` +
            `🔹 *${prefix + command} list*\n> Menampilkan grup yg ada pada list\n\n` +
            `📌 Blacklist berguna agar grup tertentu tidak menerima broadcast.`
        );
    }

    if (arg0 === 'blacklist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID grup.\nContoh: *${prefix}jpm blacklist 123456@g.us*`);
        if (blacklist.includes(id)) return m.reply('✅ Grup sudah ada di daftar blacklist.');
        blacklist.push(id);
        saveBlacklist(blacklist);
        return m.reply(`✅ Grup *${id}* berhasil ditambahkan ke blacklist.`);
    }

    if (arg0 === 'unblacklist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID grup.\nContoh: *${prefix}jpm unblacklist 123456@g.us*`);
        if (!blacklist.includes(id)) return m.reply('⚠️ Grup tidak ditemukan di blacklist.');
        const updated = blacklist.filter(gid => gid !== id);
        saveBlacklist(updated);
        return m.reply(`✅ Grup *${id}* berhasil dihapus dari blacklist.`);
    }
    
    if (arg0 === 'list') {
        if (!blacklist.length) return m.reply('📭 Tidak ada grup dalam blacklist.');
        let listText = `📃 *Daftar Grup di Blacklist:*\n\n`;
        for (const gid of blacklist) {
            try {
                const metadata = await wbk.groupMetadata(gid);
                listText += `📛 ${metadata.subject}\n🆔 ${gid}\n\n`;
            } catch {
                listText += `📛 (gagal mengambil nama grup)\n🆔 ${gid}\n\n`;
            }
        }
        return m.reply(listText.trim());
    }

    if (!m.quoted) {
        return m.reply(`⚠️ Kakak harus reply pesan yang mau di-broadcast ya~\n\nContoh:\n1. Kirim dulu pesan atau media\n2. Lalu reply dengan:\n*${prefix + command}*`);
    }

    const broadcastText = quoted.text || quoted.caption;
    const groups = await wbk.groupFetchAllParticipating();
    const groupIds = Object.keys(groups);

    if (!groupIds.length) return m.reply(`😢 Bot-nya belum join grup manapun kak...`);
    m.reply(`📢 Mulai broadcast ke ${groupIds.length} grup...`);

    let success = 0, skipped = 0;
    for (const id of groupIds) {
        if (blacklist.includes(id)) {
            skipped++;
            continue;
        }
        try {
            await m.react('🕛')
            const metadata = await wbk.groupMetadata(id);
            const participants = metadata.participants || [];

            await wbk.sendMessage(id, {
                text: broadcastText,
                contextInfo: {
                    mentionedJid: participants.map(a => a.id)
                }
            }, { quoted: ftroli });

            await new Promise(res => setTimeout(res, 5000));
            success++;
            await m.react('✅')
        } catch (e) {
            console.error(`❌ Gagal kirim ke ${id}: ${e.message}`);
        }
    }

    m.reply(`✅ Broadcast selesai!

📬 Berhasil: ${success} grup
🚫 Blacklist: ${skipped} grup

📊 Total grup: ${groupIds.length}`);
};

nakano.help = ['broadcastgc'];
nakano.tags = ['owner'];
nakano.command = ['broadcastgc', 'broadcastgroup', 'bcgc'];
nakano.owner = true;

module.exports = nakano;