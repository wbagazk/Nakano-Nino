const fetch = require('node-fetch'); 

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function magichour(prompt, orientation = 'square') {
  const task_id = generateUUID();
  
  try {
    await fetch('https://magichour.ai/api/free-tools/v1/ai-image-generator', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-timezone-offset': new Date().getTimezoneOffset().toString()
      },
      body: JSON.stringify({ prompt, orientation, task_id })
    });
    
    const statusEndpoint = `https://magichour.ai/api/free-tools/v1/ai-image-generator/${task_id}/status`;
    let completed = false, result = null;
    
    while (!completed) {
      const statusResponse = await fetch(statusEndpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-timezone-offset': new Date().getTimezoneOffset().toString()
        }
      });
      
      const statusData = await statusResponse.json();
      
      if (statusData.status === 'SUCCESS') {
        completed = true;
        result = statusData;
      } else if (statusData.status === 'FAILED') {
        throw new Error('Image generation failed');
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return result.urls[0]; // ambil hanya URL pertama
  } catch (error) {
    console.error('Error in magichour function:', error);
    throw error;
  }
}

let nakano = async (m, { text, prefix, command }) => {
  if (!text) return m.reply(`✨ Hm? Kamu belum kasih aku prompt-nya, yaa...

📐 *Rasio gambar yang tersedia:*  
• 1:1 (Kotak)  
• 16:9 (Horizontal)  
• 9:16 (Vertikal)

📌 *Contoh penggunaan:*  
• ${prefix + command} langit malam berbintang  
• ${prefix + command} cewek anime cantik --16:9  
• ${prefix + command} taman sakura --9:16

Coba ketik lagi ya, aku bantu kok~`);

  let [teks, size] = text.split("--");
  teks = teks.trim();
  size = size?.trim() || "1:1";

  let orientation;
  if (size === "16:9") {
    orientation = 'landscape';
  } else if (size === "9:16") {
    orientation = 'portrait';
  } else {
    size = "1:1";
    orientation = 'square';
  }

  try {
    await m.react('🖌️');
    const imageUrl = await magichour(teks, orientation);

    await m.reply({
      image: { url: imageUrl },
      caption: `🎀 Gambar kamu udah jadi, nih~

💡 *Prompt:* ${teks}  
📐 *Rasio:* ${size}  

✨ *Dibuat khusus oleh: Nino (yang paling perhatian, lho~)*`
    });

    await m.react('✅');
  } catch (e) {
    await m.react('😔');
    m.reply(`Maaf ya... sepertinya ada yang salah saat membuat gambarnya...

🔧 *Error:* ${e.message}

Coba lagi nanti, ya. Aku tetap di sini kok bantuin kamu 🌸`);
  }
};

nakano.help = ['magichour'];
nakano.category = ['ai image'];
nakano.command = ['magichour'];

module.exports = nakano;