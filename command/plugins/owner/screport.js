let nakano = async (m, { wbk, text }) => {
    if (!text) return m.reply(`Contoh: ${prefix + command} halo kak, aku mau request fitur download music`);
	textt = `*| REQUEST |*`;
	teks1 = `\n\n*No Bot* : @${m.sender.split("@")[0]}\n*No Owner* : @${global.creator.split("@")[0]}\n*Request* : ${text}`;
	teks2 = `\n\n*Hii ${m.pushname}, permintaan kamu sudah dikirim ke pemilik aku, tunggu sebentar ya...*`;
	wbk.sendMessage("6285183134846@s.whatsapp.net", {
		text: textt + teks1,
		mentions: [m.sender],
	}, { quoted: m });
	m.reply({
		text: textt + teks2 + teks1
	});
};

nakano.help = ['screport'];
nakano.tags = ['owner'];
nakano.command = ['screport'];
nakano.owner = true;

module.exports = nakano;