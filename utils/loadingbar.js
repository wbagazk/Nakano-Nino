exports.loadingBar = async function loadingBar(wbk, m, text = 'Loading', totalStep = 10, delayMs = 500) {
    const loadingChars = { fill: '▓', empty: '░' };
    let sentMsg = await wbk.sendMessage(m.chat, { text: `${text} [${loadingChars.empty.repeat(totalStep)}] 0%` }, {});

    for (let i = 1; i <= totalStep; i++) {
        const percent = Math.floor((i / totalStep) * 100);
        const fill = loadingChars.fill.repeat(i);
        const empty = loadingChars.empty.repeat(totalStep - i);
        const loadingText = `${text} [${fill}${empty}] ${percent}%`;

        await new Promise(res => setTimeout(res, delayMs));
        await wbk.sendMessage(m.chat, {
            text: loadingText,
            edit: sentMsg.key
        });
    }

    await wbk.sendMessage(m.chat, {
        text: `✅ ${text} complete!`,
        edit: sentMsg.key,
        contextInfo: {
            externalAdReply: {
                title: 'Proses Selesai!',
                body: 'Powered by WhatsApp Bot',
                mediaType: 1,
                thumbnailUrl: '',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: 'https://github.com/yourbot'
            }
        }
    });
};