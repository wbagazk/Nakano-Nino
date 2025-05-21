const axios = require("axios");

let nakano = async (m, { text }) => {
  const res = await axios.get('https://quote-legends-fufufafa.vercel.app/assets/data.js');
  const js = res.data;

  const match = js.match(/const\s+t\s*=\s*(\[\s*{[\s\S]*?}\s*]);/);
  if (!match) return m.reply("❌ Gagal memuat data quote.");

  let data;
  try {
    data = eval(match[1]);
  } catch {
    return m.reply("❌ Gagal parse data quote.");
  }

  if (!Array.isArray(data) || data.length === 0) {
    return m.reply("❌ Data quote kosong.");
  }

  if (/--\s*list/i.test(text)) {
    const awal = data.slice(0, 10)
      .map(q => `• ID ${q.id}: ${q.content.slice(0, 50).replace(/\n/g, " ")}...`)
      .join('\n');
    const akhir = data.slice(-10)
      .map(q => `• ID ${q.id}: ${q.content.slice(0, 50).replace(/\n/g, " ")}...`)
      .join('\n');
    
    return m.reply(`📌 *10 Quote Awal:*\n${awal}\n\n📌 *10 Quote Terakhir:*\n${akhir}`);
  }

  const idMatch = text.match(/--\s*(\d+)/);
  let quote;

  if (idMatch) {
    const id = parseInt(idMatch[1]);
    quote = data.find(q => q.id === id);
    if (!quote) return m.reply(`❌ Tidak ditemukan quote dengan ID ${id}.`);
  } else {

    quote = data[Math.floor(Math.random() * data.length)];
  }

  await m.reply({
    image: { url: quote.image_url },
    caption: quote.content
  });
};

nakano.help = ['fufufafa'];
nakano.category = ['other'];
nakano.command = ['fufufafa'];

module.exports = nakano;