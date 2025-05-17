const axios = require('axios');
const { getBuffer, litespace } = require('../../../utils/myfunc');
const { sendButtonImage } = require('../../../utils/messageButton');

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    if (!text) return m.reply(`Contoh: ${prefix + command} Never Gonna Give You Up`);

    const parsedArgs = args.join(' ').split(',').map(v => v.trim());
    const format = parsedArgs[1];
    const type = parsedArgs[2];
    const quality = parsedArgs[3];

    await m.react('⏱️');

    const isUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(text);

    let response = await axios.get(api.fastrestapis + '/downup/ytdown-v1', {
        params: {
            ...(isUrl ? { url: text } : { name: text }),
            format: format || 'mp4',
            quality: quality || '480',
            server: 'auto'
        },
    });
    console.log(response.data)

    const result = response.data.result;
    const meta = result.metadata;
    const author = result.author;

    if (!type) {
        const button = [{
            name: "single_select",
            buttonParamsJson: `{
                "title": "Pilih disini",
                "sections": [
                    {
                        "title": "Pilih jenis media yang akan kamu mainkan",
                        "highlight_label": "",
                        "rows": [
                            {
                                "title": "Audio",
                                "id": "${prefix + command} ${result.url},mp3,audio,256"
                            },
                            {
                                "title": "Video",
                                "id": "${prefix + command} ${result.url},mp4,video,360"
                            },
                            {
                                "title": "Document Audio",
                                "id": "${prefix + command} ${result.url},mp3,docAudio,256"
                            },
                            {
                                "title": "Document Video",
                                "id": "${prefix + command} ${result.url},mp4,docVideo,480"
                            }
                        ]
                    }
                ]
            }`
        }];
        const caption = `🎥 ${litespace("Youtube Information :")}
📌 Judul: ${result.title}
📆 Upload: ${meta.uploadDate}
⏳ Durasi: ${meta.duration}
👁️ Views: ${meta.views}
📃 Deskripsi: ${meta.description || '-'}

👤 ${litespace("Author Information :")}
🧑 Nama: ${author.name}
📺 Channel: ${author.url}
📊 Subscribers: ${author.subCount.toLocaleString()}`;

        const image = await getBuffer(meta.thumbnail);
        return sendButtonImage(wbk, m.chat, image, button, caption, global.footer, m);
    }

    let isAudio = type === 'audio';
    let isVideo = type === 'video';
    let isDocAudio = type === 'docAudio';
    let isDocVideo = type === 'docVideo';

    if (!isAudio && !isVideo && !isDocAudio && !isDocVideo) {
        return m.reply(`Input tidak valid.`);
    }

    if (!result || !result.media) {
        return m.reply('Media tidak ditemukan atau gagal diproses.');
    }

    let options = {
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
        options.mimetype = 'audio/mpeg';
        options.ptt = true;
    } else if (isVideo) {
        options.video = { url: result.media };
        options.mimetype = 'video/mp4';
    } else if (isDocAudio) {
        options.document = { url: result.media };
        options.mimetype = 'audio/mpeg';
        options.fileName = `${result.title} - ${quality}kbps.mp3`;
    } else {
        options.document = { url: result.media };
        options.mimetype = 'video/mp4';
        options.fileName = `${result.title} - ${quality}p.mp4`;
    }

    await m.reply(options);
    await m.react('✅');
};

nakano.help = ['play'];
nakano.tags = ['downloader'];
nakano.command = ['play'];
nakano.limit = true;

module.exports = nakano;