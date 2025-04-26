const { writeExif } = require("../../../utils/exif");
const { getBuffer } = require("../../../utils/myfunc");

let nakano = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Contoh : ${prefix + command} console.log('Hello, world!');`);
    
    await m.react('⏱️');
    
    const buffer = await getBuffer(api.fastrestapis + `/maker/carbon/simple?code=${encodeURIComponent(text)}`);
    
    m.reply({
        image: buffer,
        caption: 'Gambar jadi! Udah keren banget kan? Kalau enggak, tinggal bilang, ya! 😏'
    })
    await m.react('✅');
};

nakano.help = ['carbon'];
nakano.tags = ['maker'];
nakano.command = ['carbon'];

module.exports = nakano;