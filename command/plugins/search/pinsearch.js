const axios = require('axios');
const { litespace } = require('@lib/library');
const { createCarouselMessage } = require('@utils/messageButton');

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    if (!text) return m.reply(`⚠️ Kakak lupa kasih kata kunci! Coba ketik kayak gini ya: *${prefix + command} jj* biar Nakano bisa bantu cari yang kakak mau! 🔍💬`);

    await m.react('⏱️');

    let response;
    try {
        response = await axios.get(api.fastrestapis + '/search/pinterest/advanced', {
            params: {
                name: text,
                type: 'detail'
            },
        });
    } catch (err) {
        return m.reply('Gagal mengambil data. Pastikan link valid dan coba lagi.');
    }

    const posts = response?.data?.result?.data?.posts;
    if (!Array.isArray(posts) || posts.length === 0) {
        return m.reply('Hasil tidak ditemukan. Coba kata kunci lain ya~');
    }

    await createCarouselMessage({
        wbk,
        m,
        max: 10,
        quoted: m,
        mediaType: 'image',
        bodyText: `${litespace('PINTEREST SEARCH')}\n\nYatta~! Aku berhasil nemuin Image Pinterest ${text} loh! 💖 Coba deh dilihat, semoga cocok sama seleramu~ Ufufu~ 🎥`,
        wmText: `Kalau masih belum puas..., cari lagi aja! Cukup ketik ${prefix + command}! Hmph~ 💢💞`,
        items: posts,
        buildCard: async (item, index) => {
            const { metadata, stats, creator, urls } = item;
            return {
                body:
                    `\n${litespace('Informasi Pinterest')}\n` +
                    `🎬 *Judul* : ${metadata.title || 'No Title'}\n` +
                    `📃 *Deskripsi* : ${metadata.description || 'Tidak ada deskripsi'}\n` +
                    `📅 *Upload* : ${metadata.createdAt}\n` +
                    `📅 *Update* : ${metadata.updatedAt}\n` +
                    `❤️ *Like* : ${stats.totalReactions}\n` +
                    `💬 *Comment* : ${stats.comments}\n` +
                    `📌 *Save* : ${stats.saves}\n\n` +
                    `👤 *Username* : ${creator.username}\n` +
                    `📛 *Fullname* : ${creator.fullName}\n` +
                    `👥 *Followers* : ${creator.followers}\n`,
                footer: global.footer,
                title: `*Pinterest* - ${index}`,
                mediaUrl: item.urls.imageVariants["736x"],
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Lihat di Pinterest 🌐",
                            url: item.urls.pin,
                            merchant_url: item.urls.pin
                        })
                    }
                ]
            };
        }
    });

    await m.react('✅');
};

nakano.help = ['pinsearch'];
nakano.category = ['search'];
nakano.command = ['pinsearch', 'pins', 'pin'];
nakano.limit = true;

module.exports = nakano;