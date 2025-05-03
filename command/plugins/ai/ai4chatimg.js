const fetch = require("node-fetch");

async function ai4chatImage(prompt, ratio) {
    try {
        const url = `https://www.ai4chat.co/api/image/generate?prompt=${encodeURIComponent(prompt)}&aspect_ratio=${encodeURIComponent(ratio)}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Gagal mengambil data: ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error("❌ Error di ai4chatImage:", error.message);
        throw new Error("Gagal membuat gambar.");
    }
}

let nakano = async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`🎨 Eh, kamu belum kasih prompt-nya buat digambar, nih~

❓ *Coba ketik kayak gini ya:*
- ${prefix + command} cewek anime berkacamata
- ${prefix + command} kota futuristik --16:9

📐 *Rasio yang bisa kamu pakai:*
- 1:1 (Persegi) (default)
- 16:9 (Lanskap)
- 2:3
- 3:2
- 4:5
- 5:4
- 9:16 (Potret)
- 21:9
- 9:21

✨ Tambahkan -- di akhir untuk hasil terbaik!`);

    let [prompt, size] = text.split("--");
    let ratio = (size || "1:1").trim();
    const validRatios = ["1:1", "16:9", "2:3", "3:2", "4:5", "5:4", "9:16", "21:9", "9:21"];
    if (!validRatios.includes(ratio)) {
        return m.reply(`❌ Rasio tidak valid. Pilih dari: ${validRatios.join(", ")}`);
    }

    await m.react('🎨');

    const response = await ai4chatImage(prompt.trim(), ratio);
    if (!response?.image_link) throw new Error("Gagal mendapatkan gambar dari AI.");

    await m.reply({
        image: { url: response.image_link },
        caption: `💖 *Yatta~ Gambar kamu udah jadi, lho!* 

✨ *Prompt:* ${prompt.trim()}  
🖼️ *Rasio:* ${ratio}  
 
Kalau mau coba lagi, tinggal bilang aja! 🌸  
~ Nino yang paling perhatian 🩷`
    	});

    await m.react('✅');
};

nakano.help = ['ai4chatimg'];
nakano.tags = ['ai image'];
nakano.command = ['ai4chatimg'];
nakano.limit = true;

module.exports = nakano;
