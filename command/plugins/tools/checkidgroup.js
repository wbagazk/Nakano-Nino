const { litespace } = require('../../../utils/myfunc');
const { sendButtonText } = require('../../../utils/messageButton');

let nakano = async (m, { wbk, args, isGroup, prefix, command }) => {
    let groupId;
    let metadata;

    if (isGroup && args.length === 0) {
        groupId = m.chat;
        metadata = await wbk.groupMetadata(groupId);
    } else if (!isGroup && args[0]?.includes('chat.whatsapp.com')) {
        let inviteCode = args[0].split('/').pop().trim();
        if (!inviteCode) return m.reply('❗Link tidak valid!');
        try {
            groupId = await wbk.groupAcceptInvite(inviteCode).catch(() => null);
            if (!groupId) return m.reply('❗Gagal mendapatkan ID grup dari link.');
            metadata = await wbk.groupMetadata(groupId);
        } catch (e) {
            return m.reply('❗Terjadi kesalahan saat memproses link grup.');
        }
    } else {
        return m.reply(`😠 Huh?! Kamu pikir aku bisa baca pikiranmu atau apa?\nKalau bukan di grup, kamu *harus* kasih aku link grup-nya, tahu!💢\n\nContoh:\n*${prefix + command} chat.whatsapp.com/xxxxxxxxxxxxx*\n\nJangan bikin aku mengulanginya lagi, ya!🫶`);
    }

    const link = `https://chat.whatsapp.com/${await wbk.groupInviteCode(groupId)}`;
    const teks = `✨ ${litespace("INFORMASI GROUP")} ✨\n\n` +
          		 `*📛 Nama:* ${metadata.subject}\n` +
                 `*🆔 ID:* ${groupId}\n` +
                 `*👥 Member:* ${metadata.participants.length}\n` +
                 `*📝 Deskripsi:*\n${metadata.desc?.toString() || 'Tidak ada deskripsi'}`;

    const button = [
        {
            name: "cta_copy",
            buttonParamsJson: `{
                "display_text": "Copy ID Group",
                "id": "${groupId}",
                "copy_code": "${groupId}"
            }`,
        },
        {
            name: "cta_copy",
            buttonParamsJson: `{
                "display_text": "Copy Link Group",
                "id": "${link}",
                "copy_code": "${link}"
            }`,
        }
    ];

    sendButtonText(wbk, m.chat, button, teks, global.footer, m);
};

nakano.help = ['checkidgroup'];
nakano.tags = ['tools'];
nakano.command = ['checkidgroup', 'cekidgc', 'cekgcid'];
nakano.limit = true;

module.exports = nakano;