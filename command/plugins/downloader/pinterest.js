const axios = require("axios");
const { litespace } = require('../../../utils/myfunc')

async function pindl(pinterestUrl) {
  try {
    const apiUrl = `https://pinterestdownloader.io/id/frontendService/DownloaderService?url=${encodeURIComponent(pinterestUrl)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://pinterestdownloader.io/id'
    };
 
    const response = await axios.get(apiUrl, { headers });
 
    if (response.status === 200 && response.data) {
      const data = response.data;
 
      const result = {
        url: pinterestUrl,
        title: data.title || "Pinterest Video & Photo",
        thumbnail: data.thumbnail,
        medias: data.medias || []
      };
 
      return result;
    } else {
      return JSON.stringify({ error: "Gagal mengambil data" }, null, 2);
    }
  } catch (error) {
    return JSON.stringify({ error: error.message }, null, 2);
  }
}

let nakano = async (m, { wbk, text, prefix, command }) => {
    if (!text) return m.reply(`⚠️ Hmm... kakak belum kasih link nih! 🫣 Coba ketik kayak gini ya: ${prefix + command} https://pin.it/xxxxxxx/`);
    if (!text.includes('pin.it' || 'id.pinterest.com')) return m.reply(`Link Invalid!!`);
    
    await m.react('🔽');
    let result = await pindl(text);
    
    const { title, thumbnail, medias } = result;
    let media;
    media = medias.find(m => m.extension === 'mp4');

    if (media) {
        
        await m.reply({
            video: { url: media.url }
        });
        
    } else {
        media = medias.find(m => m.extension === 'jpg' && m.quality === '564p');
        if (!media) media = medias.find(m => m.extension === 'jpg');
        if (!media) return m.reply('❌ Tidak dapat menemukan media yang dapat dikirim.');

        await m.reply({
            image: { url: media.url }
        });
    }

    await m.react('✅');
}

nakano.help = ['pinterestdl'];
nakano.tags = ['downloader'];
nakano.command = ['pinterestdl', 'pindl']
nakano.limit = true;

module.exports = nakano;