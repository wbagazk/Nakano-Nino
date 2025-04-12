const { writeExif } = require('../../../utils/exif');

let handler = async (m, { command, prefix }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply(`📌 *Kirim atau balas gambar/video dengan caption ${prefix + command}*\nDurasi video maksimal 9 detik ya!`);

    await m.react('⏱️');

    if (/image/.test(mime)) {
        let buffer = await q.download();
        if (!buffer) return m.reply('❌ Gagal mengambil media gambar.');
        const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
            packname: packname,
            author: author
        });
        await m.reply({ sticker: { url: file } });
        await m.react('✅');

    } else if (/video/.test(mime)) {
        if ((q.msg || q).seconds > 9) return m.reply('⏱️ Durasi video terlalu panjang! Maksimal 9 detik.');
        let buffer = await q.download();
        if (!buffer) return m.reply('❌ Gagal mengambil media video.');
        const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
            packname: packname,
            author: author
        });
        await m.reply({ sticker: { url: file } });
        await m.react('✅');

    } else {
        return m.reply(`❌ Format media tidak didukung. Kirim atau balas *gambar/video pendek (max 9 detik)* ya!`);
    }
};

handler.help = ['sticker'];
handler.tags = ['convert'];
handler.command = ['sticker', 's', 'stiker'];
handler.limit = true;

module.exports = handler;