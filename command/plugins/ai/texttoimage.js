const axios = require("axios");
const cheerio = require("cheerio");
const translate = require('@vitalets/google-translate-api');

const BASE_URL = "https://www.texttoimage.org";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://www.texttoimage.org",
  Referer: "https://www.texttoimage.org/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
};

async function texttoimage(prompt) {
  if (!prompt) return "Where is the prompt param?";
  try {
    let q = new URLSearchParams({ prompt });
    let { data } = await axios.post(`${BASE_URL}/generate`, q, { headers });

    let html = await axios.get(`${BASE_URL}/${data.url}`, { headers });
    const $ = cheerio.load(html.data);
    let result = BASE_URL + $(".image-container").find("img").attr("src");

    return {
      status: true,
      result,
    };
  } catch (e) {
    return {
      status: false,
      result: "An error occurred! Server down.",
    };
  }
}

let nakano = async (m, { text, prefix, command }) => {
    if (!text) return newReply(`*Contoh: ${prefix + command} [prompt]*`);
    
    await m.react('🎨');
    
    const translatedText = await translate(text, { from: 'id', to: 'en' });
    let response = await texttoimage(translatedText.text);
    if (!response?.status || !response?.result) throw new Error("Gagal mendapatkan gambar dari AI.");
    
    m.reply({
        image: { url: response.result },
        caption: 'Hoo~, akhirnya! Gambar sudah siap! Semoga kamu suka!💖'
    })
    await m.react('✅');
};

nakano.help = ['texttoimage'];
nakano.category = ['ai image'];
nakano.command = ['texttoimage'];
nakano.limit = true;

module.exports = nakano;