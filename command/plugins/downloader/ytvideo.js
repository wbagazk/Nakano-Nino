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
                format: 'mp4',
                quality: quality  || '480',
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
                        "title": "${result.title} [Video]",
                        "highlight_label": "",
                        "rows": [
                            {
                                "title": "Quality 144p",
                                "id": "${prefix + command} ${text} video 144"
                            },
                            {
                                "title": "Quality 240p",
                                "id": "${prefix + command} ${text} video 240"
                            },
                            {
                                "title": "Quality 360p",
                                "id": "${prefix + command} ${text} video 360"
                            },
                            {
                                "title": "Quality 480p",
                                "id": "${prefix + command} ${text} video 480"
                            },
                            {
                                "title": "Quality 720p",
                                "id": "${prefix + command} ${text} video 720"
                            },
                            {
                                "title": "Quality 1080p",
                                "id": "${prefix + command} ${text} video 1080"
                            }
                        ]
                    }, {
                        "title": "${result.title} [Document]",
                        "highlight_label": "",
                        "rows": [
                            {
                                "title": "Quality 144p",
                                "id": "${prefix + command} ${text} document 144"
                            },
                            {
                                "title": "Quality 240p",
                                "id": "${prefix + command} ${text} document 240"
                            },
                            {
                                "title": "Quality 360p",
                                "id": "${prefix + command} ${text} document 360"
                            },
                            {
                                "title": "Quality 480p",
                                "id": "${prefix + command} ${text} document 480"
                            },
                            {
                                "title": "Quality 720p",
                                "id": "${prefix + command} ${text} document 720"
                            },
                            {
                                "title": "Quality 1080p",
                                "id": "${prefix + command} ${text} document 1080"
                            }
                        ]
                    }
                ]
            }`
        }];
        const caption = `🎥 ${litespace("Video Information :")}
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

    let isVideo = args[1] === 'video';
    let isDoc = args[1] === 'document';

    if (!isVideo && !isDoc) {
        return m.reply(`Input tidak valid. Gunakan "video" atau "document".`);
    }

    let options = {
        mimetype: 'video/mp4',
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

    if (isVideo) {
        options.video = { url: result.media };
    } else {
        options.document = { url: result.media };
        options.fileName = `${result.title} - ${quality}p.mp4`
    }

    await m.reply(options);
    await m.react('✅');
};

nakano.help = ['ytvideo'];
nakano.category = ['downloader'];
nakano.command = ['ytvideo', 'ytv', 'ytmp4'];
nakano.limit = true;

module.exports = nakano;