const axios = require('axios');
const { litespace } = require('../../../utils/myfunc');
const { createCarouselMessage } = require('../../../utils/messageButton');

async function tiktokSearchVideo(query) {
	return new Promise(async (resolve, reject) => {
		axios("https://tikwm.com/api/feed/search", {
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				cookie: "current_language=en",
				"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
			},
			data: {
				keywords: query,
				count: 12,
				cursor: 0,
				web: 1,
				hd: 1,
			},
			method: "POST",
		}).then((res) => {
			resolve(res.data.data);
		});
	});
}

let nakano = async (m, { wbk, text, args, prefix, command }) => {
    if (!text) return m.reply(`⚠️ Kakak lupa kasih kata kunci! Coba ketik kayak gini ya: *${prefix + command} jj* biar Nakano bisa bantu cari yang kakak mau! 🔍💬`);
    
    await m.react('⏱️');
    
    let results = await tiktokSearchVideo(text);
    if (!results || results.videos.length === 0) return m.reply('Tidak ada hasil ditemukan.');

    await createCarouselMessage({
        wbk,
        m,
        max: 10,
        quoted: m,
        mediaType: 'video',
        bodyText: `${litespace('TIKTOK SEARCH')}\n\nYatta~! Aku berhasil nemuin video TikTok ${text} loh! 💖 Coba deh dilihat, semoga cocok sama seleramu~ Ufufu~ 🎥`,
        wmText: `Kalau masih belum puas..., cari lagi aja! Cukup ketik ${prefix + command}! Hmph~ 💢💞`,
        items: results.videos,
        buildCard: async (item, index) => {
            return {
                body: `👤 *Username* : ${item.author.unique_id}\n` +
                      `🏷️ *Nickname* : ${item.author.nickname}\n` +
                      `⏳ *Duration* : ${item.duration} detik\n` +
                      `❤️ *Likes* : ${item.digg_count}\n` +
                      `💬 *Comments* : ${item.comment_count}\n` +
                      `🔄 *Shares* : ${item.share_count}`,
                footer: global.footer,
                title: `*Video* - ${index}`,
                mediaUrl: `https://tikwm.com${item.play}`,
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Lihat Video 🎥",
                            url: `https://www.tiktok.com/@${item.author.unique_id}/video/${item.video_id}`,
                            merchant_url: `https://www.tiktok.com/@${item.author.unique_id}/video/${item.video_id}`
                        })
                    }
                ]
            };
        }
    });
    
    await m.react('✅');
};

nakano.help = ['ttsearch'];
nakano.tags = ['search'];
nakano.command = ['ttsearch'];
nakano.limit = true;

module.exports = nakano;