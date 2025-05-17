const fakeQuoted = require('../../../utils/fakeQuoted');
const { ftroli } = fakeQuoted('', '', '', '', '');

const nakano = async (m, { wbk, quoted, prefix, command, args }) => {
    const arg0 = (args[0] || '').toLowerCase();

    if (arg0 === 'list') {
        const groups = await wbk.groupFetchAllParticipating();
        const groupIds = Object.keys(groups);

        if (!groupIds.length) return m.reply('😢 Bot belum join grup manapun kak...');

        let listText = `📃 *Daftar Grup Yang Tersedia:*\n\n`;
        for (const id of groupIds) {
            try {
                const metadata = await wbk.groupMetadata(id);
                listText += `📛 *${metadata.subject}*\n🆔 ${id}\n👥 Member: ${metadata.participants.length}\n\n`;
            } catch {
                listText += `📛 (gagal ambil nama grup)\n🆔 ${id}\n👥 Member: ?\n\n`;
            }
        }
        return m.reply(listText.trim());
    }

    const groupId = args[0];
    if (!groupId || !m.quoted) {
        return m.reply(
            `📢 *Fitur Kirim Pesan ke Semua Member Grup*\n\n` +
            `🔹 *${prefix + command}* <id grup> (reply pesan)\n> Kirim pesan ke semua member dalam grup\n` +
            `🔹 *${prefix + command} list*\n> Lihat daftar grup yang bot ikuti\n\n` +
            `📌 Contoh penggunaan:\n` +
            `1. Kirim dulu pesan atau media ke bot\n` +
            `2. Lalu reply pesan tersebut dengan:\n` +
            `   *${prefix + command} 1234567890@g.us*\n\n` +
            `🆔 ID grup bisa dilihat melalui perintah *${prefix + command} list*`
        );
    }

    const broadcastText = quoted.text || quoted.caption || '';
    if (!broadcastText) {
        return m.reply('⚠️ Tidak ada isi pesan yang bisa dikirim. Harap reply pesan teks atau media yang memiliki caption.');
    }

    try {
        await m.react('🕛')
        const metadata = await wbk.groupMetadata(groupId);
        const participants = metadata.participants || [];

        let success = 0, failed = 0;
        for (const member of participants) {
            try {
                await wbk.sendMessage(member.id, {
                    text: broadcastText
                }, { quoted: ftroli });
                success++;
                await m.react('✅')
            } catch {
                failed++;
            }
            await new Promise(res => setTimeout(res, 5000)); // ⏱️ Delay 5 detik
        }

        return m.reply(
            `✅ *Pesan Broadcast!*\n\n` +
            `📛 *${metadata.subject}*\n` +
            `🆔 ${groupId}\n` +
            `👥 Member Total: ${participants.length}\n\n` +
            `📬 Berhasil: ${success}\n❌ Gagal: ${failed}`
        );
    } catch (e) {
        console.error(`❌ Gagal mengambil metadata grup ${groupId}: ${e.message}`);
        return m.reply(`❌ Gagal memproses grup:\n🆔 ${groupId}\n📛 Error: ${e.message}`);
    }
};

nakano.help = ['broadcastctgc'];
nakano.tags = ['owner'];
nakano.command = ['broadcastctgc', 'broadcastcontactgc', 'bcctgc'];
nakano.owner = true;

module.exports = nakano;