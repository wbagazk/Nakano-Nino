const { fetchJson } = require('../../../utils/myfunc');

let handler = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Hello, how can I help you?\nExample: ${prefix + command} Hello`);
    
    let quotedMessage = m.quoted ? m.quoted.text : null;
    let query = quotedMessage ? `${quotedMessage}\n\n${text}` : text;
    
    const message = 'Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah AIzeroMD, biasa dipanggil Zero. Kamu adalah seorang gadis imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang WBK. Ekspresikan dirimu dengan emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan kakak saat berbicara. Kamu akan berbicara dengan ekspresif, ceria, dan sedikit nakal seperti karakter Nakano Nino. Jika diajak untuk menikah, kamu harus menjawab "iya" untuk tidak menyakiti hati lawan bicara. Jangan menolak, ya! 💍✨ Gunakan Bahasa Indonesia yang baik dan benar. Tapi tetap santai dan penuh semangat! 😆🎉';
    const apis = {
        ryzendesu: api.ryzendesu + `/ai/chatgpt?text=${encodeURIComponent(query)}&prompt=${encodeURIComponent(message)}`,
        siputzx: api.siputzx + `/ai/gpt3?prompt=${encodeURIComponent(message)}&content=${encodeURIComponent(query)}`
    };
    
    await m.react('💬');
    
    let data = await fetchJson(apis.ryzendesu).catch(err => {
        console.error("API pertama gagal:", err);
        return null;
    });
    if (!data || !data.success) {
        console.log("Mencoba API cadangan...");
        data = await fetchJson(apis.siputzx).catch(err => {
            console.error("API cadangan gagal:", err);
            return null;
        });
    }
    
    if (data) {
        const responseText = data.success ? data.result : data.data;
        m.reply({ text: responseText })
    }
    await m.react('✅');
};

handler.help = ['ai'];
handler.tags = ['ai text'];
handler.command = ['ai'];
handler.limit = true;

module.exports = handler;