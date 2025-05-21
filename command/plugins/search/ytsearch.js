const ytsearch = require('yt-search');
const { litespace } = require('@lib/library');
const { createCarouselMessage } = require('@utils/messageButton');

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    if (!text) return m.reply(`⚠️ Kakak lupa kasih kata kunci! Coba ketik kayak gini ya: *${prefix + command} jj* biar Nakano bisa bantu cari yang kakak mau! 🔍💬`);
    
    await m.react('⏱️');
    
    const result = await ytsearch(text);
    if (!result || !result.all) return m.reply(`*Konten tidak ditemukan!* ☹️`);

    await createCarouselMessage({
        wbk,
        m,
        max: 10,
        quoted: m,
        mediaType: 'image',
        bodyText: `${litespace('YOUTUBE SEARCH')}\n\nYatta~! Aku berhasil nemuin Konten Youtube ${text} loh! 💖 Coba deh dilihat, semoga cocok sama seleramu~ Ufufu~ 🎥`,
        wmText: `Kalau masih belum puas..., cari lagi aja! Cukup ketik ${prefix + command}! Hmph~ 💢💞`,
        items: result.all,
        buildCard: async (item, index) => {
            return {
                body: `\n🎬 *Judul* : ${item.title}\n` +
                      `👤 *Channel* : ${item.author.name}\n` +
                      `⏱️ *Durasi* : ${item.duration}\n` +
                      `👁️ *Views* : ${item.views}\n` +
                      `📅 *Upload* : ${item.ago}` +
                	  `📎 *Link Youtube* : ${item.url}`,
                footer: global.footer,
                title: `*Konten* - ${index}`,
                mediaUrl: item.image,
                buttons: [
                    {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({
                            title: "Pilih/tekan disini🎯",
                            sections: [
                                {
                                    title: "Video atau Audio",
                                    rows: [
                                        {
                                            title: "Video 🎥",
                                            description: "Download video kualitas 480p",
                                            id: `${prefix}ytvideo ${item.url} video 480`
                                        },
                                        {
                                            title: "Audio 🎵",
                                            description: "Download audio kualitas 256kbps",
                                            id: `${prefix}ytaudio ${item.url} audio 256`
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                ]
            };
        }
    });
    
    await m.react('✅');
};

nakano.help = ['ytsearch'];
nakano.category = ['search'];
nakano.command = ['ytsearch'];
nakano.limit = true;

module.exports = nakano;