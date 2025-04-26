const { imageToWebp, videoToWebp, gifToWebp, writeExif } = require('../../../utils/exif');
const fs = require('fs');

let nakano = async (m, { command, prefix, args }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime) return m.reply(`📌 *Kirim atau balas gambar/video dengan caption ${prefix + command}*\nDurasi video maksimal 9 detik ya!`);

    await m.react('⏱️');

    const swn = args.join(" ");
    const pcknm = swn.split("|")[0] || '';
    const atnm = swn.split("|")[1] || '';

    let buffer = await q.download();
    if (!buffer) return m.reply("❌ Gagal mengunduh media.");

    const webpData = /image/.test(mime) ? await imageToWebp(buffer) :
                     /video/.test(mime) ? await videoToWebp(buffer) : 
    				 /gif/.test(mime) ? await gifToWebp(buffer) : null;
    if (!webpData) return m.reply("❌ Format tidak didukung.");

    const finalStickerPath = await writeExif({ mimetype: 'image/webp', data: webpData }, {
        packname: pcknm,
        author: atnm
    });

    await m.reply({ sticker: fs.readFileSync(finalStickerPath) });
    await m.react('✅');
};

nakano.help = ['swm'];
nakano.tags = ['maker'];
nakano.command = ['swmm', 'steal', 'stickerwm', 'take'];

module.exports = nakano;