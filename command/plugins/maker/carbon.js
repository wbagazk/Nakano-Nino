const axios = require("axios");

let nakano = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Contoh : ${prefix + command} console.log('Hello, world!');`);
    
    await m.react('⏱️');
    
    let { data } = await axios.get(api.fastrestapis + '/maker/carbon/simple', {
        params: {
            code: encodeURIComponent(text)
        },
        responseType: 'arraybuffer'
    });
    
    m.reply({
        image: Buffer.from(data),
        caption: 'Gambar jadi! Udah keren banget kan? Kalau enggak, tinggal bilang, ya! 😏'
    })
    await m.react('✅');
};

nakano.help = ['carbon'];
nakano.tags = ['maker'];
nakano.command = ['carbon'];

module.exports = nakano;