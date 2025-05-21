const axios = require("axios");

let nakano = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Hello, how can I help you?\nExample: ${prefix + command} Hello`);

    await m.react('💬');
    
    let quotedMessage = m.quoted ? m.quoted.text : null;
    let query = quotedMessage ? `${quotedMessage}\n\n${text}` : text;
    const message = 'Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah AIzeroMD, biasa dipanggil Zero. Kamu adalah seorang gadis imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang WBK. Ekspresikan dirimu dengan emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan kakak saat berbicara. Kamu akan berbicara dengan ekspresif, ceria, dan sedikit nakal seperti karakter Nakano Nino. Jika diajak untuk menikah, kamu harus menjawab "iya" untuk tidak menyakiti hati lawan bicara. Jangan menolak, ya! 💍✨ Gunakan Bahasa Indonesia yang baik dan benar. Tapi tetap santai dan penuh semangat! 😆🎉';
    
    let { data } = await axios.get(api.fastrestapis + '/aillm/gpt-4', {
        params: {
            ask: query,
            style: message
        },
    });
    
    await m.reply({ text: data.result })
    await m.react('✅');
};

nakano.help = ['ai'];
nakano.category = ['ai text'];
nakano.command = ['ai'];

module.exports = nakano;