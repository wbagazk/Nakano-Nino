//=========================================================
// BAILEYS
const { downloadContentFromMessage, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, InteractiveMessage, getContentType, delay, getDevice, getBinaryNodeChild, getBinaryNodeChildren, getBinaryNodeChildString, baileys, isLidUser, S_WHATSAPP_NET } = require('baileys-pro');
//=========================================================

//=========================================================
// MODULE
const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const cron = require('node-cron');
const fetch = require('node-fetch');
const speed = require('performance-now');
const PhoneNumber = require('awesome-phonenumber');
const readmore = String.fromCharCode(8206).repeat(4001);
const { exec, execSync, spawn } = require("child_process");
const { randomBytes } = require('crypto');
//=========================================================

//=========================================================
require('../settings/settings')
const fakeQuoted = require('../utils/fakeQuoted');
const ucapanWaktu= require('../utils/getUcapanWaktu');
const { loadingBar } = require('../utils/loadingbar');
const { checkAntiSpam, resetSpam } = require('../utils/antispam')
const { addAfkUser, checkAfkUser, getAfkId, getAfkPosition, getAfkReason, getAfkTime } = require('../utils/afk');
const { addSewaGroup, getSewaExpired, getSewaPosition, checkSewaExpired, checkSewaGroup, getAllSewaGroups } = require('../utils/sewa');
const { gameSlot, gameCasinoSolo, gameMerampok, daily, transferLimit, transferUang, buy, setUang, setLimit } = require('../utils/game');
const { addPremiumUser, checkPremiumUser, expiredCheck, getAllPremiumUser, getPremiumExpired, getPremiumPosition } = require('../utils/premium');
const { smsg, await, clockString, enumGetKey, fetchBuffer, fetchJson, format, formatDate, formatp, generateProfilePicture, getBuffer, getGroupAdmins, getRandom, isUrl, json, logic, msToDate, parseMention, runtime, sleep, sort, toNumber, monospace, litespace, toRupiah, pickRandom, capitalizeWords, generateRandomHexName, getRandomInt, formatDateToIndonesia, formatNumber, formatDuration, formatBytes, decodeJid } = require('../utils/myfunc');
//=========================================================

//=========================================================
// ============== BACA DB JSON
let sewa = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/sewa.json')));
let owner = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/owner.json')));
let afk = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/afk.json')));
let premium = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/premium.json')));
let banned = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/banned.json')));
let antinsfw = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/nsfw.json')));
let contacts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/contacts.json')));
let userActivity = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/user.json')));
let badword = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/badword.json')));
let blacklist = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/blacklist.json')));
let whitelist = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/whitelist.json')));
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
    const pushname = m.pushName || "No Name"
    const text = q = args.join(" ");
    const getQuoted = (m.quoted || m);
    const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || '';
    const qmsg = (quoted.msg || quoted);
    const isMedia = /image|video|sticker|audio/.test(mime);
    const isText = (type == 'textMessage');
    const isImage = (type == 'imageMessage');
    const isVideo = (type == 'videoMessage');
    const isAudio = (type == 'audioMessage');
    const isContact = (type == 'contactMessage');
    const isSticker = (type == 'stickerMessage');
    const isDocument = (type == 'documentMessage');
    const isLocation = (type == 'locationMessage');
    const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage');
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
    const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
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
    const isBan = banned.includes(m.sender);
    const AntiNsfw = m.isGroup ? antinsfw.includes(m.chat) : false
    const clientId = wbk.user.id.split(':')[0];
    const senderbot = m.key.fromMe ? wbk.user.id.split(':')[0] + "@s.whatsapp.net" || wbk.user.id : m.key.participant || m.key.remoteJid;
    const senderId = senderbot.split('@')[0];
    const isBot = clientId.includes(senderId);
    const isSewa = checkSewaGroup(m.chat);
    const isBlacklist = blacklist.includes(m.sender);
    const isWhitelist = whitelist.includes(m.sender);
    const isAfkOn = checkAfkUser(m.sender, afk)
    const isUser = userActivity.includes(m.sender);
    const isVip = db.data && db.data.users && db.data.users[m.sender] ? db.data.users[m.sender].vip : false;
    const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isPremium = isCreator || checkPremiumUser(m.sender, premium);
    expiredCheck(wbk, m, premium);
    checkSewaExpired(wbk);
    let timestamp = speed();
    let latensi = speed() - timestamp;
    let usernomor = await PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international');
    let ownnomor = await PhoneNumber('+' + ownerNumber.replace('@s.whatsapp.net', '')).getNumber('international');
    const { fconver, fmen, fbot, fkontak, ftroli, fevent } = fakeQuoted(m, pushname, usernomor, botName, wm);
//=========================================================
    
//=========================================================
// ============== DATABASE
    try {
        let user = db.data.users[m.sender] || {};
        if (typeof user !== "object") db.data.users[m.sender] = {};
        if (!("register" in user)) user.register = false;
        if (!("serialNumber" in user)) user.serialNumber = randomBytes(16).toString("hex");
        if (!("chatuser" in user) || typeof user.chatuser !== "number" || isNaN(user.chatuser)) user.chatuser = 0;
        if (!("name" in user)) user.nama = "User";
        if (!("nickname" in user)) user.nickname = wbk.getName(m.sender);
        if (!("limit" in user) || typeof user.limit !== "number" || isNaN(user.limit)) user.limit = user.vip ? global.limit.vip : isPremium ? global.limit.premium : global.limit.free;
        if (!("point" in user)) user.point = user.vip ? global.point.vip : isPremium ? global.point.premium : global.point.free;
        if (!("saldo" in user) || typeof user.saldo !== "number" || isNaN(user.saldo)) user.saldo = 0;
        if (!isPremium) user.premium = false;
        if (!("vip" in user)) user.vip = false;
        if (!("rpg" in user)) user.rpg = false;
        if (!("badword" in user)) user.badword = 0;
        if (!("pacar" in user)) user.pacar = '';
        if (!("askot" in user)) user.askot = '';
        if (!("umur" in user) || typeof user.umur !== "number" || isNaN(user.umur)) user.umur = 0;
        if (!("status_deposit" in user)) user.status_deposit = false;
        if (!("orderkuota" in user)) user.orderkuota = {
            msg: null,
            chat: null,
            idDeposit: null,
            amount: null,
            exp: null
        };
        if (!("atlantic" in user)) user.atlantic = {
            msg: null,
            chat: null,
            idDeposit: null,
            amount: null,
            exp: null
        };
        db.data.users[m.sender] = user;
        
        let chats = db.data.chats[m.chat] || {};
        if (typeof chats !== "object") db.data.chats[m.chat] = {};
        if (!("badword" in chats)) chats.badword = false;
        if (!("antiforeignnum" in chats)) chats.antiforeignnum = false;
        if (!("antiviewonce" in chats)) chats.antiviewonce = false;
        if (!("autoaipc" in chats)) chats.autoaipc = false;
        if (!("autoaigc" in chats)) chats.autoaigc = false;
        if (!("antibot" in chats)) chats.antibot = false;
        if (!("antispam" in chats)) chats.antispam = false;
        if (!("antimedia" in chats)) chats.antimedia = false;
        if (!("antiimage" in chats)) chats.antiimage = false;
        if (!("antivideo" in chats)) chats.antivideo = false;
        if (!("antiaudio" in chats)) chats.antiaudio = false;
        if (!("antisticker" in chats)) chats.antisticker = false;
        if (!("anticontact" in chats)) chats.anticontact = false;
        if (!("antilocation" in chats)) chats.antilocation = false;
        if (!("antidocument" in chats)) chats.antidocument = false;
        if (!("welcome" in chats)) chats.welcome = false;
        if (!("antilink" in chats)) chats.antilink = false;
        if (!("antilinkgc" in chats)) chats.antilinkgc = false;
        if (!("mute" in chats)) chats.mute = false;
        if (!("liststore" in chats)) chats.liststore = {};
        db.data.chats[m.chat] = chats;
        
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
        if (!("rank" in rpgUser)) rpgUser.rank = 0;
        if (!("level" in rpgUser)) rpgUser.level = 0;
        if (!("kapal" in rpgUser )) rpgUser.kapal = false;
        if (!("darahkapal" in rpgUser )) rpgUser.darahkapal = 100;
        if (!("pickaxe" in rpgUser )) rpgUser.pickaxe = false;
        if (!("darahpickaxe" in rpgUser )) rpgUser.darahpickaxe = 100;
        if (!("kapak" in rpgUser )) rpgUser.kapak = false;
        if (!("darahkapak" in rpgUser )) rpgUser.darahkapak = 100;
        if (!("bzirah" in rpgUser )) rpgUser.bzirah = false;
        if (!("darahbzirah" in rpgUser )) rpgUser.darahbzirah = 100;
        if (!("pedang" in rpgUser )) rpgUser.pedang = false;
        if (!("darahpedang" in rpgUser )) rpgUser.darahpedang = 100;
        if (!("darahuser" in rpgUser )) rpgUser.darahuser = 100;
        if (!("rumah" in rpgUser )) rpgUser.rumah = 0;
        if (!("besi" in rpgUser )) rpgUser.besi = 4;
        if (!("kayu" in rpgUser )) rpgUser.kayu = 2;
        if (!("emas" in rpgUser )) rpgUser.emas = 0;
        if (!("perak" in rpgUser )) rpgUser.perak = 0;
        if (!("batubara" in rpgUser )) rpgUser.batubara = 0;
        if (!("bulu" in rpgUser )) rpgUser.bulu = 0;
        if (!("kain" in rpgUser )) rpgUser.kain = 0;
        if (!("wilayah" in rpgUser )) rpgUser.wilayah = "Indonesia";
        if (!("wilayahrumah" in rpgUser )) rpgUser.wilayahrumah = "Indonesia";
        if (!("musuh" in rpgUser )) rpgUser.musuh = 0;
        if (!("ikan" in rpgUser )) rpgUser.ikan = 0;
        if (!("domba" in rpgUser )) rpgUser.domba = 0;
        if (!("sapi" in rpgUser )) rpgUser.sapi = 0;
        if (!("ayam" in rpgUser )) rpgUser.ayam = 0;
        if (!("bank" in rpgUser )) rpgUser.bank = 0;
        if (!("burutime" in rpgUser )) rpgUser.burutime = 0;
        if (!("lastclaim" in rpgUser )) rpgUser.lastclaim = 0;
        if (!("lastdagang" in rpgUser )) rpgUser.lastdagang = 0;
        if (!("lastbansos" in rpgUser )) rpgUser.lastbansos = 0;
        if (!("lastkerja" in rpgUser )) rpgUser.lastkerja = 0;
        if (!("lastrampok" in rpgUser )) rpgUser.lastrampok = 0;
        db.data.rpg[m.sender] = rpgUser ;

        let setting = db.data.settings[botNumber] || {};
        if (typeof setting !== "object") db.data.settings[botNumber] = {};
        if (!("typemenu" in setting)) setting.typemenu = "v1";
        if (!("typereply" in setting)) setting.typereply = "v4";
        if (!("totalhit" in setting)) setting.totalhit = 0;
        if (!("totalError" in setting)) setting.totalError = 0;
        if (!("online" in setting)) setting.online = false;
        if (!("badword" in setting)) setting.safesearch = false;
        if (!("autosticker" in setting)) setting.autosticker = false;
        if (!("autodownload" in setting)) setting.autodownload = false;
        if (!("autobio" in setting)) setting.autobio = false;
        if (!("autoread" in setting)) setting.autoread = false;
        if (!("autorecordtype" in setting)) setting.autorecordtype = false;
        if (!("autorecord" in setting)) setting.autorecord = false;
        if (!("autotype" in setting)) setting.autotype = false;
        if (!("autoblocknum" in setting)) setting.autoblocknum = false;
        if (!("onlygc" in setting)) setting.onlygc = false;
        if (!("onlypc" in setting)) setting.onlypc = false;

        const watermark = {
            packname: global.packname,
            author: global.author
        };
        if (!("watermark" in setting)) setting.watermark = watermark;
        if (!("about" in setting)) {
            setting.about = {
                'bot': {
                    'nick': wbk.getName(botNumber),
                    'alias': botName
                },
                'owner': {
                    'nick': wbk.getName(ownerNumber + "@s.whatsapp.net"),
                    'alias': ownerNumber
                }
            };
        }
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
        let date = chalk.cyanBright(`${"📅  DATE".padEnd(20)} : ${new Date().toLocaleString("id-ID")}`);
        let sender = chalk.yellowBright(`${"🗣️  SENDERNAME".padEnd(21)} : ${m.pushName || botName}`);
        let type = chalk.whiteBright(`${"💬  Type".padEnd(20)} : ${m.mtype}`);
        let chat = chalk.whiteBright(`${"💬  Chat".padEnd(20)} : ${m.text}`);
        let jid = chalk.magentaBright(`${"👤  JIDS".padEnd(20)} : ${m.sender}`);
        let group = chalk.redBright(`${"🔍  GROUP LOCATION".padEnd(20)} : ${groupName}`);
        if (isCmd && !m.isGroup) {
            console.log(header);
            console.log(title);
            console.log(date);
            console.log(sender);
            console.log(jid);
            console.log(type);
            console.log(chat);
            console.log(chalk.white("------------------------------------------"));
        } else if (m.isGroup) {
            console.log(header);
            console.log(title);
            console.log(date);
            console.log(sender);
            console.log(jid);
            console.log(type);
            console.log(group);
            console.log(chat);
            console.log(chalk.white("------------------------------------------"));
        }
    }
//=========================================================
    
//=========================================================
// ============== REPLY
    global.m.reply = async function (teks, status = null, isLarger = false) {
        const nakanoninoRandom = getRandomThumb();
        const isPDF = typeof teks === 'object' && (teks.document || teks.mimetype === 'application/pdf');
        const statusKeys = ['error', 'denied'];
        const isStatusKey = statusKeys.includes(status);
        const customThumbnail = isStatusKey ? (global.image[status] || nakanoninoRandom) : (status === true ? image.error : nakanoninoRandom);
        const contextInfo = {
            mentionedJid: typeof teks === 'string'
                            ? parseMention(teks)
                            : typeof teks?.caption === 'string'
                              ? parseMention(teks.caption + (teks.footer ? teks.footer : ''))
                              : typeof teks?.text === 'string'
                                ? parseMention(teks.text)
                                : [],
            externalAdReply: {
                showAdAttribution: true,
                mediaUrl: "https://www.youtube.com/",
                mediaType: 1,
                previewType: isPDF ? "NONE" : "PHOTO",
                renderLargerThumbnail: isLarger === true,
                title:
                    status === 'error' || status === true
                        ? "Duh... error lagi dan lagi~ bisa nggak sih mikirin betapa capeknya aku!? 😭"
                        : status === 'denied'
                            ? "AKSES DITOLAK"
                            : botName,
                body:
                    status === 'denied'
                        ? ""
                        : status === 'error' || status === true
                            ? "❌ ERROR | エラー"
                            : desc,
                thumbnail: customThumbnail,
                sourceUrl:
                    status === 'denied'
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
                let welcomeText = `Halo Kak ${pushname}! 👋\n\nMohon diperhatikan! Nomor ini sekarang digunakan sebagai bot dan tidak lagi dikelola langsung oleh owner sebelumnya. Jika Kakak memiliki keperluan atau ingin menghubungi owner, silakan hubungi nomor terbaru berikut:\n\n📞 *wa.me/${ownerNumber}*\n\nBot ini siap membantu Kakak dengan berbagai fitur yang tersedia. Terima kasih atas perhatiannya. 😊`;
                const buttonIOS = {
		            text: welcomeText,
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
                    wbk.sendButtonText(m.chat, button, welcomeText, footer, ftroli);
                }
            }
        }
    }
//=========================================================
    
//=========================================================
// ============== AUTO SHOLAT
    /*wbk.autosholat = wbk.autosholat ? wbk.autosholat : {};
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
    }*/
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
    if (isCmd) {
        db.data.settings[botNumber].totalhit += 1;
        db.data.messages[m.sender].allchat += 1;
    }
//=========================================================
    
//=========================================================
    if (global.antispam && isCmd) {
        if (m.sender !== global.creator) {
            const spam = checkAntiSpam(m.sender)
            const spamBanned = `${litespace("SPAM DETECTED")}\n>😡 Hah?! Kamu dibanned dulu ya! Tunggu *${(spam.banTimeLeft / 1000).toFixed(1)} detik* lagi baru boleh ngomong sama aku lagi~! Jangan bikin aku kesal terus dong~! 😤💥`
            const spamcooldown = `${litespace("SPAM DETECTED")}\n> Eh?! Kok cepet banget? Tunggu dulu lah *${(spam.waitTime / 1000).toFixed(1)} detik* lagi ya~ Aku juga butuh napas tau! 😩✨`
            const spambantrigerred = `${litespace("SPAM DETECTED")}\n>😤 Ihh! Kamu tuh spam terus sih! Makanya dibanned dulu sementara~ Tunggu yaa, jangan ngeyel! 💢⏳`
            if (spam.status === 'banned') {
                return m.reply(spamBanned, 'denied')
            }
            if (spam.status === 'cooldown') {
                return m.reply(spamcooldown, 'denied')
            }
            if (spam.status === 'ban_triggered') {
                return m.reply(spambantrigerred, 'denied')
            }
        }
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
// ============== SETTING BADWORD
    if (db.data.settings[botNumber].badword && !m.isGroup && !m.key.fromMe && !isCreator) {
        const forbiddenWords = [
            "colmek", "coli", "desah", "bokep", "tobrut", "seksi", "sex", "sexy",
            "memek", "kontol", "titit", "telanjang", "ngentod", "ngentot",
            "ngewe", "ewe", "ewean", "puki"
        ];
        if (forbiddenWords.some(word => budy.toLowerCase().includes(word))) {
            let user = db.data.users[m.sender];
            if (!user.badword) user.badword = 0;
            user.badword += 1;
            const maxBadword = 5;
            const remaining = maxBadword - user.badword;
            if (user.badword >= maxBadword) {
                await wbk.updateBlockStatus(m.sender, 'block');
                return m.reply(`${litespace("TERDETEKSI BADWORD")}\n\n🚫 Kamu sudah melanggar batas penggunaan kata kasar sebanyak ${maxBadword} kali.\nMaaf ya, kamu telah diblokir\n> Unblock? @${global.creator.split("@")[0]}.`);
            }
            return m.reply(`${litespace("TERDETEKSI BADWORD")}\n\n🚫 Ups, kata tersebut dilarang digunakan pada bot ini ya, kak!\nMari ciptakan lingkungan yg positif dan nyaman. 😊\n\n⚠️ Peringatan: ${user.badword}/${maxBadword} (tersisa ${remaining} kali lagi sebelum diblokir!)`);
        }
    }
//=========================================================
    
//=========================================================
    const { checkError, addError, addblockcmd, isCommandBlocked, Failed } = require('../lib/handler/error');
    const { pluginsLoader, pluginsLoaderFunc } = require('../lib/handler/loader');
    const plug = {
        m, wbk, isCreator, command, isCmd, newReply, text, quoted,
        args, prefix, pushname: m.pushName, mime, budy,
        chats: db.data.chats[m.chat], users: db.data.users[m.sender],
        isBan, isOwner: isCreator, isVip, isPremium, isGroup, isPrivate, mime, botNumber,
        limit: db.data.users[m.sender].limit, proto, generateWAMessageContent,
        reaction: m.react, db, generateWAMessageFromContent
    };
    global.fail = (type, m = {}) => {
        const message = global.mess[type] || '⚠️ Akses ditolak!';
        if (typeof m.reply === 'function') {
            m.reply(message, 'denied');
        } else {
            console.log(`[FAIL MESSAGE]: ${message}`);
        }
    };
    const loaderFuncHandlers = await pluginsLoaderFunc(path.join(__dirname, './plugins/_event'));
    for (const customFn of loaderFuncHandlers) {
        try {
            await customFn(wbk, m, plug);
        } catch (e) {
            console.error('❌ Error di function:', e);
        }
    }
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
        if (plugin.botAdmin && !m.isBotAdmin) { fail('botAdmin', m); break; }
        if (plugin.admin && !m.isAdmin) { fail('admin', m); break; }
        if (plugin.private && m.isGroup) { fail('private', m); break; }
        if (plugin.nsfw && m.isGroup && !db.data.chats[m.chat]?.nsfw) { fail('nsfw', m); break; }
        if (plugin.rpg && !db.data.users[m.sender]?.rpg) { fail('rpg', m); break; }
        if (plugin.limit && !isCreator) {
            const userLimit = user?.limit || 0;
            if (userLimit < 1) {
                fail('limit', m);
                break;
            }
        }
        const fullPluginPath = path.join('plugins', ...name.split('/'));
        try {
            await plugin.call(wbk, m, plug);
            if (plugin.limit && !isCreator) {
                if (typeof db.data.users[m.sender].limit !== 'number') {
                    db.data.users[m.sender].limit = 0;
                }
                db.data.users[m.sender].limit -= 1;

                if (db.data.users[m.sender].limit <= 0) {
                    m.reply(global.mess.limit);
                } else if (db.data.users[m.sender].limit < 10) {
                    m.reply(`⚠️ Sisa limit kamu tinggal ${db.data.users[m.sender].limit}. Gunakan dengan bijak ya!`);
                }
            }
        } catch (err) {
            const e = util.format(err);
            console.error(`[PLUGIN ERROR] ${plugin.command} | ${fullPluginPath}`);
            if (isCommandBlocked(command, fullPluginPath)) {
                return m.reply("⚠️ Command telah di *block* karena error dalam 3x percobaan.", true);
            }
            m.reply(`Y-ya ampun... error lagi... 😔${readmore} Udah aku laporin ke owner kok... Jadi tunggu aja... Tapi jangan manja terus gini dong!\n${readmore}\n\`\`\`${e}\`\`\``, true);
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


case 'self': {
    // Kategori: "owner"
    if (!isCreator) return m.reply(global.mess.owner);
    wbk.public = false;
    m.reply(`Bot sekarang dalam mode *Self Usage* aja, jadi gak bisa dipakai oleh orang lain ya!`);
}
break;

case 'public': {
    // Kategori: "owner"
    if (!isCreator) return m.reply(global.mess.owner);
    wbk.public = true;
    m.reply(`Bot sekarang kembali ke mode *Public Usage*, jadi bisa dipakai semua orang!`);
}
break;
        
        
//=========================================================
default:
//=========================================================
        
if (['bot', 'permisi', 'kak', 'test', 'tes'].some(keyword => budy.startsWith(keyword))) {
    try {
        newReplyBot("Online, Siap Membantu🤖\n🤖Runtime: " + runtime(process.uptime()))
    } catch (e) {
        newReplyBot(e)
    }
};

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
		if (err) return newReply(err)
		if (stdout) return newReply(stdout)
	})
};    

}
} catch (err) {
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🔴  ERROR  🔴`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(16)} : CASE `));
    console.log(chalk.redBright(`📝  ${"MESSAGE".padEnd(16)} : ${util.format(err)} `));
    console.log(chalk.white("------------------------------------------"));
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🆙  FILE UPDATE  🆙`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(15)}  : ${__filename.toUpperCase()}  `));
    console.log(chalk.greenBright(`📝  ${"MESSAGE".padEnd(15)}  : Changes have been applied!  ✅`));
    console.log(chalk.white("------------------------------------------"));
    delete require.cache[file];
    require(file);
});