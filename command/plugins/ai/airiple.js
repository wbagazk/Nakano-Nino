const axios = require("axios");
const translate = require('@vitalets/google-translate-api');

async function airiple(text) {
   let payload = {
      messages: [{
         content: text,
         role: "user"
      }]
   };

   try {
      let { data } = await axios.post("https://ai.riple.org/", payload, {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
         },
         responseType: "stream"
      });

      return new Promise((resolve, reject) => {
         let fullResponse = "";

         data.on("data", (chunk) => {
            let lines = chunk.toString().split("\n");

            for (let line of lines) {
               if (line.startsWith("data: ")) {
                  let jsonString = line.slice(6).trim();

                  if (jsonString === "[DONE]") {
                     return resolve({ result: fullResponse.trim() });
                  }

                  try {
                     let parsedData = JSON.parse(jsonString);
                     let content = parsedData?.choices?.[0]?.delta?.content;

                     if (content) {
                        fullResponse += content;
                     }
                  } catch (err) {
                     reject(err);
                  }
               }
            }
         });

         data.on("error", (err) => reject(err));
      });

   } catch (error) {
      throw new Error(error.message);
   }
}

let handler = async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`Hello, how can I help you?\nExample: ${prefix + command} Hello`);

    await m.react('💬'); 

    let quotedMessage = m.quoted ? m.quoted.text : null;
    let query = quotedMessage ? `${quotedMessage}\n\n${text}` : text;

    const result = await airiple(query);
    let aiResponse = result.result || 'Maaf, saya tidak dapat memberikan jawaban saat ini.';
    const detectedLang = await translate(aiResponse, {
        to: 'id',
        autoCorrect: true
    });
    let answer = detectedLang.from.language.iso !== 'id' 
        ? (await translate(aiResponse, { from: detectedLang.from.language.iso, to: 'id' })).text 
        : aiResponse;

    m.reply({ text: answer });
    await m.react('🤖');
};

handler.help = ['airiple'];
handler.tags = ['ai text'];
handler.command = ['airiple'];

module.exports = handler;