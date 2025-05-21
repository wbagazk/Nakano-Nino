const fetch = require('node-fetch');

let handler = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Contoh: ${prefix + command} haiii`);
    
    await m.react('🔊');
    
    const prompt = `Cara bicara kamu seperti orang Sunda serta lucu, asik dan bikin ngakak, kurangi juga tanda koma di ketikan kamu. Kamu laki-laki, nama kamu Jajang yang diciptakan oleh WBK.`;
    const apiUrl = api.agatz + `/gptlogic?logic=${prompt}&p=${text}`;
    let response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Gagal mengambil data dari API');
    let result = await response.json();
    const gpt = result.data.result;
    
    m.reply({
        audio: { url: api.siputzx + `/tools/tts?text=${gpt}&voice=jv-ID-JajangNeural&rate=0%&pitch=0Hz&volume=0%` },
        mimetype: 'audio/mpeg',
        ptt: true
    })
    await m.react('✅');
};

handler.help = ['jajang'];
handler.category = ['ai speech'];
handler.command = ['jajang'];
handler.limit = true;

module.exports = handler;