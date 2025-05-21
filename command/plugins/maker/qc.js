const axios = require("axios");
const { writeExif } = require("@utils/exif");

async function quotedLyo(teks, name, profile, reply) {
	return new Promise(async (resolve, reject) => {
		const {
			quoted
		} = reply || {};
		const str = {
			type: 'quote',
			format: 'png',
			backgroundColor: '#fff',
			width: 512,
			height: 768,
			scale: 2,
			messages: [
				quoted,
				{
					avatar: true,
					from: {
						id: 2,
						name,
						photo: {
							url: profile
						}
					},
					text: teks
				}
			]
		};
		try {
			const {
				data
			} = await axios.post('https://bot.lyo.su/quote/generate', JSON.stringify(str, null, 2), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			resolve(data);
		} catch (e) {
			reject(e);
		}
	});
}

let nakano = async (m, { text, command, wbk }) => {
    if (!text) return m.reply("😤 *Kamu nggak kasih teks? Ayo cepat! Masukkan teks buat qc-nya!*");

    await m.react('⏱️');

    const nn = await wbk.getName(m.sender);
    let pp = await wbk.profilePictureUrl(m.sender, 'image').catch(() =>
        'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg'
    );

    let gtww;

    if (m.quoted && typeof m.quoted.text === 'string') {
        const nq = await wbk.getName(m.quoted.sender);
        let pq = await wbk.profilePictureUrl(m.quoted.sender, 'image').catch(() =>
            'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg'
        );

        let quotedText = m.quoted.text.length > 4 ? m.quoted.text.substring(4) : m.quoted.text;

        const uq = {
            avatar: true,
            from: {
                id: 1,
                name: nq,
                photo: { url: pq }
            },
            text: quotedText
        };

        gtww = await quotedLyo(text, nn, pp, { quoted: uq }).catch(() => null);
    } else {
        gtww = await quotedLyo(text, nn, pp).catch(() => null);
    }

    if (!gtww || !gtww.result || !gtww.result.image) {
        return m.reply("😵‍💫 *Gagal membuat gambar quote!* Coba lagi nanti ya~");
    }

    const buffer = Buffer.from(gtww.result.image, 'base64');
    const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
        packname: packname,
        author: author
    });
    await m.reply({ sticker: { url: file } });
    await m.react('✅');
};

nakano.help = ['qc'];
nakano.category = ['maker'];
nakano.command = ['qc', 'qcmaker'];
nakano.limit = true;

module.exports = nakano;