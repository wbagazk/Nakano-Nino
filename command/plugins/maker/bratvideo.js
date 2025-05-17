const axios = require("axios");
const { writeExif } = require("../../../utils/exif"); 

let nakano = async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`Contoh : ${prefix + command} console.log('Hello, world!');`);

    await m.react('⏱️');

    let { data } = await axios.get(api.siputzx + '/m/brat', {
        params: {
            text: text,
            isVideo: 'true',
            delay: '500'
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

nakano.help = ['bratvideo'];
nakano.tags = ['maker'];
nakano.command = ['bratvideo', 'bratvid'];
nakano.limit = true;

module.exports = nakano;