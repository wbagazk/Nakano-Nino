const { generateWAMessageFromContent, proto, getBinaryNodeChildren, getBinaryNodeChild } = require('baileys');

const addkick = async (m, { wbk, args, command, quoted }) => {
    const isAdd = ['add'].includes(command);
    const isKick = ['kick', 'dor'].includes(command);

    const senderNumber = m.sender.split('@')[0];
    const botNumber = wbk.user.id.split('@')[0];

    const metadata = await wbk.groupMetadata(m.chat).catch(() => null);
    if (!metadata) return m.reply("⚠️ Gagal mendapatkan info grup.");

    const groupName = metadata.subject;
    const participants = metadata.participants.map(p => p.id);
    const inviteCode = await wbk.groupInviteCode(m.chat).catch(() => null);
    if (!inviteCode) return m.reply("⚠️ Gagal mengambil kode undangan grup.");

    const input = new Set();

    if (quoted) input.add(quoted.sender.split('@')[0]);
    if (args.length) {
        args.join(' ')
            .split(',')
            .map(v => v.replace(/\D/g, ''))
            .filter(v => v.length >= 5 && v.length <= 20)
            .forEach(v => input.add(v));
    }

    input.delete(senderNumber);
    input.delete(botNumber);

    if (!input.size) return m.reply("📌 Harap sebutkan atau tag pengguna yang valid.");

    for (const num of input) {
        const jid = `${num}@s.whatsapp.net`;

        if (isKick) {
            if (!participants.includes(jid)) {
                await m.reply(`⚠️ Pengguna @${num} tidak ada di grup.`);
                continue;
            }
            try {
                await wbk.groupParticipantsUpdate(m.chat, [jid], 'remove');
                await m.reply(`✅ Pengguna @${num} telah dikeluarkan.`);
            } catch (e) {
                await m.reply(`⚠️ Gagal mengeluarkan @${num}: ${e.message}`);
            }
            continue;
        }

        if (isAdd) {
            if (participants.includes(jid)) {
                await m.reply(`⚠️ Pengguna @${num} sudah ada di grup.`);
                continue;
            }

            const [exists] = await wbk.onWhatsApp(jid);
            if (!exists?.exists) {
                await m.reply(`⚠️ Pengguna @${num} tidak terdaftar di WhatsApp.`);
                continue;
            }

            try {
                const res = await wbk.query({
                    tag: 'iq',
                    attrs: { type: 'set', xmlns: 'w:g2', to: m.chat },
                    content: [{ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid } }] }]
                });

                const participantsNode = getBinaryNodeChildren(res, 'add');
                const userNode = participantsNode[0]?.content.find(n => n.attrs.jid === jid);

                switch (userNode?.attrs?.error) {
                    case '421':
                        await m.reply(`⚠️ Pengguna @${num} membatasi undangan grup.`);
                        break;

                    case '408':
                        await m.reply(`✅ Undangan dikirim ke @${num} karena sebelumnya keluar.`);
                        await wbk.sendMessage(jid, {
                            text: `✨ Anda diundang kembali:\nhttps://chat.whatsapp.com/${inviteCode}`,
                            contextInfo: {
                                externalAdReply: {
                                    title: groupName,
                                    thumbnailUrl: await wbk.profilePictureUrl(m.chat, 'image').catch(() => null),
                                    sourceUrl: `https://chat.whatsapp.com/${inviteCode}`,
                                    mediaType: 1
                                }
                            }
                        });
                        break;

                    case '403': {
                        const req = getBinaryNodeChild(userNode, 'add_request');
                        const { code, expiration } = req.attrs;
                        const thumbnail = await wbk.profilePictureUrl(m.chat, 'image').then(res => fetch(res).then(r => r.buffer())).catch(() => Buffer.alloc(0));

                        const inviteMsg = generateWAMessageFromContent(
                            m.chat,
                            proto.Message.fromObject({
                                groupInviteMessage: {
                                    groupJid: m.chat,
                                    inviteCode: code,
                                    inviteExpiration: +expiration,
                                    groupName: groupName + ' by WBK',
                                    jpegThumbnail: thumbnail,
                                    caption: `✨ Anda diundang kembali`
                                }
                            }),
                            { userJid: wbk.user.id }
                        );

                        await wbk.sendMessage(jid, { forward: inviteMsg, mentions: [jid] });
                        await m.reply(`📨 Tautan dikirim ke @${num}.`);
                        break;
                    }

                    default:
                        await m.reply(`✅ Pengguna @${num} berhasil ditambahkan.`);
                        break;
                }

            } catch (e) {
                await m.reply(`⚠️ Gagal menambahkan @${num}: ${e.message}`);
            }
        }
    }
};

addkick.help = ['add', 'kick'];
addkick.tags = ['group'];
addkick.command = ['add', 'kick', 'dor'];
addkick.group = true;
addkick.admin = true;
addkick.botAdmin = true;

module.exports = addkick;