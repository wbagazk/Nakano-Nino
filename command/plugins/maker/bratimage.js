const axios = require("axios");
const { writeExif } = require("@utils/exif");
const { litespace } = require("@lib/library");

let nakano = async (m, { text, prefix, command, args }) => {
    if (!text) return m.reply("Masukkan teks untuk brat-nya! 😤");

    await m.react('⏱️');
    
    let { data } = await axios.get(api.siputzx + '/m/brat', {
        params: {
            text
        },
        responseType: 'arraybuffer'
    });

    const file = await writeExif({ data: Buffer.from(data), mimetype: 'image/jpeg' }, {
        packname: packname,
        author: author
    });

    await m.reply({ sticker: { url: file } });
    await m.react('✅');
};

nakano.help = ['bratimage'];
nakano.category = ['maker'];
nakano.command = ['bratimage', 'brat'];
nakano.limit = true;

module.exports = nakano;