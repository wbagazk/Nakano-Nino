const axios = require("axios");
const { writeExif } = require("../../../utils/exif");

let nakano = async (m, { text, prefix, command }) => {
    let [emoji1, emoji2] = text.split('+');
    if (!emoji1 || !emoji2) return m.reply(`Contoh: ${prefix + command} 😂+😭`);
    
    await m.react('⏱️');
    
    let response = await axios.get(api.fastrestapis + '/maker/emojimix', {
        params: {
            emoji1: emoji1,
            emoji2: emoji2
        },
        responseType: 'arraybuffer'
    });
    
    const buffer = Buffer.from(response.data);
    
    if (!buffer || buffer.length === 0 || buffer.toString().includes('404')) {
        return m.reply('Eh, kok ga bisa ya? Coba emoji yang lain deh... 😤');
    }
    
    const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
        packname: packname,
        author: author
     });

    await m.reply({ sticker: { url: file } });
    await m.react('✅');
};

nakano.help = ['emojimix'];
nakano.tags = ['maker'];
nakano.command = ['emojimix'];
nakano.limit = true;

module.exports = nakano;