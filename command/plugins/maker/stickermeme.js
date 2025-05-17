const fs = require('fs');
const axios = require('axios');
const { fromBuffer } = require('file-type');
const { writeExif } = require("../../../utils/exif");
const { getBuffer } = require("../../../utils/myfunc");

async function pxpicCDN(path) {
  const buffer = fs.readFileSync(path);
  const fileInfo = await fromBuffer(buffer);
  const ext = fileInfo?.ext || 'bin';
  const mime = fileInfo?.mime || 'application/octet-stream';
  const fileName = Math.random().toString(36).slice(2, 8) + '.' + ext;

  const responses = await axios.post("https://pxpic.com/getSignedUrl", {
    folder: "uploads",
    fileName
  }, {
    headers: { "Content-Type": "application/json" }
  });

  await axios.put(responses.data.presignedUrl, buffer, {
    headers: { "Content-Type": mime }
  });

  return "https://files.fotoenhancer.com/uploads/" + fileName;
}

let nakano = async (m, { wbk, text, prefix, command, mime, quoted }) => {
    if (!/webp/.test(mime) && /image/.test(mime)) {
        if (!text) return m.reply(`Penggunaan: ${prefix + command} teks_atas|teks_bawah`);
        await m.react('🕛');
        let atas = text.split('|')[0] ? text.split('|')[0] : '';
        let bawah = text.split('|')[1] ? text.split('|')[1] : '';
        let fileMime = await wbk.downloadMediaMessage(quoted);
        let fileUrl = await pxpicCDN(fileMime);
        let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${fileUrl}`;
    	const buffer = await getBuffer(meme);
    	const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
        	packname: packname,
        	author: author
     	});

    	await m.reply({ sticker: { url: file } });
    	await m.react('✅');
        
    } else {
        m.reply(`Kirim atau balas gambar dengan caption ${prefix + command} teks_atas|teks_bawah untuk membuat meme!`);
	}
};

nakano.help = ['stickermeme'];
nakano.tags = ['maker'];
nakano.command = ['stickermeme', 'stikermeme', 'smeme'];

module.exports = nakano;