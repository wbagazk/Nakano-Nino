const { litespace } = require('@lib/library');
const { sendButtonText } = require('@utils/messageButton');

let nakano = async (m, { wbk, args, prefix, command }) => {
    const url = args[0];

    if (!url || !url.includes('whatsapp.com/channel/')) {
        return m.reply(`😤 Ara~ kamu harus kirim *link channel*-nya ya!\n\nContohnya begini:\n*${prefix + command} https://whatsapp.com/channel/xxxxxxxxxx*`);
    }

    const result = url.split('https://whatsapp.com/channel/')[1].split(/[?&]/)[0];
    const metadata = await wbk.newsletterMetadata("invite", result);
    
    const teks = `📰 ${litespace("INFORMASI CHANNEL")} 📰\n\n` +
          		 `📛 *Nama:* ${metadata.name || 'Tidak diketahui'}\n` +
                 `📎 *ID:* ${metadata.id}\n` +
                 `📝 *Deskripsi:*\n${metadata.description || 'Tidak diketahui'}`;

    const button = [{
        name: "cta_copy",
        buttonParamsJson: `{
            "display_text": "Copy ID Channel",
            "id": "${id}",
            "copy_code": "${id}"
        }`
    }];

    return sendButtonText(wbk, m.chat, button, teks, global.footer, m);
};

nakano.help = ['checkidchannel'];
nakano.category = ['tools'];
nakano.command = ['checkidchannel', 'cekidch', 'cekchid'];
nakano.limit = true;

module.exports = nakano;