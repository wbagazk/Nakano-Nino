const fs = require('fs');

function getRandomThumb() {
    const thumbs = global.image?.thumb || [];
    if (!thumbs.length) return null;
    return thumbs[Math.floor(Math.random() * thumbs.length)];
}

const fakeQuoted = (m, pushname, usernomor, botName, wm) => {
    const nakanonino = getRandomThumb();
    const fconver = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "0@s.whatsapp.net"
            } : {})
        },
        message: {
            conversation: `👤 *${pushname}*\n📞 *${usernomor}*`
        }
    };

    const fmen = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "0@s.whatsapp.net"
            } : {})
        },
        message: {
            conversation: `📝 *Pesan Menfess Baru!* ✨`
        }
    };

    const fbot = {
        key: {
            fromMe: false,
            participant: `13135550002@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "13135550002@s.whatsapp.net"
            } : {})
        },
        message: {
            conversation: `*${botName}* Terverifikasi oleh WhatsApp`
        }
    };

    const fkontak = {
        key: {
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: `status@broadcast`
            } : {})
        },
        message: {
            'contactMessage': {
                'displayName': m.pushName,
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName};\nFN:${m.pushName}\nitem1.TEL;waid=${m.sender?.replace(/\D/g, '')}:${m.pushName}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                sendEphemeral: true
            }
        }
    };

    const ftroli = {
        key: {
            remoteJid: global.sosmed?.idgcwa,
            participant: '13135550002@s.whatsapp.net'
        },
        message: {
            orderMessage: {
                itemCount: 2025,
                status: 1,
                thumbnail: nakanonino,
                surface: 1,
                message: `𝗡𝗮𝗸𝗮𝗻𝗼 𝗡𝗶𝗻𝗼 Terverifikasi oleh WhatsApp`,
                orderTitle: "Activated!",
                sellerJid: '0@s.whatsapp.net'
            }
        }
    };

    const fevent = {
        key: {
            participant: m.sender,
            ...(m.sender ? {
                remoteJid: m.sender
            } : {})
        },
        message: {
            "eventMessage": {
                isCanceled: false,
                name: m.text,
                description: wm,
                location: {
                    degreesLatitude: 0,
                    degreesLongitude: 0,
                    name: botName
                },
                joinLink: "https://call.whatsapp.com/video/hMwVijMQtUb0qBJL3lf0rv",
                startTime: "12345678"
            }
        }
    };

    return {
        fconver,
        fmen,
        fbot,
        fkontak,
        ftroli,
        fevent
    };
};

module.exports = fakeQuoted;