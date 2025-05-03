const fs = require('fs');
const axios = require('axios');
const fileType = require('file-type');

async function pxpicTool(path, func) {
    const tool = ['removebg', 'enhance', 'upscale', 'restore', 'colorize'];
    if (!tool.includes(func)) return `Ehh? Yang tersedia cuma ini ya: ${tool.join(', ')}`;

    const buffer = fs.readFileSync(path);
    const fileInfo = await fileType.fromBuffer(buffer);
    const ext = fileInfo?.ext || 'bin';
    const mime = fileInfo?.mime || 'application/octet-stream';
    const fileName = Math.random().toString(36).slice(2, 8) + '.' + ext;

    const {
        data
    } = await axios.post("https://pxpic.com/getSignedUrl", {
        folder: "uploads",
        fileName
    }, { headers: { "Content-Type": "application/json" } });

    await axios.put(data.presignedUrl, buffer, {
        headers: {
            "Content-Type": mime
        }
    });
    
    const url = "https://files.fotoenhancer.com/uploads/" + fileName;

    const api = await axios.post("https://pxpic.com/callAiFunction", new URLSearchParams({
        imageUrl: url,
        targetFormat: 'png',
        needCompress: 'no',
        imageQuality: '100',
        compressLevel: '0',
        fileOriginalExtension: 'png',
        aiFunction: func,
        upscalingLevel: ''
    }).toString(), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,/;q=0.8',
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept-language': 'id-ID'
        }
    });
    return api.data;
}

let nakano = async (m, { wbk, text, prefix, command }) => {
    wbk.enhancer = wbk.enhancer || {};
    if (m.sender in wbk.enhancer) return m.reply(`Tunggu dulu yaa~ kamu masih punya proses yang belum selesai kok! 😤`);

    let query = m.quoted ? m.quoted : m;
    let mime = (query.msg || query).mimetype || query.mediaType || "";
    if (!mime) return m.reply(`Kirim atau reply gambar dulu dong~ Terus kasih caption: *${prefix + command}* yaa 😗`);
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Ughh! Gambar kamu nggak bisa diproses... cuma yang jpg / png aja yang bisa yaa 😒`);

    wbk.enhancer[m.sender] = true;
    await m.react('⏱️');
    let media = await wbk.downloadAndSaveMediaMessage(query);
	let data = await pxpicTool(media, 'enhance');
	await m.reply({
        image: { url: data.resultImageUrl },
        caption: 'Tadaaa~✨ Gambar kamu udah aku buat makin cakep! Jangan lupa bilang makasih yaa 💖'
	});
    delete wbk.enhancer[m.sender];
    fs.unlinkSync(media);
}

nakano.help = ['hd'];
nakano.tags = ['tools'];
nakano.command = ['hd', 'hdr', 'remini', 'enhance'];
nakano.limit = true;

module.exports = nakano;