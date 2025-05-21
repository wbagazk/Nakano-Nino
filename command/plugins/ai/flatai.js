const fetch = require('node-fetch');

const flatAi = async (prompt, seed = "", ratio = "1:1") => {
    const getNonce = await fetch(
        "https://flatai.org/ai-image-generator-free-no-signup/",
        {
            method: "GET",
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                referer: "https://flatai.org/ai-image-generator-free-no-signup/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6827.64 Safari/537.36 OPR/115.0.5132.173",
            },
        }
    );
    const findNonce = await getNonce.text();
    const nonceMatch = findNonce.match(/ai_generate_image_nonce":"(.*?)"/);
    const nonce = nonceMatch ? nonceMatch[1] : null;
    if (!nonce) throw new Error("Nonce not found.");

    const generate = await fetch("https://flatai.org/wp-admin/admin-ajax.php", {
        method: "POST",
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            origin: "https://flatai.org",
            referer: "https://flatai.org/ai-image-generator-free-no-signup/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6827.64 Safari/537.36 OPR/115.0.5132.173",
            "x-requested-with": "XMLHttpRequest",
        },
        body: `action=ai_generate_image&nonce=${nonce}&prompt=${encodeURIComponent(prompt)}&aspect_ratio=${ratio}&seed=${seed}`,
    });

    const result = await generate.json();
    if (result.success) return result.data.images;
    else throw new Error("Image generation failed");
};

let nakano = async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`🖼️ Eh? Kamu belum kasih aku *prompt* buat gambarnya~

📐 *Rasio gambar yang tersedia:*  
• 1:1 (Kotak)  
• 16:9 (Horizontal)  
• 9:16 (Vertikal)

📌 *Contoh:*  
• ${prefix + command} cewek anime berkacamata  
• ${prefix + command} neon cyberpunk city --16:9

Yuk coba lagi, aku bantuin kok ✨`);

    let [prompt, size] = text.split("--");
    let ratio = size ? size.trim() : "1:1";
    const validRatios = ["1:1", "9:16", "16:9"];
    if (!validRatios.includes(ratio)) {
        return m.reply(`🚫 Rasio tidak valid. Pilih dari: ${validRatios.join(", ")}`);
    }

    await m.react('💬');

    const imageUrls = await flatAi(prompt.trim(), "", ratio);

    for (let url of imageUrls) {
        await m.reply({
            image: { url },
            caption: `✨ Ini gambar yang kamu minta~  

💡 *Prompt:* ${prompt.trim()}  
📐 *Rasio:* ${ratio}  

~ Dibuat pakai FlatAI dan dikasih sentuhan Nino~ 💕`
        });
    }

    await m.react('✅');
};

nakano.help = ['flatai'];
nakano.category = ['ai image'];
nakano.command = ['flataii'];
nakano.limit = true;

module.exports = nakano;