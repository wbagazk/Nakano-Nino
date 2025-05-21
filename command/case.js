//=========================================================
// MODULE
const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const axios = require('axios');
const cron = require('node-cron');
const canvafy = require('canvafy')
const speed = require('performance-now');
const moment = require("moment-timezone");
const PhoneNumber = require('awesome-phonenumber');
const readmore = String.fromCharCode(8206).repeat(4001);
const { exec, execSync, spawn } = require("child_process");
const { randomBytes } = require('crypto');
//=========================================================

//=========================================================
require('@config/api')
require('@config/mess')
require('@config/media')
require('@config/setting')
const fakeQuoted = require('@utils/fakeQuoted');
const { checkAntiSpam, resetSpam } = require('@utils/antispam')
const { addAfkUser, checkAfkUser, getAfkId, getAfkPosition, getAfkReason, getAfkTime } = require('@utils/afk');
const { addSewaGroup, getSewaExpired, getSewaPosition, checkSewaExpired, checkSewaGroup, getAllSewaGroups } = require('@utils/sewa');
const { sendButtonText, sendButtonImage, sendButtonVideo, sendButtonDocument, createCarouselMessage } = require('@utils/messageButton');
const { addPremiumUser, checkPremiumUser, expiredCheck, getAllPremiumUser, getPremiumExpired, getPremiumPosition } = require('@utils/premium');
const { getGroupAdmins, parseMention, runtime, decodeJid, ucapanWaktu, monospace, litespace, logMessage } = require('@lib/library');
//=========================================================

//=========================================================
// ============== BACA DB JSON
const readJSON = (aliasPath) => JSON.parse(fs.readFileSync(require.resolve(aliasPath)));
const sewa = readJSON('@role/sewa.json');
const owner = readJSON('@role/owner.json');
const premium = readJSON('@role/premium.json');
const userbot = readJSON('@role/user.json');

const afk = readJSON('@function/afk.json');
const blacklist = readJSON('@function/blacklist.json');
const whitelist = readJSON('@function/whitelist.json');
const freqCommand = readJSON('@function/frequentlycommand.json');
//=========================================================

//=========================================================
// ============== RANDOM THUMB BUFFER & THUMB LINK
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * global.image.thumbUrl.length);
    return global.image.thumbUrl[randomIndex];
}
const nakanoninoUrl = getRandomImage()

function getRandomThumb() {
    const thumbs = global.image?.thumb || []
    if (!thumbs.length) return null
    return thumbs[Math.floor(Math.random() * thumbs.length)]
}
const nakanonino = getRandomThumb()
//=========================================================

//=========================================================
// ============== RESET LIMIT
cron.schedule('00 00 * * *', () => {
    let user = Object.keys(db.data.users)
    for (let jid of user) {
        const limitUser = db.data.users[jid].vip ? global.limit.vip : checkPremiumUser(jid, premium) ? global.limit.premium : global.limit.free
        db.data.users[jid].limit = limitUser
    }
}, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
});
//=========================================================

//=========================================================
module.exports = wbk = async (wbk, m, msg, chatUpdate, store) => {
//=========================================================
   
//=========================================================
try {
    const { type, quotedMsg, mentioned, now, fromMe } = m
    const body = m.body || '';
    const budy = m.text || '';
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : prefa;
    const isCmd = prefix ? body.startsWith(prefix) : false;
    const isCommand = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ""
    const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1);
    const botNumber = await decodeJid(wbk.user.id);
    const text = q = args.join(" ");
    const getQuoted = (m.quoted || m);
    const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || '';
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const isPrivate = !isGroup;
    const groupMetadata = m.isGroup ? await wbk.groupMetadata(m.chat).catch(e => {}) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
    const clientId = wbk.user.id.split(':')[0];
    const senderbot = m.key.fromMe ? wbk.user.id.split(':')[0] + "@s.whatsapp.net" || wbk.user.id : m.key.participant || m.key.remoteJid;
    const senderId = senderbot.split('@')[0];
    const isBot = clientId.includes(senderId);
    const isSewa = checkSewaGroup(m.chat);
    const isBlacklist = blacklist.includes(m.sender);
    const isWhitelist = whitelist.includes(m.sender);
    const isAfkOn = checkAfkUser(m.sender, afk)
    const isUser = userbot.includes(m.sender);
    const isCreator = [botNumber, global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    const isPremium = isCreator || checkPremiumUser(m.sender, premium);
    expiredCheck(wbk, m, premium);
    checkSewaExpired(wbk);
    const { fbot, fkontak, ftroli, fevent } = fakeQuoted(m, m.pushname, botName, wm);
//=========================================================
    
//=========================================================
// ============== DATABASE
    try {
        let user = db.data.users[m.sender] || {};
        if (typeof user !== "object") db.data.users[m.sender] = {};
        if (!("register" in user)) user.register = false;
        if (!("cekRegister" in user)) user.cekRegister = false;
        if (!("verifNumber" in user)) user.verifNumber = randomBytes(3).toString("hex");
        if (!("serialNumber" in user)) user.serialNumber = randomBytes(16).toString("hex");
        if (!("name" in user)) user.nama = "User";
        if (!("age" in user)) user.age = 0;
        if (!("city" in user)) user.city = "Jember";
        if (!("nickname" in user)) user.nickname = wbk.getName(m.sender);
        if (!("limit" in user) || typeof user.limit !== "number" || isNaN(user.limit)) user.limit = user.vip ? global.limit.vip : isPremium ? global.limit.premium : global.limit.free;
        if (!("point" in user) || typeof user.point !== "number" || isNaN(user.point)) user.point = user.vip ? global.point.vip : isPremium ? global.point.premium : global.point.free;
        if (!("saldo" in user) || typeof user.saldo !== "number" || isNaN(user.saldo)) user.saldo = 0;
        if (!isPremium) user.premium = false;
        if (!("vip" in user)) user.vip = false;
        if (!("rpg" in user)) user.rpg = false;
        if (!("badword" in user)) user.badword = 0;
        db.data.users[m.sender] = user;
        
        if (m.chat.endsWith('@g.us')) {
            let chats = db.data.chats[m.chat] || {};
            if (typeof chats !== "object") db.data.chats[m.chat] = {};
            if (!("welcome" in chats)) chats.welcome = {
                check: false,
                text: "✨ *Selamat Datang di Grup, Kak @user!* 👋\n\nHai Kak @pushname! Senang banget kamu bisa join di grup ini. Yuk, saling sapa dan kenalan sama member lainnya. Jangan lupa baca deskripsi grup ya~ 💬💕"
            };
            if (!("leave" in chats)) chats.leave = {
                check: false,
                text: "😢 *Selamat Tinggal, Kak @user!* 👋\n\nTerima kasih sudah menjadi bagian dari grup ini. Semoga kita bisa bertemu lagi di lain kesempatan. Hati-hati di perjalanan ya~ 💐"
            };
            if (!("adminevent" in chats)) chats.adminevent = false;
            if (!("groupevent" in chats)) chats.groupevent = false;
            if (!("antibot" in chats)) chats.antibot = {
                check: false,
                kick: false
            };
            if (!("antilink" in chats)) chats.antilink = {
                check: false,
                kick: false
            };
            if (!("antibadword" in chats)) chats.antibadword = {
                check: false,
                text: null,
                kick: false
            };
            if (!("antistatusmention" in chats)) chats.antistatusmention = {
                check: false,
                kick: false
            };
            if (!("autosholat" in chats)) chats.autosholat = {
                check: false,
                city: null
            };
            db.data.chats[m.chat] = chats;
        }
        
        let messages = db.data.messages[m.sender] || {}
        if (typeof messages !== 'object') db.data.messages[m.sender] = {}
        if (!("lastchat" in messages)) messages.lastchat = '';
        if (!("allchat" in messages)) messages.allchat = 0;
        db.data.messages[m.sender] = messages

        let rpgUser  = db.data.rpg[m.sender] || {};
        if (typeof rpgUser !== "object") db.data.rpg[m.sender] = {};
        if (!("title" in rpgUser)) rpgUser.title = '';
        if (!("coins" in rpgUser)) rpgUser.coins = 0;
        if (!("exp" in rpgUser)) rpgUser.exp = 2500;
        if (!("lastclaim" in rpgUser )) rpgUser.lastclaim = 0;
        if (!("lastrampok" in rpgUser )) rpgUser.lastrampok = 0;
        db.data.rpg[m.sender] = rpgUser ;

        let setting = db.data.settings[botNumber] || {};
        if (typeof setting !== "object") db.data.settings[botNumber] = {};
        if (!("onlyregister" in setting)) setting.onlyregister = false;
        if (!("badword" in setting)) setting.badword = false;
        if (!("autobio" in setting)) setting.autobio = false;
        if (!("anticall" in setting)) setting.anticall = false;
        if (!("antispam" in setting)) setting.antispam = false;
        if (!("autoread" in setting)) setting.autoread = false;
        if (!("autorecordtype" in setting)) setting.autorecordtype = false;
        if (!("autorecord" in setting)) setting.autorecord = false;
        if (!("autotype" in setting)) setting.autotype = false;
        if (!("autoswview" in setting)) setting.autoswview = false;
        if (!("autoswviewreact" in setting)) setting.autoswviewreact = false;
        if (!("autobackup" in setting)) setting.autobackup = {
            check: false,
            interval: 86400000
        };
        if (!("autoclearsession" in setting)) setting.autoclearsession = {
            check: false,
            interval: 86400000
        };
        if (!("autocleartemp" in setting)) setting.autocleartemp = {
            check: false,
            interval: 86400000
        };
        db.data.settings[botNumber] = setting;
    } catch (error) {
        console.error("⚠️ Terjadi kesalahan:", error);
    }
//=========================================================
    
//=========================================================
// ============== CONSOLE LOG
    if (m.message) {
        let header = chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  ${ucapanWaktu()}  🌟`));
        let title = chalk.white(chalk.bgHex("#4a69bd").bold("🚀  There is a message  🚀"));
        let date = chalk.cyanBright(`${"📅  Date".padEnd(20)} : ${new Date().toLocaleString("id-ID")}`);
        let sender = chalk.yellowBright(`${"🗣️  Sender Name".padEnd(21)} : ${m.pushName || botName}`);
        let device = chalk.whiteBright(`${"📱  Device".padEnd(20)} : ${m.device}`);
        let type = chalk.whiteBright(`${"💬  Type".padEnd(20)} : ${m.mtype}`);
        let chat = chalk.whiteBright(`${"💬  Chat".padEnd(20)} : ${m.text}`);
        let idchat = chalk.whiteBright(`${"🆔  Type".padEnd(20)} : ${m.id}`);
        let jid = chalk.magentaBright(`${"👤  ID Chat".padEnd(20)} : ${m.sender}`);
        let group = chalk.redBright(`${"🔍  Group".padEnd(20)} : ${groupName}`);
        if (isCmd && !m.isGroup) {
            console.log(header);
            console.log(title);
            console.log(date);
            console.log(sender);
            console.log(device);
            console.log(jid);
            console.log(type);
            console.log(chat);
            console.log(idchat);
            console.log(chalk.white("------------------------------------------"));
        } else if (m.isGroup) {
            console.log(header);
            console.log(title);
            console.log(date);
            console.log(sender);
            console.log(device);
            console.log(jid);
            console.log(type);
            console.log(group);
            console.log(chat);
            console.log(idchat);
            console.log(chalk.white("------------------------------------------"));
        }
    }
//=========================================================
    
//=========================================================
// ============== REPLY
    global.m.reply = async function (teks, status = null, isLarger = false) {
        const nakanoninoRandom = getRandomThumb();
        const isPDF = typeof teks === 'object' && (teks.document || teks.mimetype === 'application/pdf');
        const statusKeys = ['error', 'denied', 'detectlink', 'detectbadword', 'detectbot', 'detectspam'];
        const isStatusKey = statusKeys.includes(status);
        const customThumbnail = isStatusKey ? (global.image.status[status] || nakanoninoRandom) : (status === true ? image.error : nakanoninoRandom);
        const contextInfo = {
            mentionedJid: typeof teks === 'string'
                            ? parseMention(teks)
                            : typeof teks?.caption === 'string'
                              ? parseMention(teks.caption + (teks.footer ? teks.footer : ''))
                              : typeof teks?.text === 'string'
                                ? parseMention(teks.text)
                                : [],
            externalAdReply: {
                mediaUrl: "https://www.youtube.com/",
                mediaType: 1,
                previewType: isPDF ? "NONE" : "PHOTO",
                renderLargerThumbnail: isLarger === true,
                title:
                    status === 'error' || status === true
                        ? "Duh... error lagi dan lagi~ bisa nggak sih mikirin betapa capeknya aku!? 😭"
                        : status === 'denied'
                            ? "🚫 AKSES DITOLAK"
                            : status === 'detectlink'
                                ? "🔗 TERDEKSI LINK"
                                : status === 'detectbadword'
                                    ? "💬 TERDEKSI BADWORD"
                					: status === 'detectbot'
                						? "🤖 TERDEKSI BOT"
                                    	: status === 'detectspam'
                							? "💢 TERDEKSI SPAM"
                							: botName,
                body:
                    status === 'denied' || status === 'detectlink' || status === 'detectbadword' || status === 'detectbot' || status === 'detectspam' 
                        ? ""
                        : status === 'error' || status === true
                            ? "❌ ERROR | エラー"
                            : desc,
                thumbnail: customThumbnail,
                sourceUrl:
                    status === 'denied' || status === 'detectlink' || status === 'detectbadword' || status === 'detectbot' || status === 'detectspam' 
                        ? ""
                        : (status === 'error' || status === true ? "" : sosmed.website)
            }
        };
        if (typeof teks === "string") {
            await wbk.sendMessage(m.chat, {
                text: teks,
                contextInfo
            }, { quoted: m });
        } else if (typeof teks === "object" && teks !== null) {
            teks.contextInfo = { ...contextInfo, ...(teks.contextInfo || {}) };
            await wbk.sendMessage(m.chat, teks, { quoted: m });
        }
    };

    async function newReply(teks, isError = false) {
        const nakanoninoRandom = getRandomThumb()
        const isPDF = typeof teks === 'object' && (teks.document || teks.mimetype === 'application/pdf');
        wbk.sendMessage(m.chat, {
            contextInfo: {
                mentionedJid: [m.sender],
                /*forwardingScore: 999999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.sosmed.idchwa,
                    newsletterName: global.wm,
                },*/
                externalAdReply: {
                    showAdAttribution: true,
                    mediaUrl: "https://www.youtube.com/",
                    mediaType: 1,
                    previewType: isPDF ? "NONE" : "PHOTO",
                    title: isError ? "Duh... error lagi dan lagi~ bisa nggak sih mikirin betapa capeknya aku!? 😭" : botName,
                    body: isError ? "❌ ERROR | エラー" : desc,
                    thumbnail: isError ? image.error : nakanoninoRandom,
                    sourceUrl: isError ? "" : sosmed.website,
                    renderLargerThumbnail: false
                }
            },
            text: teks,
        }, { quoted: m });
    }

    async function newReplyBot(teks) {
        wbk.sendMessage(m.chat, {
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.sosmed.idchwa,
                    newsletterName: "Runtime: " + runtime(process.uptime()),
                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: wm,
                    body: desc,
                    previewType: "PHOTO",
                    thumbnail: nakanonino,
                    sourceUrl: global.website,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            },
            text: teks,
            ai: !m.isGroup
        }, { quoted: ftroli });
    }
//=========================================================
    
//=========================================================
// ============== WELCOME MESSAGE
    if (budy && !m.isNewsletter) {
        if (!m.isGroup && isCmd && !m.key.fromMe) {
            db.data.messages[m.sender].lastchat = new Date().getTime();
        }
        if (!m.isGroup && !isCmd && !m.key.fromMe) {
            const lastInteraction = new Date().getTime() - db.data.messages[m.sender].lastchat;
            if (lastInteraction > 21600000) {
                db.data.messages[m.sender].lastchat = new Date().getTime();
                let welcomeText = `🌸 Hai @${m.sender.split("@")[0]}, selamat datang di WhatsApp Bot ${litespace("Nakano Nino")}!
Aku Nino, yang kedua dari kembar lima. Senang bisa menyambutmu di sini~ ✨

Kalau kamu butuh bantuan, tinggal bilang saja ya. Aku akan berusaha membantumu semampuku. Jangan sungkan, aku tidak seketus kelihatannya kok 🫶, oh iya kalau kamu butuh owner ketik ${litespace("#owner")} yaaa @${global.creator.split("@")[0]}.

Ketik saja ${litespace("#menu")} untuk mulai eksplorasi fitur-fitur bot ini.
Jangan lupa istirahat yang cukup dan jaga kesehatan ya! 🌼`;
                const buttonIOS = {
		            text: welcomeText + '\n\n> Mohon maaf, beberapa fitur tidak berfungsi sebagaimana mestinya pada device iPhone.',
		            footer: wm,
		            buttons: [
		                { buttonId: `.menu`, buttonText: { displayText: '🎁 Menu Utama' }, type: 1 },
		                { buttonId: `.daftar`, buttonText: { displayText: '🛃 Daftar Sekarang' }, type: 1 },
		                { buttonId: `.owner`, buttonText: { displayText: '📞 Hubungi Owner' }, type: 1 }
		            ],
		            viewOnce: true
		        };
                const button = [{
                    "name": "single_select",
                    "buttonParamsJson": JSON.stringify({
                        "title": "📌 Pilih Opsi",
                        "sections": [{
                            "title": "🔹 Opsi Menu",
                            "rows": [{
                                    "header": "🎁 Menu Utama",
                                    "title": "Lihat semua fitur keren yang tersedia! 🌟",
                                    "id": `${prefix}menu`
                                },
                                {
                                    "header": "🛃 Daftar Sekarang",
                                    "title": "Gabung untuk akses fitur premium! 🎟️",
                                    "id": `${prefix}daftar`
                                },
                                {
                                    "header": "📞 Hubungi Owner",
                                    "title": "Butuh bantuan? Hubungi owner di sini! 💬",
                                    "id": `${prefix}owner`
                                }
                            ]
                        }]
                    })
                }];
                if (m.device === "ios") { // welcome pengguna iphone (chat pribadi)
                    wbk.sendMessage(m.chat, buttonIOS, { quoted: ftroli });
                } else if (m.device === 'android') { // welcome pengguna android (chat pribadi)
                    sendButtonText(wbk, m.chat, button, welcomeText, global.footer, ftroli);
                }
            }
        }
    }
//=========================================================
    
//=========================================================
	if (isCmd) {
        if (db.data.settings[botNumber].onlyregister) {
            if (!(command === "daftar") && !isCreator) {
                if (!db.data.users[m.sender].register) {
                    const regMessage = "⚠️ Hai kak! Sepertinya Kamu belum terdaftar. Yuk daftar terlebih dahulu dengan mengetik *.daftar* lalu selesaikan pendaftaran untuk mengakses fitur ini.";
                    return m.reply({
                        text: regMessage,
                        footer: wm,
                        buttons: [{
                            buttonId: prefix + 'daftar',
                            buttonText: { displayText: "📄 Daftar" }
                        }],
                        headerType: 1,
            			viewOnce: true,
                    });
                }
            }
        }
    }
//=========================================================
  
//=========================================================
    if (/^[0-9a-f]{6}$/i.test(body?.trim()) && !isCmd && !command) {
        const user = db.data.users[m.sender];
        const inputCode = body.trim();
        const correctCode = user.verifNumber;
        await m.react('🕛')
        if (user.register) return m.reply(`Hah?! Kamu itu... udah masukin kode verifikasi tadi, ngapain dimasukin lagi sih?! 😤. Coba cek pakai *${prefix}profile* biar kamu inget!`);
        if (!user.cekRegister) return m.reply(`Hah?! Kamu itu... emang kamu sudah ngisi form *${prefix}register*?! 😤`, 'denied');
        if (
            typeof correctCode !== 'string' || !correctCode.trim() || inputCode !== correctCode
        ) {
            return m.reply('⚠️ Kode verifikasi salah. Pastikan kamu memasukkan kode yang benar.');
        }
        user.register = true;
        user.cekRegister = false;
        user.limit += 20;
        user.point += 5000;
        const textReply = `Hmm... baiklah! Aku sudah daftarkan kamu! Jangan bikin aku nyesel ya!

📝 Nama: *${user.name}*
🎂 Umur: *${user.age} tahun*

Dan ya, ini hadiahnya... jangan salah gunakan ya!
🎁 Hadiah:
• 20 Limit (Jangan habisin buat hal aneh!)
• 5000 Point (Belanjain yang bener!)

Gunakan *${prefix}profile* biar kamu bisa liat datamu. Jangan lupa, aku bakal ngawasin!`;
        async function generateImage({ profilePicUrl }) {
            const image = await new canvafy.WelcomeLeave()
                .setAvatar(profilePicUrl)
                .setBackground("image", "https://i.ibb.co.com/Psmf4Rq2/hdvcdik-vdah.png")
                .setTitle((m.pushName.length > 17 ? m.pushName.slice(0, 17) + "..." : m.pushName))
                .setDescription("Selamat datang di " + global.botName + " ya~")
                .setBorder("#2a2e35")
                .setAvatarBorder("#2a2e35")
                .setOverlayOpacity(0.3)
                .build();
            return image;
        }
        const profilePic = await wbk.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co.com/3yWBMTsk/51e1c1fc6f50743937e62fca9b942694-t.jpg');
        const buffer = await generateImage({ profilePicUrl: profilePic });
        await wbk.sendMessage(m.chat, {
            text: textReply,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: 'Ingat ya, aku bakal ngawasin kamu, jadi jangan macam-macam!',
                    body: 'Selamat ya~',
                    thumbnail: buffer,
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: fkontak })
        await m.react('👤')
    }
//=========================================================
    
//=========================================================
// ============== AUTO SHOLAT
    wbk.autosholat = wbk.autosholat ? wbk.autosholat : {};
    if (!m.isNewsletter) {
        if (!(m.chat in wbk.autosholat)) {
            const res = await axios.get('https://api.aladhan.com/v1/timingsByCity?city=Jember&country=Indonesia&method=8');
            const data = res.data;
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
                        let teks = `📣 *Waktu Sholat ${namaSholat[sholat]} untuk Wilayah Jember dan Sekitarnya Telah Tiba!* 🕌\n\n`;
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
                                        body: 'Jember, Jawa Timur, Indonesia',
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
//=========================================================
    
//=========================================================
// ============== PUBLIC / SELF
    if (!wbk.public) {
        if (!isCreator && !m.key.fromMe) {
            return m.reply({ text: `${litespace("SELF MODE")}\n> Eeh? 😒 Bot-nya lagi mode self nih... Jadi cuma owner yang bisa make. Kamu tunggu aja yaa~ jangan nyeleneh dulu deh~ 😤💢` });
        }
    }
//=========================================================
    
//=========================================================
// ============== PENMABAHAN TOTAL HIT, CHAT USER
    if (isCmd && command) {
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        if (!freqCommand[m.sender]) {
            freqCommand[m.sender] = {};
        }
        if (freqCommand[m.sender][command.toLowerCase()]) {
            freqCommand[m.sender][command.toLowerCase()].count += 1;
            freqCommand[m.sender][command.toLowerCase()].lastUsed = now;
        } else {
            freqCommand[m.sender][command.toLowerCase()] = {
                count: 1,
                lastUsed: now
            };
        }
        fs.writeFileSync(path.join(__dirname, '../src/data/function/frequentlycommand.json'), JSON.stringify(freqCommand, null, 2));
        db.data.settings[botNumber].totalhit += 1;
        db.data.messages[m.sender].allchat += 1;
    }
//=========================================================
    
//=========================================================
// ============== SETTING AUTO
	if (db.data.settings[botNumber].autoread) {
        wbk.readMessages([m.key]);
    }

    if (db.data.settings[botNumber].autorecordtype) {
        if (command) {
            let mix = ['composing', 'recording'];
            let mix2 = mix[Math.floor(mix.length * Math.random())];
            wbk.sendPresenceUpdate(mix2, m.chat);
        }
    }

    if (db.data.settings[botNumber].autorecord) {
        if (command) {
            let mix = ['recording'];
            let mix2 = mix[Math.floor(mix.length * Math.random())];
            wbk.sendPresenceUpdate(mix2, m.chat);
        }
    }

    if (db.data.settings[botNumber].autotype) {
        if (command) {
            let pos = ['composing'];
            wbk.sendPresenceUpdate(pos, m.chat);
        }
    }

    if (db.data.settings[botNumber].autobio) {
        const status = `${botName} Online: ${runtime(process.uptime())}`;
        wbk.updateProfileStatus(status).catch(_ => _);
    }
//=========================================================
    
//=========================================================
    if (db.data.settings[botNumber].antispam && isCmd) {
        if (m.sender !== global.creator) {
            const spam = checkAntiSpam(m.sender)
            const spamBanned = `${litespace("SPAM DETECTED")}\n> 😡 Hah?! Kamu dibanned dulu ya! Tunggu *${(spam.banTimeLeft / 1000).toFixed(1)} detik* lagi baru boleh ngomong sama aku lagi~! Jangan bikin aku kesal terus dong~! 😤💥`
            const spamcooldown = `${litespace("SPAM DETECTED")}\n> Eh?! Kok cepet banget? Tunggu dulu lah *${(spam.waitTime / 1000).toFixed(1)} detik* lagi ya~ Aku juga butuh napas tau! 😩✨`
            const spambantrigerred = `${litespace("SPAM DETECTED")}\n> 😤 Ihh! Kamu tuh spam terus sih! Makanya dibanned dulu sementara~ Tunggu yaa nanti coba lagi aja, jangan ngeyel! 💢⏳`
            if (spam.status === 'banned') {
                return m.reply(spamBanned, 'detectspam')
            }
            if (spam.status === 'cooldown') {
                return m.reply(spamcooldown, 'detectspam')
            }
            if (spam.status === 'ban_triggered') {
                return m.reply(spambantrigerred, 'detectspam')
            }
        }
    }
    
    if (!m.isGroup && !m.key.fromMe && !isCreator && db.data.settings[botNumber].badword) { // private chat
        const forbiddenWords = [
            "colmek", "coli", "desah", "bokep", "tobrut", "seksi", "sex", "sexy",
            "memek", "kontol", "titit", "telanjang", "ngentod", "ngentot",
            "ngewe", "ewe", "ewean", "puki"
        ];
        const foundWords = forbiddenWords.filter(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(budy);
        });
        if (foundWords.length > 0) {
            let user = db.data.users[m.sender];
            if (!user.badword) user.badword = 0;
            user.badword += 1;
            const maxBadword = 5;
            const remaining = maxBadword - user.badword;
            if (user.badword >= maxBadword) {
                return m.reply(`${litespace("TERDETEKSI BADWORD")}\n\n🚫 Kamu sudah melanggar batas penggunaan kata kasar sebanyak ${maxBadword} kali.\nMaaf ya, kamu telah diblokir.\n> Unblock? @${global.creator.split("@")[0]}`, 'detectbadword');
                await sleep(5000);
                await wbk.updateBlockStatus(m.sender, 'block');
            }
            return m.reply(`${litespace("TERDETEKSI BADWORD")}\n\n🚫 Ups, kata berikut dilarang:\n- ${foundWords.map(w => w.replace(/[aeiou]/gi, '#')).join(', ')}\n\n⚠️ Peringatan: ${user.badword}/${maxBadword} (tersisa ${remaining} kali lagi sebelum diblokir!)`, 'detectbadword');
        }
    }
    
    if ( m.isGroup && !m.key.fromMe && !isCreator && db.data.chats[m.chat].antibadword?.check ) {
        const defaultWords = [
            "colmek", "coli", "desah", "bokep", "tobrut", "seksi", "sex", "sexy",
            "memek", "kontol", "titit", "telanjang", "ngentod", "ngentot",
            "ngewe", "ewe", "ewean", "puki"
        ];
        const customWords = db.data.chats[m.chat].antibadword?.text || [];
        const forbiddenWords = [...new Set([...defaultWords, ...customWords.map(w => w.trim().toLowerCase())])];
        const foundWords = forbiddenWords.filter(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(budy);
        });
        if (foundWords.length > 0) {
            let user = db.data.users[m.sender];
            if (!user.badword) user.badword = 0;
            user.badword += 1;
            const maxBadword = 5;
            if (user.badword >= maxBadword) return;
            const remaining = maxBadword - user.badword;
            const waktuDeteksi = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            const daftarBadword = foundWords
                .map((word, i) => `   ${i + 1}. ${word.replace(/[aeiou]/gi, '#')}`)
                .join('\n');
            const tindakan = (user.badword >= maxBadword && db.data.chats[m.chat].antibadword.kick)
                ? 'Pesan dihapus & pengguna dikick!'
                : 'Pesan dihapus!';
            const replyText = `*💬 TERDETEKSI BADWORD*\n\n` +
                `⏰ *Waktu Deteksi:* ${waktuDeteksi}\n` +
                `👤 *Pengirim:* @${m.sender.split('@')[0]}\n` +
                `💬 *Badword Terdeteksi:*\n${daftarBadword}\n` +
                `📜 *Alasan Deteksi:*\n- Terdapat kata kotor dalam pesan\n\n` +
                `-------------------------------\n` +
                `⛔ *TINDAKAN:* ${tindakan}\n` +
                `⚠️ Peringatan: ${user.badword}/${maxBadword} (tersisa ${remaining}x)`;
            await m.reply(replyText, 'detectbadword');
            if (user.badword >= maxBadword) {
                await wbk.updateBlockStatus(m.sender, 'block');
                user.badword = 0;
                return m.reply(`🚫 Pengguna *${m.sender.split('@')[0]}* telah diblokir karena melanggar batas badword (${maxBadword}x).\n\nUntuk unblock, hubungi @${global.creator.split("@")[0]}`, 'detectbadword');
                if (db.data.chats[m.chat].antibadword.kick === true) {
                    await sleep(5000);
                    await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
            }
            await wbk.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
        }
    }
    
    if (m.isGroup && !m.key.fromMe && !isCreator && db.data.chats[m.chat].antilink?.check) {
        const linkPatterns = [
          /\bhttps?:\/\/[^\s/$.?#].[^\s]*/gi, // http:// atau https://
          /\bwww\.[^\s]+\.[^\s]{2,}/gi,       // www.domain.ext
          /\b[a-z0-9-]+\.(co\.id|go\.id|ac\.id|sch\.id|or\.id|id|my\.id|web\.id)\b/gi, // domain Indonesia
          /\b[a-z0-9-]+\.(com|net|org|xyz|online|site|info|me|ly|gg)\b/gi              // domain lainnya
        ];
        let detectedLinks = linkPatterns.flatMap(pattern => budy.match(pattern) || []);
        detectedLinks = detectedLinks.filter(link =>
            !/tiktok\.com/i.test(link) && !/instagram\.com/i.test(link)
        );
        const containsLink = detectedLinks.length > 0;
        if (containsLink) {
            if (isAdmins || m.key.fromMe || isCreator) return;
            const waktuDeteksi = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            const daftarLink = detectedLinks
                .map((link, i) => `   ${i + 1}. ${link.replace(/\./g, '*')}`)
                .join('\n') || '-';
            const tindakan = db.data.chats[m.chat].antilink.kick === true
                ? 'Pesan dihapus & pengguna dikick!'
                : 'Pesan dihapus!';
            const replyText = `*🔗 TERDETEKSI LINK*\n\n` +
                `⏰ *Waktu Deteksi:* ${waktuDeteksi}\n` +
                `👤 *Pengirim:* @${m.sender.split('@')[0]}\n` +
                `📎 *Link Terdeteksi:*\n${daftarLink}\n` +
                `📜 *Alasan Deteksi:*\n` +
                `- Terdapat link dalam pesan\n\n` +
                `-------------------------------\n` +
                `⛔ *TINDAKAN:* ${tindakan}`;
            await m.reply(replyText, 'detectlink');
            await wbk.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            if (db.data.chats[m.chat].antilink.kick === true) {
                await sleep(5000)
                await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
    
    if (m.isGroup && !m.key.fromMe && !isCreator && db.data.chats[m.chat].antistatusmention?.check) {
        if (m.mtype === 'groupStatusMentionMessage') {
            const tindakan = db.data.chats[m.chat].antistatusmention.kick === true
                ? 'Pesan dihapus & pengguna dikick!'
                : 'Pesan dihapus!';
            const waktuDeteksi = new Date().toLocaleString();
            const replyText = `*🏷️ TERDETEKSI TAG MENTION*\n\n` +
                `⏰ *Waktu Deteksi:* ${waktuDeteksi}\n` +
                `👤 *Pengirim:* @${m.sender.split('@')[0]}\n` +
                `📜 *Alasan Deteksi:*\n` +
                `- Telah melakukan tag mention status\n\n` +
                `-------------------------------\n` +
                `⛔ *TINDAKAN:* ${tindakan}`;
            await m.reply(replyText);
            await wbk.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            if (db.data.chats[m.chat].antistatusmention.kick === true) {
                await sleep(5000)
                await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
    
    if (m.isGroup && !m.key.fromMe && !isCreator && db.data.chats[m.chat].antibot?.check) {
        const keyId = m.key?.id || "";
        const waktuDeteksi = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        const validLengths = [20, 22, 32];
        const isLengthInvalid = !validLengths.includes(keyId.length);
        const isFormatInvalid = /[^a-fA-F0-9]/.test(keyId);
        const isPrefixBot = keyId.toUpperCase().startsWith("3EB0") || keyId.toUpperCase().startsWith("BAE5");
        const isBotSuspect = isLengthInvalid || isFormatInvalid || isPrefixBot;
        if (isBotSuspect) {
            const alasanList = [];
            if (isLengthInvalid) {
                alasanList.push(`- Panjang ID tidak valid (dapat: ${keyId.length}, harus: ${validLengths.join(', ')})`);
            }
            if (isFormatInvalid) {
                alasanList.push(`- Format Invalid: ID mengandung karakter non-heksadesimal`);
            }
            if (isPrefixBot) {
                alasanList.push(`- Prefix Bot: ID diawali dengan prefix mencurigakan (${keyId.slice(0, 4)})`);
            }
            const tindakan = db.data.chats[m.chat].antibot.kick === true
                ? 'Pesan dihapus & pengguna dikick!'
                : 'Pesan dihapus!';
            const alasan = alasanList.join('\n');
            const replyText = `*🤖 DETEKSI BOT*\n\n` +
                `⏰ *Waktu Deteksi:* ${waktuDeteksi}\n` +
                `🤖 *Pengirim:* @${m.sender.split('@')[0]}\n` +
                `🔑 *Key ID:* ${keyId}\n` +
                `📏 *Jumlah Karakter ID:* ${keyId.length}\n` +
                `🚨 *Terdeteksi Sebagai:* Bot\n` +
                `📜 *Alasan Deteksi:*\n${alasan}\n\n` +
                `-------------------------------\n` +
                `⛔ *TINDAKAN:* ${tindakan}`;
            await m.reply(replyText, 'detectbot');
            await wbk.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            if (db.data.chats[m.chat].antibot.kick === true) {
                await sleep(5000);
                await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
//=========================================================
    
//=========================================================
    const { checkError, addError, addblockcmd, isCommandBlocked, Failed } = require('../lib/handler/error');
    const { pluginsLoader } = require('../lib/handler/loader');
    const plug = {
        m, wbk, isCreator, command, isCmd, text, quoted,
        args, prefix, mime, budy, isOwner: isCreator, isPremium, 
        isGroup, isPrivate, mime, botNumber
    };
    global.fail = (type, m = {}) => {
        const message = global.mess[type] || '⚠️ Akses ditolak!';
        if (typeof m.reply === 'function') {
            m.reply(message, 'denied');
        } else {
            console.log(`[FAIL MESSAGE]: ${message}`);
        }
    };
    global.plugins = await pluginsLoader(path.join(__dirname, './plugins'));
    for (let name in global.plugins) {
        const plugin = global.plugins[name];
        if (!plugin || plugin.disabled) continue;
        const __filename = path.join(__dirname, 'plugins', ...name.split('/'));
        if (typeof plugin.all === 'function') {
            try {
                await plugin.all.call(wbk, m, { chatUpdate, __dirname, __filename });
            } catch (e) {
                console.error(e);
            }
        }
        if (!m.text) continue;
        const str2Regex = str => str?.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') || '';
        const _prefix = plugin.customPrefix || prefix;
        const match = (
            _prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]] :
            Array.isArray(_prefix) ? _prefix.map(p => {
                let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                return [re.exec(m.text), re];
            }) :
            typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
            [[[], new RegExp]]
        )?.find(p => p[1]);
        if (!match) continue;
        const usedPrefix = (match?.[0]?.[0]) || prefix;
        const noPrefix = (m.text || '').replace(usedPrefix, '');
        const _args = noPrefix.trim().split(/\s+/).slice(1);
        const text = q;
        let isAccept = false;
        if (plugin.command instanceof RegExp) {
            isAccept = plugin.command.test(command);
        } else if (Array.isArray(plugin.command)) {
            isAccept = plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command);
        } else if (typeof plugin.command === 'string') {
            isAccept = plugin.command === command;
        }
        if (!isAccept) continue;
        m.plugin = name;
        const fail = plugin.fail || global.fail;
        const user = db.data.users[m.sender];
        if (plugin.owner && !isCreator) { fail('owner', m); break; }
        if (plugin.premium && !isPremium) { fail('premium', m); break; }
        if (plugin.group && !m.isGroup) { fail('group', m); break; }
        if (plugin.botAdmin && !isBotAdmins) { fail('botAdmin', m); break; }
        if (plugin.admin && !isAdmins) { fail('admin', m); break; }
        if (plugin.private && m.isGroup) { fail('private', m); break; }
        if (plugin.rpg && !db.data.users[m.sender]?.rpg) { fail('rpg', m); break; }
        if (plugin.limit && !isCreator) {
            const userLimit = user?.limit || 0;
            if (userLimit < 1) {
                fail('limit', m);
                break;
            }
        }
        const fullPluginPath = path.join('plugins', ...name.split('/'));
        const isOfficialGroup = m.isGroup && m.chat === global.sosmed.idgcwa;
        try {
            await plugin.call(wbk, m, plug);
            if (plugin.limit && !isCreator && !isOfficialGroup) {
            //if (plugin.limit && !isCreator) {
                if (typeof db.data.users[m.sender].limit !== 'number') {
                    db.data.users[m.sender].limit = 0;
                }
                db.data.users[m.sender].limit -= 1;

                if (db.data.users[m.sender].limit <= 0) {
                    m.reply(global.mess.limit);
                } else if (db.data.users[m.sender].limit < 5) {
                    m.reply(`⚠️ Sisa limit kamu tinggal ${db.data.users[m.sender].limit}. Gunakan dengan bijak ya!`);
                }
            }
        } catch (err) {
            const e = util.format(err);
            console.error(`[PLUGIN ERROR] ${plugin.command} | ${fullPluginPath}`);
            if (isCommandBlocked(command, fullPluginPath)) {
                return m.reply(`⚠️ *Fitur ${command}* telah di *block* karena error.\n> Owner akan melakukan perbaikan pada fitur tersebut.`, 'error');
            }
            m.reply(`Y-ya ampun... error lagi... 😔${readmore} Udah aku laporin ke owner kok... Jadi tunggu aja... Tapi jangan manja terus gini dong!\n${readmore}\n\`\`\`${e}\`\`\``, 'error');
            if (isCmd) await Failed(command, fullPluginPath, err.message || e, m, wbk);
            addError(err.message, command, fullPluginPath, m.sender, m.isGroup ? 'group chat' : 'private chat', 'error');
            if (autoblockcmd) {
                addblockcmd(command, fullPluginPath);
            }
        } finally {
            if (typeof plugin.after === 'function') {
                try {
                    await plugin.after.call(wbk, m, plug);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        break;
    }
//=========================================================
    
//=========================================================
switch (command) {
//=========================================================
case "unreg": {
    db.data.users[m.chat].register = false;
}
break;

case "self": {
    // category: "owner"
    if (!isCreator) return m.reply(global.mess.owner);
    wbk.public = false;
    m.reply(`Bot sekarang dalam mode *Self Usage* aja, jadi gak bisa dipakai oleh orang lain ya!`);
}
break;

case "public": {
    // category: "owner"
    if (!isCreator) return m.reply(global.mess.owner);
    wbk.public = true;
    m.reply(`Bot sekarang kembali ke mode *Public Usage*, jadi bisa dipakai semua orang!`);
}
break;
        
case "owner": {
    // category: "main"
    await m.reply({ 
        contacts: { 
            displayName: ownerName, 
            contacts: [{
                "displayName": "WBK",
                "vcard": `BEGIN:VCARD
VERSION:3.0
FN:${global.ownerName}
N:${global.ownerName}
TEL;type=Telepon;waid=${global.ownerNumber}:${global.ownerNumber}
X-WA-BIZ-DESCRIPTION:${global.desc}
X-WA-BIZ-NAME:${global.ownerName}
END:VCARD`
            }] 
        }
    });
}
break
        
case 'request': {
    // category: "main"
	if (!text) return newReply(`Contoh: ${prefix + command} halo kak, aku mau request fitur download music`);
	textt = `*| REQUEST |*`;
	teks1 = `\n\n*User* : @${m.sender.split("@")[0]}\n*Request* : ${text}`;
	teks2 = `\n\n*Hii ${m.pushname}, permintaan kamu sudah dikirim ke pemilik aku, tunggu sebentar ya...*`;
	wbk.sendMessage(global.creator, {
		text: textt + teks1,
		mentions: [m.sender],
	}, { quoted: m });
	m.reply({
		text: textt + teks2 + teks1
	});
}
db.data.settings[botNumber].totalhit += 1;
break;
        
case 'join': {
    if (!text) return newReply(`Kirim perintah ${prefix + command} _link group_`);
	let teks = `「 *JOIN GROUP* 」\n\n${text}\n`;
    let link = text;
    const button = [{
        name: "cta_reply",
        buttonParamsJson: `{
          "display_text": "Halo",
          "id": ".menu all"
        }`
      }];
    let image = global.image.avatar;
    sendButtonImage(wbk, m.chat, image, button, teks, global.footer, m);  
}
break;
        

        
        
//=========================================================
default:
//=========================================================
        
if (['bot', 'permisi', 'kak', 'test', 'tes'].some(keyword => budy.startsWith(keyword))) {
    try {
        return newReplyBot("Online, Siap Membantu🤖\n🤖Runtime: " + runtime(process.uptime()));
    } catch (e) {
        return newReplyBot(e);
    }
}

if (budy.startsWith('=>')) {
	if (!isCreator) return m.react('⚠️');
	if (isBot) return m.react('⚠️');
	await m.react('⏱️');
	function Return(sul) {
		sat = JSON.stringify(sul, null, 2)
		bang = util.format(sat)
		if (sat == undefined) {
			bang = util.format(sul)
		}
		m.react('✅');
		return newReply(bang)
	}
	try {
		newReply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
	} catch (e) {
		newReply(String(e))
	}
};

if (budy.startsWith('>')) {
	if (!isCreator) return m.react('⚠️');
	if (isBot) return m.react('⚠️');
	try {
		await m.react('⏱️');
		let evaled = await eval(budy.slice(2))
		if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
		m.react('✅');
		await newReply(evaled)
	} catch (err) {
		await newReply(String(err))
	}
};

if (budy.startsWith('$')) {
	if (!isCreator) return m.react('⚠️');
	if (isBot) return m.react('⚠️');
	await m.react('⏱️');
	exec(budy.slice(2), (err, stdout) => {
		m.react('✅');
		if (err) return m.reply(err)
		if (stdout) return m.reply(stdout)
	})
};    

}
} catch (err) {
    logMessage("🔴  Error on Case 🔴", `${util.format(err)}`)
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});