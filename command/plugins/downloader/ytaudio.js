const axios = require('axios');
const { getBuffer, litespace } = require('@lib/library');
const { sendButtonImage } = require('@utils/messageButton');

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    if (!text) return m.reply(`Contoh: ${prefix + command} https://youtu.be/...`);
    if (!text.includes('youtu')) return m.reply(`Link yang kakak masukkan bukan link YouTube! 😅`);

    const quality = args[2];
    
    await m.react('⏱️');

    let response;
    try {
        response = await axios.get(api.fastrestapis + '/downup/ytdown-v1', {
            params: {
                url: text,
                format: 'mp3',
                quality: quality || '320',
                server: 'auto'
            },
        });
    } catch (err) {
        return m.reply('Gagal mengambil data. Pastikan link valid dan coba lagi.');
    }

    const result = response.data.result;
    const meta = result.metadata;
    const author = result.author;
    
    if (!args[1]) {
        const button = [{
            name: "single_select",
            buttonParamsJson: `{
                "title": "Pilih disini",
                "sections": [
                    {
                        "title": "${result.title} [Audio]",
                        "highlight_label": "",
                        "rows": [
                            {
                                "title": "Quality 64 Kbps",
                                "id": "${prefix + command} ${text} audio 64"
                            },
                            {
                                "title": "Quality 128 Kbps",
                                "id": "${prefix + command} ${text} audio 128"
                            },
                            {
                                "title": "Quality 192 Kbps",
                                "id": "${prefix + command} ${text} audio 192"
                            },
                            {
                                "title": "Quality 256 Kbps",
                                "id": "${prefix + command} ${text} audio 256"
                            },
                            {
                                "title": "Quality 320 Kbps",
                                "id": "${prefix + command} ${text} audio 320"
                            }
                        ]
                    }, {
                        "title": "${result.title} [Document]",
                        "highlight_label": "",
                        "rows": [
                            {
                                "title": "Quality 64 Kbps",
                                "id": "${prefix + command} ${text} document 64"
                            },
                            {
                                "title": "Quality 128 Kbps",
                                "id": "${prefix + command} ${text} document 128"
                            },
                            {
                                "title": "Quality 192 Kbps",
                                "id": "${prefix + command} ${text} document 192"
                            },
                            {
                                "title": "Quality 256 Kbps",
                                "id": "${prefix + command} ${text} document 256"
                            },
                            {
                                "title": "Quality 320 Kbps",
                                "id": "${prefix + command} ${text} document 320"
                            }
                        ]
                    }
                ]
            }`
        }];
        const caption = `🎥 ${litespace("Audio Information :")}
📌 Judul: ${result.title}
📆 Upload: ${meta.uploadDate}
⏳ Durasi: ${meta.duration}
👁️ Views: ${meta.views}
📃 Deskripsi: ${meta.description || '-'}

👤 ${litespace("Author Information :")}
🧑 Nama: ${author.name}
📺 Channel: ${author.url}
📊 Subscribers: ${author.subCount.toLocaleString()}`
		const image = await getBuffer(meta.thumbnail)
        return sendButtonImage(wbk, m.chat, image, button, caption, global.footer, m)
    }

    let isAudio = args[1] === 'audio';
    let isDoc = args[1] === 'document';

    if (!isAudio && !isDoc) {
        return m.reply(`Input tidak valid. Gunakan "audio" atau "document".`);
    }

    let options = {
        mimetype: 'audio/mpeg',
        filename: result.title,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: result.title,
                body: `${author.name} | Views: ${meta.views} | Durasi: ${meta.duration}`,
                thumbnail: await getBuffer(meta.thumbnail),
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    };

    if (isAudio) {
        options.audio = { url: result.media };
        options.ptt = true;
    } else {
        options.document = { url: result.media };
        options.fileName = `${result.title} - ${quality}kbps.mp3`
    }

    await m.reply(options);
    await m.react('✅');
};

nakano.help = ['ytaudio'];
nakano.category = ['downloader'];
nakano.command = ['ytaudio', 'yta', 'ytmp3'];
nakano.limit = true;

module.exports = nakano;