const fs = require('fs');
const axios = require("axios");
const mime = require('mime-types');
const FormData = require('form-data');
const { writeExif } = require("../../../utils/exif");
const { getBuffer } = require("../../../utils/myfunc");

async function quax(path) {
  try {
    const form = new FormData();
    const ext = path.split('.').pop();
    const mimeType = mime.lookup(ext) || 'application/octet-stream';
    form.append('files[]', fs.createReadStream(path), {
      filename: `v-${Date.now()}.${ext}`,
      contentType: mimeType
    });
    const { data } = await axios({
      method: 'POST',
      url: 'https://qu.ax/upload.php',
      headers: form.getHeaders(),
      data: form
    });
    if (!data.files || !data.files.length) {
      throw new Error('Upload failed or response format changed.');
    }
    return data.files[0].url;
  } catch (err) {
    throw new Error(`Upload Error: ${err.message}`);
  }
}

let nakano = async (m, { wbk, text, prefix, command, mime, quoted }) => {
    if (!/webp/.test(mime) && /image/.test(mime)) {
        if (!text) return m.reply(`Penggunaan: ${prefix + command} teks_atas|teks_bawah`);
        let atas = text.split('|')[0] ? text.split('|')[0] : '';
        let bawah = text.split('|')[1] ? text.split('|')[1] : '';
        let fileMime = await wbk.downloadAndSaveMediaMessage(quoted);
        let fileUrl = await quax(fileMime);

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
nakano.limit = true;

module.exports = nakano;