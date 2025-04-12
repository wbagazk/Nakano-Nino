const axios = require("axios");
const { writeExif } = require("../../../utils/exif");

let handler = async (m, { text, command }) => {
    if (!text) return m.reply("Masukkan teks untuk brat-nya! 😤");
    await m.react('⏱️');

    const apis = [
        `https://api-ghostx.biz.id/api/imagecreator/bratgenerator?text=${encodeURIComponent(text)}`,
        `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`,
        `https://aqul-brat.hf.space/api/brat?text=${encodeURIComponent(text)}`,
        `https://velyn.vercel.app/api/maker/brat?text=${encodeURIComponent(text)}&apikey=free`,
        `https://api.suraweb.online/tools/brat?text=${encodeURIComponent(text)}`,
        `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`,
        `https://fastrestapis.fasturl.cloud/maker/brat/simple?text=${encodeURIComponent(text)}&theme=white`
    ];

    let success = false;

    for (let i = 0; i < apis.length; i++) {
        console.log(`🔄 Mencoba API ${i + 1}: ${apis[i]}`);
        await axios.get(apis[i], { responseType: "arraybuffer" })
            .then(async (res) => {
                if (res?.data && !success) {
                    const file = await writeExif({ data: res.data, mimetype: 'image/jpeg' }, {
                        packname: packname,
                        author: author
                    });
                    await m.reply({ sticker: { url: file } });
                    await m.react('✅');
                    console.log(`✅ API ${i + 1} Berhasil!`);
                    success = true;
                }
            })
            .catch(err => {
                console.log(`❌ API ${i + 1} Gagal: ${err.message}`);
            });

        if (success) break; // keluar dari loop kalau sudah sukses
    }
};

handler.help = ['brat'];
handler.tags = ['maker'];
handler.command = ['brat', 'anomali'];
handler.limit = true;

module.exports = handler;