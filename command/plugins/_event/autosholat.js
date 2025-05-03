const { fetchJson } = require('../../../utils/myfunc');

module.exports = async (wbk, m, plug) => {
    wbk.autosholat = wbk.autosholat ? wbk.autosholat : {};
    
    if (!m.isNewsletter) {
        if (!(m.chat in wbk.autosholat)) {
            const data = await fetchJson('https://api.aladhan.com/v1/timingsByCity?city=Jember&country=Indonesia&method=8');
            if (data.code === 200) {
                const jadwalSholat = data.data.timings;
                const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                const namaSholat = {
                    Fajr: "Shubuh",
                    Dhuhr: "Dzuhur",
                    Asr: "Ashar",
                    Maghrib: "Maghrib",
                    Isha: "Isya"
                };
                for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
                    if (timeNow === waktu && namaSholat[sholat]) {
                        let teks = `📣 *Waktu Sholat ${namaSholat[sholat]} Telah Tiba!* 🕌\n\n`;
                        teks += '"Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman." *(QS. An-Nisa: 103)*\n\n';
                        teks += 'Segeralah tinggalkan aktivitasmu sejenak, ambillah air wudhu, dan tunaikan sholat tepat pada waktunya. Jangan sampai kita termasuk orang yang lalai.\n\n';
                        teks += '*Jadwal Sholat Hari Ini:*\n';
                        teks += `- *Shubuh*: ${jadwalSholat.Fajr}\n`;
                        teks += `- *Dzuhur*: ${jadwalSholat.Dhuhr}\n`;
                        teks += `- *Ashar*: ${jadwalSholat.Asr}\n`;
                        teks += `- *Maghrib*: ${jadwalSholat.Maghrib}\n`;
                        teks += `- *Isya*: ${jadwalSholat.Isha}\n\n`;
                        teks += '*Informasi Waktu Lainnya:*\n';
                        teks += `- *Sunrise*: ${jadwalSholat.Sunrise}\n`;
                        teks += `- *Sunset*: ${jadwalSholat.Sunset}\n`;
                        teks += `- *Imsak*: ${jadwalSholat.Imsak}\n`;
                        teks += `- *Midnight*: ${jadwalSholat.Midnight}\n`;
                        teks += `- *Firstthird*: ${jadwalSholat.Firstthird}\n`;
                        teks += `- *Lastthird*: ${jadwalSholat.Lastthird}`;
                        
                        wbk.autosholat[m.chat] = [];
                        wbk.autosholat[m.chat].push(
                            wbk.sendMessage(m.chat, {
                                text: teks,
                                contextInfo: {
                                    mentionedJid: [m.sender],
                                    forwardingScore: 999999,
                                    isForwarded: true,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterName: global.wm,
                                        newsletterJid: global.sosmed.idchwa,
                                    },
                                    externalAdReply: {
                                        showAdAttribution: true,
                                        title: `Selamat Beribadah, Kak! 🕌`,
                                        body: 'Jember, Indonesia',
                                        previewType: "PHOTO",
                                        thumbnail: nakanonino,
                                        sourceUrl: global.sosmed.website
                                    }
                                }
                            })
                        );

                        wbk.autosholat[m.chat].push(
                            await wbk.sendMessage(m.chat, {
                                audio: { url: 'https://files.catbox.moe/9nd3ms.mp3' },
                                mimetype: 'audio/mp4',
                                ptt: true,
                                contextInfo: {
                                    mentionedJid: [m.sender],
                                    forwardingScore: 999999,
                                    isForwarded: true,
                                    forwardedNewsletterMessageInfo: {
                                        newsletterName: global.wm,
                                        newsletterJid: global.sosmed.idchwa,
                                    },
                                    externalAdReply: {
                                        showAdAttribution: true,
                                        title: `Selamat Beribadah, Kak! 🕌`,
                                        body: 'Jember, Indonesia',
                                        previewType: "PHOTO",
                                        thumbnail: nakanonino,
                                        sourceUrl: global.sosmed.website
                                    }
                                }
                            })
                        );

                        setTimeout(() => {
                            delete wbk.autosholat[m.chat];
                        }, 60000);
                    }
                }
            }
        }
    }
};