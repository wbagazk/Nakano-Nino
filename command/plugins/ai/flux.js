const fetch = require('node-fetch');

async function flux(options) {
  try {
    options = {
      prompt: options?.prompt,
      seed: options?.seed || Math.floor(Math.random() * 2147483647) + 1,
      random_seed: options?.random_seed ?? true,
      width: options?.width ?? 512,
      height: options?.height ?? 512,
      steps: options?.steps ?? 8,
    };

    if (!options.prompt) {
      return { status: false, message: "undefined reading prompt!" };
    }

    const session_hash = string(11);
    const joinResponse = await fetch("https://black-forest-labs-flux-1-schnell.hf.space/queue/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [options.prompt, options.seed, options.random_seed, options.width, options.height, options.steps],
        event_data: null,
        fn_index: 2,
        trigger_id: 5,
        session_hash: session_hash,
      }),
    });

    if (!joinResponse.ok) throw new Error("Failed to join queue");

    const dataResponse = await fetch(`https://black-forest-labs-flux-1-schnell.hf.space/queue/data?session_hash=${session_hash}`);
    if (!dataResponse.ok) throw new Error("Failed to retrieve data");

    const rawData = await dataResponse.text();
    const jsonObjects = rawData.split("\n")
      .filter(line => line.startsWith("data: "))
      .map(line => JSON.parse(line.substring(6).trim()));
    
    const result = jsonObjects.find(d => d.msg === "process_completed") || {};

    if (!result?.success) return { status: false, message: result };

    const images = result.output.data.filter(d => typeof d === "object").map(d => d.url);
    return { status: true, data: { images: images } };

  } catch (e) {
    return { status: false, message: e.message };
  }
}

function string(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

let nakano = async (m, { text, prefix, command }) => {
  if (!text) return m.reply(`💢 Hah?! Kamu harus kasih aku prompt-nya dulu, dasar bodoh!\n
❓ *Perbandingan (rasio) yang bisa kamu pakai:*  
• 1:1 (Default - Kotak)  
• 16:9 (Horizontal - Landscape)  
• 9:16 (Vertikal - Portrait)

✏️ *Contoh penggunaan:*  
• ${prefix + command} kucing imut  
• ${prefix + command} gadis anime --16:9  
• ${prefix + command} pemandangan indah --9:16

Cepat ketik yang benar sebelum aku marah beneran! 💢`);

  let [teks, size] = text.split("--");
  teks = teks.trim();
  size = size?.trim() || "1:1"; // default ke 1:1

  let dimensions;
  if (size === "16:9") {
    dimensions = { width: 680, height: 360 };
  } else if (size === "9:16") {
    dimensions = { width: 360, height: 680 };
  } else {
    size = "1:1";
    dimensions = { width: 512, height: 512 };
  }

  await m.react('🖼️');

  let data = await flux({ prompt: teks, ...dimensions });

  if (!data.status) {
    await m.react('❌');
    return m.reply('Ugh... gagal menghasilkan gambar!\n' + JSON.stringify(data.message, null, 2));
  }

  for (let i of data.data.images) {
    await m.reply({
      image: { url: i },
      caption: `*Hmph... Ini hasilnya ya!*\n\n*📌 Prompt:* ${teks}\n*🖼️ Rasio:* ${size}\n*📏 Ukuran:* ${dimensions.width}x${dimensions.height}\n\nJangan bilang kamu nggak suka, karena aku udah capek bantuin kamu~ 💢`
    });
  }

  await m.react('✅');
};

nakano.help = ['flux'];
nakano.tags = ['ai image'];
nakano.command = ['flux'];
nakano.limit = true;

module.exports = nakano;