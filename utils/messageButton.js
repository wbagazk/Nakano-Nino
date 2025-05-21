const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { parseMention } = require('../lib/library');
const { prepareWAMessageMedia, generateWAMessageContent, generateWAMessageFromContent, proto } = require('baileys');

const uploadFile = (wbk) => ({
    upload: wbk.waUploadToServer
});

exports.sendButtonText = async (wbk, jid, buttons = [], text, footer, quoted = '', options = {
    contextInfo: {
        mentionedJid: parseMention(text),
    }
}) => {
    let button = []
    for (let i = 0; i < buttons.length; i++) {
        button.push({
            "name": buttons[i].name,
            "buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
        })
    }
    let msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: {
                'messageContextInfo': {
                    'deviceListMetadata': {},
                    'deviceListMetadataVersion': 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    ...options,
                    mentionedJid: parseMention(text),
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: text
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "",
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: button,
                    })
                })
            }
        }
    }, {
        quoted: quoted
    })
    wbk.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
    return msg
}

exports.sendButtonImage = async (wbk, jid, image, buttons = [], text, footer, quoted = '', options = {
    contextInfo: {
        mentionedJid: parseMention(text),
    }
}) => {
    let button = []
    for (let i = 0; i < buttons.length; i++) {
        button.push({
            "name": buttons[i].name,
            "buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
        })
    }
    var imageMessage = await prepareWAMessageMedia({
            image: image,
        },
        uploadFile(wbk),
    );
    let msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: {
                'messageContextInfo': {
                    'deviceListMetadata': {},
                    'deviceListMetadataVersion': 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    ...options,
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ""
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: text,
                        subtitle: text,
                        hasMediaAttachment: true,
                        imageMessage: imageMessage.imageMessage
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: button,
                    })
                })
            }
        }
    }, {
        quoted: quoted
    })
    wbk.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
    return msg
}

exports.sendButtonVideo = async (wbk, jid, video, buttons = [], text, footer, quoted = '', options = {
    contextInfo: {
        mentionedJid: parseMention(text),
    }
}) => {
    let button = []
    for (let i = 0; i < buttons.length; i++) {
        button.push({
            "name": buttons[i].name,
            "buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
        })
    }
    var videoMessage = await prepareWAMessageMedia({
            video: video,
        },
        uploadFile(wbk),
    );
    let msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: {
                'messageContextInfo': {
                    'deviceListMetadata': {},
                    'deviceListMetadataVersion': 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    ...options,
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ""
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: text,
                        subtitle: text,
                        videoMessage: videoMessage.videoMessage,
                        hasMediaAttachment: true
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: button,
                    })
                })
            }
        }
    }, {
        quoted: quoted
    })
    wbk.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
    return msg
}

exports.sendButtonDocument = async (wbk, jid, document = {}, buttons = [], text, footer, quoted = '', options = {
    contextInfo: {
        mentionedJid: parseMention(text),
    }
}) => {
    let button = []
    for (let i = 0; i < buttons.length; i++) {
        button.push({
            "name": buttons[i].name,
            "buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
        })
    }
    let msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
            message: {
                'messageContextInfo': {
                    'deviceListMetadata': {},
                    'deviceListMetadataVersion': 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    ...options,
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: text
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: footer
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia(document, uploadFile(wbk)))
                    }),
                    gifPlayback: true,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: button,
                    })
                })
            }
        }
    }, {
        quoted: quoted
    })
    await wbk.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
    return msg
}

exports.createCarouselMessage = async function ({ wbk, m, items = [], max = 5, buildCard, bodyText, wmText, quoted, mediaType }) {
    async function createMedia(url) {
        const media = mediaType === 'video'
            ? { video: { url } }
            : { image: { url } };

        const messageContent = await generateWAMessageContent(media, {
            upload: wbk.waUploadToServer
        });

        return mediaType === 'video' ? messageContent.videoMessage : messageContent.imageMessage;
    }

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    const selected = items.slice(0, max);
    const cards = [];

    for (let i = 0; i < selected.length; i++) {
        const item = selected[i];
        const { body, footer, title, mediaUrl, buttons } = await buildCard(item, i + 1, createMedia);

        const header = {
            title,
            hasMediaAttachment: true
        };

        if (mediaType === 'video') {
            header.videoMessage = await createMedia(mediaUrl);
        } else {
            header.imageMessage = await createMedia(mediaUrl);
        }

        cards.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: body }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: footer }),
            header: proto.Message.InteractiveMessage.Header.fromObject(header),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons })
        });
    }

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({ text: bodyText }),
                    footer: proto.Message.InteractiveMessage.Footer.create({ text: wmText }),
                    header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
                })
            }
        }
    }, { quoted });

    await wbk.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🆙  FILE UPDATE  🆙`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(15)}  : ${__filename.toUpperCase()}  `));
    console.log(chalk.greenBright(`📝  ${"MESSAGE".padEnd(15)}  : Changes have been applied!  ✅`));
    console.log(chalk.white("------------------------------------------"));
    delete require.cache[file];
    require(file);
});