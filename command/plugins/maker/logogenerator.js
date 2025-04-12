const axios = require("axios");

async function sologoGenerator(option = {}) {
  let payload = {
    ai_icon: [333276, 333279],
    height: 300,
    idea: option.idea,
    industry_index: "N",
    industry_index_id: "",
    pagesize: 4,
    session_id: "",
    slogan: option.slogan,
    title: option.title,
    whiteEdge: 80,
    width: 400
  };

  let { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
  return data.data.logoList.map(logo => logo.logo_thumb);
}

let nakano = async (m, { text, prefix, command, wbk, proto, generateWAMessageContent, generateWAMessageFromContent }) => {
  let [title, slogan, idea] = text.split('|');
  if (!title || !slogan || !idea)
    return m.reply(`⚠️ Duh… kamu tuh ya, nyuruh-nyuruh tapi formatnya aja salah!
                   
Pakai format yang bener dong:
*${prefix + command} Judul|Slogan|Ide*
        
Contohnya nih, biar kamu nggak nanya lagi:
*${prefix + command} Cat Cafe|Tempat Nongkrong Bareng Kucing|Kafe Lucu dan Nyaman*`);

  await m.react('⏳');

  let logoUrls = await sologoGenerator({ title, slogan, idea });
  if (!logoUrls || logoUrls.length === 0) return m.reply('❌ Tidak ada logo yang ditemukan!');

  if (m.device === 'ios') {
    let images = logoUrls.map((url, index) => ({
      image: { url },
      caption: `🎨 Jadi ya... aku bikinin logonya. Tapi bukan karena kamu spesial atau apa, oke!
        
📛 Judul: ${title}
📝 Slogan: ${slogan}
💡 Ide: ${idea}
💾 Nih download link-nya... jangan sampe ilangin yaa ${url}!`
    }));
    await wbk.sendAlbumMessage(m.chat, images, { quoted: m, delay: 2000 });
  } else if (m.device === 'android') {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        image: { url }
      }, { upload: wbk.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    for (let i = 0; i < logoUrls.length; i++) {
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🎨 Jadi ya... aku bikinin logonya. Tapi bukan karena kamu spesial atau apa, oke!
            
📛 Judul: ${title}
📝 Slogan: ${slogan}
💡 Ide: ${idea}
💾 Nih download link-nya... jangan sampe ilangin ya!`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: global.footer
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `🎨 Logo - ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: await createImage(logoUrls[i])
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            "name": "cta_url",
            "buttonParamsJson": `{
              "display_text": "Download Logo 🔽",
              "url": "${logoUrls[i]}"
            }`
          }]
        })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            //body: proto.Message.InteractiveMessage.Body.create({ text: '✅ Logo berhasil dibuat!' }),
            //footer: proto.Message.InteractiveMessage.Footer.create({ text: global.footer }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push]
            })
          })
        }
      }
    }, { quoted: m });
    await wbk.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  }
};

nakano.help = ['logogenerator'];
nakano.tags = ['maker'];
nakano.command = ['logogenerator'];
nakano.limit = true;

module.exports = nakano;