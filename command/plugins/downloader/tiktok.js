const axios = require('axios');
const { litespace } = require('@lib/library')

let nakano = async (m, { wbk, text, prefix, command, isGroup }) => {
	if (!text) return m.reply(`⚠️ Hmm... kakak belum kasih link nih! 🫣 Coba ketik kayak gini ya: ${prefix + command} https://vt.tiktok.com/xxxxxxx/`);
    if (!text.includes('tiktok.com')) return m.reply(`Link Invalid!!`);
    await m.react('🔽');
    let anu = await tiktokDownloaderVideo(text);
    let audio = anu.music_info.url;
    let item = 0;
    for (let imgs of anu.data) {
        if (imgs.type == "nowatermark") {
            await m.reply({
                video: { url: imgs.url },
                caption: `🎥 ${litespace("Video Information :")}
📍 Region: ${anu.region}
⏳ Duration: ${anu.duration}
📅 Taken: ${anu.taken_at}

📊 ${litespace("Statistik Info :")}
👁️ Views: ${anu.stats.views}
❤️ Likes: ${anu.stats.likes}
💬 Comment: ${anu.stats.comment}
🔄 Share: ${anu.stats.share}
📥 Download: ${anu.stats.download}

👤 ${litespace("Author Info :")}
📝 Fullname: ${anu.author.fullname}
🏷️ Nickname: ${anu.author.nickname}

🎵 ${litespace("Music Info :")}
🎼 Title: ${anu.music_info.title}
🎤 Author: ${anu.music_info.author}
💿 Album: ${anu.music_info.album}

📝 ${litespace("Caption :")}
${anu.title || '-'}`
            });
        }
        if (imgs.type == "photo") {
            if (item == 0) {
                await m.reply({
                    image: { url: imgs.url },
                    caption: `🖼️ ${litespace("Photo Information :")}
📍 Region: ${anu.region}
📅 Taken: ${anu.taken_at}

📊 ${litespace("Statistik Info :")}
👁️ Views: ${anu.stats.views}
❤️ Likes: ${anu.stats.likes}
💬 Comment: ${anu.stats.comment}
🔄 Share: ${anu.stats.share}
📥 Download: ${anu.stats.download}

👤 ${litespace("Author Info :")}
📝 Fullname: ${anu.author.fullname}
🏷️ Nickname: ${anu.author.nickname}

🎵 ${litespace("Music Info :")}
🎼 Title: ${anu.music_info.title}
🎤 Author: ${anu.music_info.author}
💿 Album: ${anu.music_info.album}

📝 ${litespace("Caption :")}
${anu.title || '-'}

    ${m.isGroup ? anu.data.length > 1 ? "\n📥 _Sisa foto dikirim ke private chat_\n" : "\n" : "\n"}`,
                });
            } else {
                await m.reply({
                    image: { url: imgs.url },
                    caption: "Semua foto telah dikirim."
                })
            }
            item += 1;
        }
    }
    await m.reply({
        audio: { url: audio },
        mimetype: 'audio/mpeg',
        fileName: `${anu.music_info.title || 'audio'}.mp3`,
    })
    await m.react('✅');
}

nakano.help = ['tiktok'];
nakano.category = ['downloader'];
nakano.command = ['tt', 'ttdl', 'ttmp3', 'ttnowm', 'ttslide', 'ttaudio', 'tiktok', 'tiktokdl', 'tiktokmp3', 'tiktokmp4', 'tiktokfoto', 'tiktoknowm', 'tiktokaudio'];
nakano.limit = true;

module.exports = nakano;

async function tiktokDownloaderVideo(url) {
	return new Promise(async (resolve, reject) => {
		try {
			let data = []
			function formatNumber(integer) {
				let numb = parseInt(integer)
				return Number(numb).toLocaleString().replace(/,/g, '.')
			}
			
			function formatDate(n, locale = 'en') {
				let d = new Date(n)
				return d.toLocaleDateString(locale, {
					weekday: 'long',
					day: 'numeric',
					month: 'long',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				})
			}
			
			let domain = 'https://www.tikwm.com/api/';
			let res = await (await axios.post(domain, {}, {
				headers: {
					'Accept': 'application/json, text/javascript, */*; q=0.01',
					'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Origin': 'https://www.tikwm.com',
					'Referer': 'https://www.tikwm.com/',
					'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
					'Sec-Ch-Ua-Mobile': '?1',
					'Sec-Ch-Ua-Platform': 'Android',
					'Sec-Fetch-Dest': 'empty',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Site': 'same-origin',
					'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: {
					url: url,
					count: 12,
					cursor: 0,
					web: 1,
					hd: 1
				}
			})).data.data
			if (Array.isArray(res?.images) && res.images.length > 0) {
                res.images.map(v => {
                    data.push({ type: 'photo', url: v });
                });
			} else {
				data.push({
					type: 'nowatermark',
					url: 'https://www.tikwm.com' + res.play,
				})
			}
			let json = {
				status: true,
				title: res.title,
				taken_at: formatDate(res.create_time).replace('1970', ''),
				region: res.region,
				id: res.id,
				durations: res.duration,
				duration: res.duration + ' Seconds',
				cover: 'https://www.tikwm.com' + res.cover,
				size_wm: res.wm_size,
				size_nowm: res.size,
				size_nowm_hd: res.hd_size,
				data: data,
				music_info: {
					id: res.music_info.id,
					title: res.music_info.title,
					author: res.music_info.author,
					album: res.music_info.album ? res.music_info.album : null,
					url: 'https://www.tikwm.com' + res.music || res.music_info.play
				},
				stats: {
					views: formatNumber(res.play_count),
					likes: formatNumber(res.digg_count),
					comment: formatNumber(res.comment_count),
					share: formatNumber(res.share_count),
					download: formatNumber(res.download_count)
				},
				author: {
					id: res.author.id,
					fullname: res.author.unique_id,
					nickname: res.author.nickname,
					avatar: 'https://www.tikwm.com' + res.author.avatar
				}
			}
			resolve(json)
		} catch (e) {
			reject(e)
		}
	});
};