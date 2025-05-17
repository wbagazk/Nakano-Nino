const fs = require('fs');
const path = require('path');
const fakeQuoted = require('../../../utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');

const blacklistPath = path.join(__dirname, '../../../src/data/function/blacklistbcgc.json');
const whitelistPath = path.join(__dirname, '../../../src/data/function/whitelistbcch.json');

const loadBlacklist = () => fs.existsSync(blacklistPath) ? JSON.parse(fs.readFileSync(blacklistPath, 'utf-8')) : [];
const saveBlacklist = (data) => fs.writeFileSync(blacklistPath, JSON.stringify(data, null, 2));

const loadWhitelist = () => fs.existsSync(whitelistPath) ? JSON.parse(fs.readFileSync(whitelistPath, 'utf-8')) : [];
const saveWhitelist = (data) => fs.writeFileSync(whitelistPath, JSON.stringify(data, null, 2));

const nakano = async (m, { wbk, quoted, prefix, command, args, isGroup }) => {
    const arg0 = (args[0] || '').toLowerCase();
    const id = isGroup ? m.chat : (args[1] || '').trim();
    const blacklist = loadBlacklist();
    const whitelist = loadWhitelist();

    if (!m.quoted && !arg0) {
        return m.reply(
            `📢 *Fitur Broadcast, Blacklist Group & Whitelist Channel*\n\n` +
            `🔴 *Broadcast All*\n` +
            `🔹 *${prefix + command}* (reply pesan)\n> Broadcast ke semua grup & channel\n\n` +
            `🔴 *For Group*\n` +
            `🔹 *${prefix + command} blacklist* <id grup>\n> Tambah grup ke blacklist\n` +
            `🔹 *${prefix + command} unblacklist* <id grup>\n> Hapus grup dari blacklist\n` +
            `🔹 *${prefix + command} listblacklist*\n> Tampilkan daftar blacklist\n\n` +
            `🔴 *For Channel*\n` +
            `🔹 *${prefix + command} whitelist* <id channel>\n> Tambah channel ke whitelist\n` +
            `🔹 *${prefix + command} unwhitelist* <id channel>\n> Hapus channel dari whitelist\n` +
            `🔹 *${prefix + command} listwhitelist*\n> Tampilkan daftar whitelist`
        );
    }

    if (arg0 === 'blacklist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID grup.`);
        if (blacklist.includes(id)) return m.reply('✅ Grup sudah ada di blacklist.');
        blacklist.push(id);
        saveBlacklist(blacklist);
        return m.reply(`✅ Grup *${id}* berhasil ditambahkan ke blacklist.`);
    }

    if (arg0 === 'unblacklist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID grup.`);
        if (!blacklist.includes(id)) return m.reply('⚠️ Grup tidak ditemukan di blacklist.');
        const updated = blacklist.filter(gid => gid !== id);
        saveBlacklist(updated);
        return m.reply(`✅ Grup *${id}* berhasil dihapus dari blacklist.`);
    }

    if (arg0 === 'listblacklist') {
        if (!blacklist.length) return m.reply('📭 Tidak ada grup dalam blacklist.');
        let listText = `📃 *Daftar Grup di Blacklist:*
\n`;
        for (const gid of blacklist) {
            try {
                const metadata = await wbk.groupMetadata(gid);
                listText += `📛 ${metadata.subject}\n🆔 ${gid}\n\n`;
            } catch {
                listText += `📛 (gagal ambil nama grup)\n🆔 ${gid}\n\n`;
            }
        }
        return m.reply(listText.trim());
    }

    if (arg0 === 'whitelist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID channel.`);
        if (whitelist.includes(id)) return m.reply('✅ Channel sudah ada di whitelist.');
        whitelist.push(id);
        saveWhitelist(whitelist);
        return m.reply(`✅ Channel *${id}* berhasil ditambahkan ke whitelist.`);
    }

    if (arg0 === 'unwhitelist') {
        if (!id) return m.reply(`⚠️ Harap berikan ID channel.`);
        if (!whitelist.includes(id)) return m.reply('⚠️ Channel tidak ditemukan di whitelist.');
        const updated = whitelist.filter(cid => cid !== id);
        saveWhitelist(updated);
        return m.reply(`✅ Channel *${id}* berhasil dihapus dari whitelist.`);
    }

    if (arg0 === 'listwhitelist') {
        if (!whitelist.length) return m.reply('📭 Tidak ada channel dalam whitelist.');
        let listText = `📃 *Daftar Channel di Whitelist:*
\n`;
        whitelist.forEach((cid, i) => {
            listText += `🔹 ${i + 1}. ${cid}\n`;
        });
        return m.reply(listText.trim());
    }

    if (!m.quoted) {
        return m.reply(`⚠️ Kakak harus reply pesan yang mau di-broadcast ya~`);
    }

    const broadcastText = quoted.text || quoted.caption;
    const groups = await wbk.groupFetchAllParticipating();
    const groupIds = Object.keys(groups);

    let groupSuccess = 0, groupSkipped = 0;
    for (const gid of groupIds) {
        if (blacklist.includes(gid)) {
            groupSkipped++;
            continue;
        }
        try {
            await m.react('🕛')
            const metadata = await wbk.groupMetadata(gid);
            const participants = metadata.participants || [];
            await wbk.sendMessage(gid, {
                text: broadcastText,
                contextInfo: {
                    mentionedJid: participants.map(a => a.id)
                }
            }, { quoted: ftroli });
            await new Promise(res => setTimeout(res, 3000));
            groupSuccess++;
            await m.react('✅')
        } catch (e) {
            console.error(`❌ Gagal kirim ke grup ${gid}: ${e.message}`);
        }
    }

    let chSuccess = 0, chFailed = 0;
    for (const cid of whitelist) {
        try {
            await wbk.sendMessage(cid, {
                text: broadcastText
            }, { quoted: ftroli });
            await new Promise(res => setTimeout(res, 3000));
            chSuccess++;
        } catch (e) {
            console.error(`❌ Gagal kirim ke channel ${cid}: ${e.message}`);
            chFailed++;
        }
    }

    m.reply(`✅ Broadcast selesai!

📬 Grup Berhasil: ${groupSuccess}
🚫 Grup Blacklist: ${groupSkipped}

📺 Channel Berhasil: ${chSuccess}
❌ Channel Gagal: ${chFailed}

📊 Total Grup: ${groupIds.length}
📊 Total Channel: ${whitelist.length}`);
};

nakano.help = ['broadcast'];
nakano.tags = ['owner'];
nakano.command = ['broadcast', 'bc'];
nakano.owner = true;

module.exports = nakano;