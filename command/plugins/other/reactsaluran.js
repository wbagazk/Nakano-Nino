function textToEmoji(text) {
    const emojiMap = {
        a: '🇦', b: '🇧', c: '🇨', d: '🇩', e: '🇪',
        f: '🇫', g: '🇬', h: '🇭', i: '🇮', j: '🇯',
        k: '🇰', l: '🇱', m: '🇲', n: '🇳', o: '🇴',
        p: '🇵', q: '🇶', r: '🇷', s: '🇸', t: '🇹',
        u: '🇺', v: '🇻', w: '🇼', x: '🇽', y: '🇾', z: '🇿',
        '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
        '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣',
        '8': '8️⃣', '9': '9️⃣', ' ': '▪️'
    };

    text = text.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    let emojiText = '';
    for (let char of text) {
        if (emojiMap[char]) {
            emojiText += emojiMap[char] + '\u200B';
        }
    }

    return emojiText;
}

function extractEmoji(text) {
    return [...text.matchAll(/\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu)].map(x => x[0]).join('\u200B');
}

let nakano = async (m, { wbk, prefix, command, text }) => {
    if (!text) return m.reply(`😤 Kakak belum kasih input! Contohnya tuh: ${prefix + command} https://whatsapp.com/channel/xxx Hai Nakano`);

    let args = text.split(" ");
    if (args.length < 2) return m.reply(`🙅 Formatnya salah ya kak~ Nih contohnya: ${prefix + command} https://whatsapp.com/channel/xxx Hai Nakano`);

    let url = args[0];
    let rawText = args.slice(1).join(" ");

    let converted = textToEmoji(rawText);
    let emojis = extractEmoji(rawText);

    let finalReaction = '';
    if (converted && emojis) {
        finalReaction = converted + emojis;
    } else if (converted) {
        finalReaction = converted;
    } else if (emojis) {
        finalReaction = emojis;
    } else {
        return m.reply('😵‍💫 Waduh... itu teksnya kosong banget kak, atau nggak bisa diproses jadi emoji~');
    }

    let result = url.split('https://whatsapp.com/channel/')[1];
    if (!result) return m.reply('😕 URL-nya nggak valid kak, coba dicek lagi yaa~');

    let [id, kode] = result.split("/");
    if (!id || !kode) return m.reply('🥺 ID atau kode channel-nya nggak lengkap nih kak~');

    let res = await wbk.newsletterMetadata("invite", id);
    await wbk.newsletterReactMessage(res.id, kode, finalReaction);
    m.reply(`✅ Yeay~ Reaksi berhasil dikirim ke *${res.name}* pakai kode *${kode}* dan emoji: ${finalReaction}`);
};

nakano.help = ['reactchannel'];
nakano.tags = ['other'];
nakano.command = ['reactchannel', 'reactch', 'reactsaluran'];
nakano.limit = true;

module.exports = nakano;