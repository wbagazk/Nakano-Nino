const axios = require("axios");

async function aiimagegenerator(prompt, width = 512, height = 512) {
    try {
        if (!prompt) throw new Error("Prompt tidak boleh kosong!");

        const response = await axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
            prompt,
            key: "RANDOM",
            width,
            height,
            quantity: 1,
            size: `${width}x${height}`,
            nsfw: true
        });

        const data = response.data;
        if (data.code !== 0) throw new Error(data.message || "Gagal memproses permintaan!");
        if (!data.data?.url) throw new Error("Gagal mendapatkan URL gambar!");

        return {
            status: true,
            image: data.data.url
        };
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
}

let nakano = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Hah?! Jangan bikin aku kesal! Kasih aku prompt yang bener dulu! 😡💢"

❓ Pilihan rasio yang bisa kamu pilih:
• 1:1 (Kotak - Default)
• 3:2 (Horizontal - Landscape)
• 2:3 (Vertikal - Portrait)

✏️ Contoh penggunaan:
• ${prefix + command} kucing lucu banget
• ${prefix + command} gadis dengan rambut panjang --3:2
• ${prefix + command} pemandangan matahari terbenam --2:3

Ayo cepat, jangan bikin aku nunggu lama-lama! Pahami cara pakainya sebelum aku marah beneran! 😤💢`);
    
    let [prompt, size] = text.split("--");
    prompt = prompt.trim();
    let ratio = (size || "1:1").trim();
    
    const validRatios = {
        "1:1": [512, 512], 
        "2:3": [512, 768],
        "3:2": [768, 512]
    };
    const [width, height] = validRatios[ratio] || validRatios["1:1"];

  	await m.react('🎨');

  	let response = await aiimagegenerator(prompt, width, height);
    if (!response?.image) throw new Error("Gagal mendapatkan gambar dari AI.");

    await m.reply({
        image: { url: response.image },
        caption: `✨ Gambar AI yang Baru Jadi!

📌 Prompt: ${prompt}
🖼 Rasio: ${ratio} 
📐 Ukuran: ${width}x${height}

Hah, akhirnya! Gambar jadi juga! Jangan lupa, kalau kamu mau gambar lain, langsung aja kasih prompt yang lebih keren! 😎💖`
    });
  	await m.react('✅');
};

nakano.help = ['aiimagegenerator'];
nakano.tags = ['ai image'];
nakano.command = ['aiimagegenerator'];
nakano.limit = true;

module.exports = nakano;