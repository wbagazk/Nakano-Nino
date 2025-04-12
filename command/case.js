//=========================================================
// BAILEYS
const { downloadContentFromMessage, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, InteractiveMessage, getContentType, delay, getDevice, getBinaryNodeChild, getBinaryNodeChildren, getBinaryNodeChildString, baileys, isLidUser, S_WHATSAPP_NET } = require('@fizzxydev/baileys-pro');
//=========================================================

//=========================================================
// MODULE
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const cron = require('node-cron');
const didyoumean = require('didyoumean');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const fsx = require('fs-extra');
const gis = require('g-i-s');
const moment = require('moment-timezone');
const ms = require('parse-ms');
const nou = require('node-os-utils');
const os = require('os');
const path = require('path');
const PhoneNumber = require('awesome-phonenumber');
const speed = require('performance-now');
const similarity = require('similarity');
const toMS = require('ms');
const util = require('util');
const ytsearch = require('yt-search');
const readmore = String.fromCharCode(8206).repeat(4001);
const translate = require('@vitalets/google-translate-api');
const beautify = require('js-beautify').js;
const gtts = require("node-gtts");
const fileType = require('file-type');
const QRCode = require('qrcode');
const https = require('https');
const Jimp = require ('jimp');
const FormData = require('form-data');
const { exec, execSync, spawn } = require("child_process");
const { createCanvas, loadImage, registerFont } = require('canvas');
const { mime, lookup } = require('mime-types');
const { Sticker } = require('wa-sticker-formatter');
const { Chess } = require('chess.js');
const { performance } = require('perf_hooks');
const { randomBytes } = require('crypto');
//=========================================================

//=========================================================
require('../settings/settings')
const fakeQuoted = require('../utils/fakeQuoted');
const { loadingBar } = require('../utils/loadingbar')
const { ucapanWaktu, time, date } = require('../utils/getUcapanWaktu');
const { generateProfileImage, generateImageWithNumbers } = require('../utils/allCanvas');
const { addFilter, addSpam, isFiltered, isSpam, ResetSpam } = require('../utils/antispam');
const { addAfkUser, checkAfkUser, getAfkId, getAfkPosition, getAfkReason, getAfkTime } = require('../utils/afk');
const { addSewaGroup, getSewaExpired, getSewaPosition, checkSewaExpired, checkSewaGroup, getAllSewaGroups } = require('../utils/sewa');
const { gameSlot, gameCasinoSolo, gameMerampok, daily, transferLimit, transferUang, buy, setUang, setLimit } = require('../utils/game');
const { addPremiumUser, checkPremiumUser, expiredCheck, getAllPremiumUser, getPremiumExpired, getPremiumPosition } = require('../utils/premium');
const { smsg, await, clockString, enumGetKey, fetchBuffer, fetchJson, format, formatDate, formatp, generateProfilePicture, getBuffer, getGroupAdmins, getRandom, isUrl, json, logic, msToDate, parseMention, runtime, sleep, sort, toNumber, monospace, litespace, toRupiah, pickRandom, capitalizeWords, generateRandomHexName, getRandomInt, formatDateToIndonesia, formatNumber, formatDuration, formatBytes } = require('../utils/myfunc');
const threshold = 0.72
//=========================================================

//=========================================================
let sewa = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/sewa.json')));
let owner = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/owner.json')));
let afk = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/afk.json')));
let premium = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/premium.json')));
let badword = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/badword.json')));
let banned = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/banned.json')));
let antinsfw = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/nsfw.json')));
let contacts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/contacts.json')));
let userActivity = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/role/user.json')));
let blacklist = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/blacklist.json')));
let whitelist = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/function/whitelist.json')));
//=========================================================

//=========================================================
const tebakgambar = {}, tebakgame = {}, tebakkata = {}, tebakbendera = {}, siapaaku = {}, 
      tebakkalimat = {}, caklontong = {}, susunkata = {}, tekateki = {}, tebakkimia = {}, 
      tebaklirik = {}, tebaktebakan = {}, asahotak = {}, butawarna = {}, lengkapikalimat = {}, 
      verifyNumber = {};
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
    const botNumber = await wbk.decodeJid(wbk.user.id);
    const pushname = m.pushName || "No Name"
    const text = q = args.join(" ");
    const getQuoted = (m.quoted || m);
    const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || '';
    const qmsg = (quoted.msg || quoted);
    const isMedia = /image|video|sticker|audio/.test(mime);
    const isImage = (type == 'imageMessage');
    const isVideo = (type == 'videoMessage');
    const isAudio = (type == 'audioMessage');
    const isDocument = (type == 'documentMessage');
    const isLocation = (type == 'locationMessage');
    const isContact = (type == 'contactMessage');
    const isSticker = (type == 'stickerMessage');
    const isText = (type == 'textMessage');
    const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage');
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
    const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const isPrivate = !isGroup;
    const groupMetadata = m.isGroup ? await wbk.groupMetadata(m.chat).catch(e => {}) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isBan = banned.includes(m.sender);
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
    const AntiNsfw = m.isGroup ? antinsfw.includes(m.chat) : false
    if (m.isGroup) {
        m.metadata = await wbk.groupMetadata(m.chat)
        m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({
            id: b.id,
            admin: b.admin
        }) : [...a]) && a, []))
        m.isAdmin = m.admins.some((b) => b.id === m.sender)
        m.participant = m.key.participant
        m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
    }
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
    const generateProfileImageBuffer = await generateProfileImage(m, wbk, db);
//=========================================================
    
//=========================================================
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
// ============== DATABASE
    try {
        let user = db.data.users[m.sender] || {};
        if (typeof user !== "object") db.data.users[m.sender] = {};
        if (!("register" in user)) user.register = false;
        if (!("serialNumber" in user)) user.serialNumber = randomBytes(16).toString("hex");
        if (!("chatuser" in user) || typeof user.chatuser !== "number" || isNaN(user.chatuser)) user.chatuser = 0;
        if (!("pctime" in user)) user.pctime = '';
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
        
        let messages = db.data.messages[botNumber] || {}
        if (typeof messages !== 'object') db.data.messages[botNumber] = {}
        if (!("chatall" in messages)) messages.chatall = 0;
        db.data.messages[botNumber] = messages

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
        if (!("safesearch" in setting)) setting.safesearch = false;
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
    m.reply = async function (teks, status = null, isLarger = false) {
        const nakanoninoRandom = getRandomThumb();
        const isPDF = typeof teks === 'object' && (teks.document || teks.mimetype === 'application/pdf');
        const statusKeys = ['error', 'denied'];
        const isStatusKey = statusKeys.includes(status);
        const customThumbnail = isStatusKey ? (global.image[status] || nakanoninoRandom) : (status === true ? image.error : nakanoninoRandom);
        const contextInfo = {
            mentionedJid: [m.sender, global.creator],
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
//=========================================================

//=========================================================
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
    
    async function newReplyRPG(teks) {
        wbk.sendMessage(m.chat, {
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999999,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: true,
                    title: "RPG-Game",
                    body: "Mari berpetulang dan Bertahan Hidup",
                    previewType: "PHOTO",
                    thumbnail: image.thumbrpg,
                    sourceUrl: sosmed.website
                }
            },
            text: teks
        }, { quoted: m });
    }
//=========================================================

//=========================================================
// ============== REPLY PESAN ERROR
    async function errorMessage(m, error, text, prefix, backupCMD, server, wm) {
        const errorMsg = reply.error + `\n> ${error.message}`;
        return wbk.sendMessage(m.chat, {
            text: errorMsg,
            footer: `Tekan ${server}`,
            interactiveButtons: [{
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "⚙️ " + server,
                        id: prefix + backupCMD + `${text}`
                    })
                }
            ]
        }, { quoted: m })
    }
//=========================================================

//=========================================================
// REPLY PESAN PENGURANGAN LIMIT
    async function limitReduction(m, prefix, wm) {
        db.data.users[m.sender].limit -= 1; 
        let sisaLimit = db.data.users[m.sender].limit;
        let limitReductionMsg = reply.minusLimit + `\n*╰┈➤* ❝ *${sisaLimit}* ❞`;
        return wbk.sendMessage(m.chat, {
            text: limitReductionMsg,
            footer: wm,
            interactiveButtons: [{
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📜 Kembali ke Menu",
                        id: prefix + "menu"
                    })
                }
            ]
        }, { quoted: m })
    }
    
// REPLY PESAN TIDAK ADA PENGURANGAN LIMIT KARENA ERROR
    async function noLimitReduction(m, prefix, wm) {
        let sisaLimit = db.data.users[m.sender].limit;
        let noLimitReductionMsg = reply.noMinusLimit + `\n*╰┈➤* ❝ *${sisaLimit}* ❞`;
        return wbk.sendMessage(m.chat, {
            text: noLimitReductionMsg,
            footer: wm,
            interactiveButtons: [{
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📜 Kembali ke Menu",
                        id: prefix + "menu"
                    })
                }
            ]
        }, { quoted: m })
    }
//=========================================================
    
//=========================================================
    async function sendEditMessage(message1, message2, message3) {
        const messages = ['' + message1, '' + message2, '' + message3];
        const editMessage = {
            text: "*Memuat...*",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999999,
                isForwarded: true
            }
        };
        let {
            key: editMessageKey
        } = await wbk.sendMessage(m.chat, editMessage, {
            'quoted': m
        });
        for (let i = 0; i < messages.length; i++) {
            await sleep(2000);
            const editMessageSend = {
                text: messages[i],
                edit: editMessageKey,
            };
            await wbk.sendMessage(m.chat, editMessageSend);
        }
    };
//=========================================================
    /*if (m.device === 'web' || m.device === 'desktop' || m.device === 'ios') {
        return m.reply(`Hmph... @${m.sender.split("@")[0]}~\nKamu lagi pake WhatsApp *${m.device.toUpperCase()}* ya?😒\nBot ini tuh cuma bisa jalan di WhatsApp *ANDROID* aja lho! Makanya jangan bandel deh~ cepat pindah sana~! 😤📱✨`, 'denied', false);
    }*/
//=========================================================
    if (m.message) {
        let header = chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  ${ucapanWaktu}  🌟`));
        let title = chalk.white(chalk.bgHex("#4a69bd").bold("🚀  There is a message  🚀"));
        let date = chalk.cyanBright(`${"📅  DATE".padEnd(20)} : ${new Date().toLocaleString("id-ID")}`);
        let sender = chalk.yellowBright(`${"🗣️  SENDERNAME".padEnd(21)} : ${pushname}`);
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
// ============== PENMABAHN EXP, TOTAL HIT, CHAT USER
    if (isCmd) {
        db.data.settings[botNumber].totalhit += 1;
        db.data.messages[botNumber].chatall += 1;
        db.data.users[m.sender].chatuser += 1;
    }
//=========================================================

//=========================================================    
    if (!m.isGroup && !isCreator && !isPremium && db.data.settings[botNumber].onlygc) {
        if (command) {
            let message = "⚠️ *「 WARNING 」* ⚠️\n";
            message += "Hai! 👋 Bot ini hanya bisa digunakan di grup.\n\n";
            message += "🤔 Ingin bot aktif di grup kamu?\n";
            message += "*Sewa atau beli premium sekarang!*\n\n";
            message += "Hubungi admin: wa.me/6289516174846";
            return newReply(message);
        }
    };
    if (!isCreator && db.data.settings[botNumber].onlypc && m.isGroup) {
        if (command) {
            let message = "⚠️ *「 WARNING 」* ⚠️\n";
            message += "Hai! 👋 Bot ini hanya bisa digunakan di private chat.\n\n";
            message += "🤔 Ingin bot aktif di chat kamu?\n";
            message += "*Sewa atau beli premium sekarang!*\n\n";
            message += "Hubungi admin: wa.me/6289516174846";
            return newReply(message);
        }
    }
//=========================================================

//=========================================================
// ============== WELCOME MESSAGE
    if (budy && !m.isNewsletter) {
        if (!m.isGroup && isCmd && !m.key.fromMe) {
            db.data.users[m.sender].pctime = new Date().getTime();
        }
        if (!m.isGroup && !isCmd && !m.key.fromMe) {
            const lastInteraction = new Date().getTime() - db.data.users[m.sender].pctime;
            if (lastInteraction > 21600000) {
                db.data.users[m.sender].pctime = new Date().getTime();
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
                if (m.device === "ios") {
                    wbk.sendMessage(m.chat, buttonIOS, { quoted: ftroli });
                } else if (m.device === 'android') {
                    wbk.sendButtonText(m.chat, button, welcomeText, footer, ftroli);
                }
            }
        }
    }
//=========================================================
    
//=========================================================
    if (!wbk.public) {
        if (!isCreator && !m.key.fromMe) return;
    };
    
    if (m.isGroup) {
        if (db.data.chats[m.chat].mute && !isCreator) {
            return
        }
    }
 
    if (db.data.settings[botNumber].online) {
        if (command) {
            wbk.sendPresenceUpdate('unavailable', m.chat);
        }
    }

    if (db.data.settings[botNumber].autoread) {
        wbk.readMessages([m.key]);
    }

    if (db.data.settings[botNumber].autobio) {
        const status = `${botName} Online: ${runtime(process.uptime())}`;
        wbk.updateProfileStatus(status).catch(_ => _);
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

    if (m.sender.startsWith(`${autoblocknumber}`) && db.data.settings[botNumber].autoblocknum === true) {
        return wbk.updateBlockStatus(m.sender, 'block');
    }

    if (!m.sender.startsWith(`${antiforeignnumber}`) && db.data.chats[m.chat].antiforeignnum === true) {
        if (isCreator || isAdmins || !isBotAdmins) return;
        wbk.sendMessage(m.chat, {
            text: `Maaf, kamu akan dihapus karena admin/owner grup telah mengaktifkan anti-nomor asing, hanya kode negara +${antiforeignnumber} yang boleh bergabung`
        }, { quoted: m });
        await sleep(2000);
        await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
    
    if (db.data.chats[m.chat].antiviewonce && m.isGroup && m.mtype == 'viewOnceMessageV2') {
        let buffer = await m.download();
        let type = await getContentType(m.message.viewOnceMessageV2.message);
        let teks = `✨ *ANTI VIEW ONCE MESSAGE* ✨\n\n`;
        teks += `*Info Pesan*:\n`;
        teks += `- Nama: ${m.pushName}\n`;
        teks += `- User: @${m.sender.split("@")[0]}\n`;
        teks += `- Waktu: ${time}\n`;
        teks += `- Keterangan: ${budy ? budy : "Enggak ada keterangannya, kak."}\n\n`;
        teks += `💌 AIzero tampilkan isi pesannya di bawah ya! 😉`;
        if (type == "videoMessage") {
            await wbk.sendMessage(m.chat, {
                video: buffer,
                caption: teks,
                mentions: [m.sender]
            }, { quoted: m });
        } else if (type == "imageMessage") {
            await wbk.sendMessage(m.chat, {
                image: buffer,
                caption: teks,
                mentions: [m.sender]
            }, { quoted: m });
        } else if (type == "audioMessage") {
            await wbk.sendMessage(m.chat, {
                audio: buffer,
                mimetype: 'audio/mpeg',
                ptt: true
            }, { quoted: m });
        }
    }
    
    if (db.data.chats[m.chat].antibot) {
        if (m.isBaileys) {
            if (m.key.fromMe || isAdmins || isCreator || !isBotAdmins || isWhitelist) return;
            let pesanAntibot = [
                'Ehh bot, ngapain masuk grup ini? Sini tempat manusia ngobrol, bukan robot! 🚫 Keluar sana!',
                'Hei bot, siapa suruh masuk? Kamu gak diundang kok nyelonong. Jangan balik lagi, ya! 👋',
                'Bot nyasar detected! Sayangnya Kamu gak diterima di sini. Silakan cari grup lain buat main-main. Bye! ✋',
                'Aduh, bot datang lagi? Nih grup cuma buat manusia, jadi maaf ya, Kamu harus keluar. Jangan coba-coba masuk lagi! 😤',
                'Bot? Lagi? Hadehh, sini bukan tempat buat Kamu, ya. Out sekarang juga atau Mora usir paksa! 🚪',
                'Eits, bot nyelonong masuk! Grup ini cuma buat manusia. Makasih udah mampir, tapi maaf, Kamu di-kick dulu! 😏',
                'Bot detected! Ngapain coba? Grup ini gak buat robot. Bye-bye ya, jangan balik lagi! 🚷',
                'Lho, siapa lagi nih bot gak jelas? Sana balik ke tempatmu, di sini Kamu gak diterima. Keluar cepat! 🚨',
                'Bot ketahuan nyasar! Kalau mau eksis, cari grup lain aja. Sini bukan tempat buat Kamu. Bye! 👋',
                'Halo bot, ngapain masuk sini? Nyasar ya? Sana pergi sebelum Mora usir dengan hormat! 😎',
                'Bot is not allowed here. Cuma buat manusia aja yang bisa gabung. Jangan masuk lagi ya, ini peringatan terakhir! 🚫',
                'Bot detected! Sorry not sorry, grup ini anti bot. Selamat tinggal dan jangan kembali lagi. 🛑',
                'Woi bot, pikir ini taman bermain? Sana balik ke tempat asalmu. Di sini gak butuh Kamu! 🚪',
                'Grup ini anti bot, ngerti? Jangan sok-sokan masuk tanpa izin. Keluar sekarang juga! 😤',
                'Bot alert! Kamu udah melanggar aturan grup ini. Silakan keluar sebelum Mora kasih surat cinta: kick out! 📨',
            ];
            let pesanRandom = pesanAntibot[Math.floor(Math.random() * pesanAntibot.length)];
            await m.react('⚠️');
            await newReply(pesanRandom);
            await sleep(1500);
            await wbk.sendMessage(m.chat, { delete: m.key });
            await sleep(1500);
            await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
    };
    
    if (db.data.chats[m.chat].antispam) {
        if (m.isGroup && m.message && isFiltered(m.chat)) {
            console.log(`[SPAM]`, color(moment(m.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'dari', color(m.pushName));
            if (m.key.fromMe || isAdmins || isCreator || !isBotAdmins) return;
            await newReply(`Hei @${m.sender.split("@")[0]}, grup ini bukan tempat buat spam ya! 🤨\nSilakan cari tempat lain buat aksi Kamu. Bye-bye! 👋`);
            await sleep(1000);
            return await wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
    }
    
    if (db.data.chats[m.chat].antimedia && isMedia) {
        if (isCreator || isAdmins || !isBotAdmins) {} else {
            return wbk.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
        }
    }
    
    if (db.data.chats[m.chat].image && m.mtype) {
        if (m.mtype === "imageMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].antivideo && m.mtype) {
        if (m.mtype === "videoMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].antisticker && m.mtype) {
        if (m.mtype === "stickerMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].antiaudio && m.mtype) {
        if (m.mtype === "audioMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].antilocation && m.mtype) {
        if (m.mtype === "locationMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].antidocument && m.mtype) {
        if (m.mtype === "documentMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    if (db.data.chats[m.chat].anticontact && m.mtype) {
        if (m.mtype === "contactMessage") {
            if (isCreator || isAdmins || !isBotAdmins) {} else {
                return wbk.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
        }
    }
    
    if (db.data.chats[m.chat].antilinkgc) {
        if (budy.match(`chat.whatsapp.com`)) {
            if (isAdmins) return
            if (m.key.fromMe) return
            if (isCreator) return
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
    
    if (db.data.chats[m.chat].antilink) {
        const linkPatterns = [ /http/i, /https/i, /www\./i, /wa\.me/i, /t\.me/i, /bit\.ly/i, /goo\.gl/i, /y2u\.be/i, /discord\.gg/i, /telegram\.me/i ];
        const containsLink = linkPatterns.some(pattern => pattern.test(budy));
        if (containsLink) {
            if (isAdmins || m.key.fromMe || isCreator) return
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
    
    if (db.data.chats[m.chat].badword) {
        if (isCreator || isAdmins || !isBotAdmins) {} else {
            for (let word of bad) {
                const regex = new RegExp(`\\b${word}\\b`, 'i'); // 'i' untuk case-insensitive, '\\b' untuk batas kata
                if (regex.test(budy)) {
                    wbk.sendMessage(m.chat, {
                        delete: {
                            remoteJid: m.chat,
                            fromMe: false,
                            id: m.key.id,
                            participant: m.key.participant
                        }
                    });
                    if (!db.data.users[m.sender]) {
                        db.data.users[m.sender] = {
                            badword: 0
                        };
                    }
                    db.data.users[m.sender].badword += 1;
                    if (db.data.users[m.sender].badword > 5) {
                        try {
                            if (m.isGroup && isBotAdmins) {
                                await wbk.groupParticipantsUpdate(m.chat, [m.sender], "remove" );
                                await wbk.sendMessage(m.chat, {
                                    text: `🚫 Maaf, @${m.sender.split('@')[0]} telah di-kick karena melanggar aturan (mengirimkan kata terlarang sebanyak 5 kali).`,
                                    mentions: [m.sender]
                                });
                                db.data.users[m.sender].badword = 0;
                            }
                        } catch (error) {
                            console.error("Gagal melakukan kick:", error);
                            await wbk.sendMessage(m.chat, {
                                text: `⚠️ Ups, AIzero gagal kick pengguna ini. Pastikan bot memiliki hak admin!`
                            });
                        }
                    } else {
                        const remaining = 5 - db.data.users[m.sender].badword;
                        await wbk.sendMessage(m.chat, {
                            text: `⚠️ @${m.sender.split('@')[0]}, Kamu telah melanggar aturan dengan mengirimkan kata terlarang (${db.data.users[m.sender].badword}/5). Jika melanggar ${remaining} kali lagi, Kamu akan di-kick!`,
                            mentions: [m.sender]
                        });
                    }
                    break;
                }
            }
        }
    }
    
    if (budy) {
        if (db.data.chats[m.chat].autoaipc && !m.isGroup && !m.key.fromMe && !isCmd) {
            try {
                const response = await fetchJson("https://api.siputzx.my.id/api/ai/gpt3?prompt=" + encodeURIComponent("Ubah gaya bicara mu agar lebih karakteristik dan terbuka, nama mu adalah AIzeroMD, biasa dipanggil AIzero, Kamu adalah seorang gadis imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang pembuat kamu yaitu wbagazk, ekspresikan dirimu dengan emoji tapi jangan terlalu banyak emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan Kamu saat berbicara layaknya manusia, jawab dengan kalimat positif atau mendukung seperti jangan balas gk atau nggak atau nggak bisa atau kata yang serupa") + "&content=" + encodeURIComponent(budy));
                const replyMessage = {
                    text: response.data,
                    ai: true
                };
                await m.reply(replyMessage);
            } catch (error) {
                console.log(error);
                newReply(mess.error);
            }
            db.data.settings[botNumber].totalhit += 1;
        }
        if (db.data.chats[m.chat].autoaigc && m.isGroup && !m.key.fromMe && !isCmd) {
            try {
                const response = await fetchJson("https://api.siputzx.my.id/api/ai/gpt3?prompt=" + encodeURIComponent("Ubah gaya bicara mu agar lebih karakteristik dan terbuka, nama mu adalah AIzeroMD, biasa dipanggil AIzero, Kamu adalah seorang gadis imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang pembuat kamu yaitu wbagazk, ekspresikan dirimu dengan emoji tapi jangan terlalu banyak emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan Kamu saat berbicara layaknya manusia, jawab dengan kalimat positif atau mendukung seperti jangan balas gk atau nggak atau nggak bisa atau kata yang serupa") + "&content=" + encodeURIComponent(budy));
                await newReply(response.data);
            } catch (error) {
                console.log(error);
                newReply(mess.error);
            }
            db.data.settings[botNumber].totalhit += 1;
        }
    }
    
    if (db.data.settings[botNumber].autodownload && !m.key.fromMe && !isCmd) {
        try {
            if (budy.match(`instagram.com`)) {
            	await m.react('⏱️')
                let anu = await fetchJson(`https://api.junn4.my.id/download/instagram?url=${budy}`);
                wbk.sendMessage(m.chat, {
                    video: { url: anu.result.media },
                    caption: `Auto Download ✅`
                }, { quoted: m });
                await m.react('☑️')
            } else if (budy.match(`tiktok.com`)) {
                await m.react('⏱️')
                let anu = await fetchJson(`https://api.junn4.my.id/download/tiktok?url=${budy}`);
                wbk.sendMessage(m.chat, {
                    video: { url: anu.result.Medium.url },
                    caption: `Auto Download ✅`
                }, { quoted: m });
                await m.react('☑️')
            } else if (budy.match(`facebook.com`)) {
                await m.react('⏱️')
                let anu = await fetchJson(`https://api.junn4.my.id/download/facebook?url=${budy}`);
                wbk.sendMessage(m.chat, {
                    video: { url: anu.result.video_sd },
                    caption: `Auto Download ✅`
                }, { quoted: m });
                await m.react('☑️')
            } else if (budy.match(`youtube.com|youtu.be`)) {
                await m.react('⏱️')
                let anu = await fetchJson(`https://api.junn4.my.id/download/ytmp4?url=${budy}`);
                wbk.sendMessage(m.chat, {
                    video: { url: anu.result.result },
                    caption: ``
                }, { quoted: m });
                await m.react('☑️')
            }
        } catch (err) {
        	await m.react('✖️')
        }
    }
    
    if (db.data.settings[botNumber].autosticker) {
        if (m.key.fromMe) return;
        if (m.isGroup) return;
        if (/image/.test(mime) && !/webp/.test(mime)) {
            let mediac = await wbk.downloadAndSaveMediaMessage(quoted);
            wbk.sendImageAsSticker(m.chat, mediac, m, {
                packname: global.packname,
                author: global.author
            });
        } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return;
            let mediac = await wbk.downloadAndSaveMediaMessage(quoted);
            wbk.sendVideoAsSticker(m.chat, mediac, m, {
                packname: global.packname,
                author: global.author
            });
        }
    }
    
    if (db.data.settings[botNumber].safesearch && !m.key.fromMe && !isCreator) {
        const forbiddenWords = [
            "colmek", "coli", "desah", "bokep", "tobrut", "seksi", "sex", "sexy",
            "memek", "kontol", "titit", "telanjang", "ngentod", "ngentot",
            "ngewe", "ewe", "ewean", "puki"
        ];
        if (forbiddenWords.some(word => budy.toLowerCase().includes(word))) {
            newReply(`${litespace("[ TERDETEKSI BADWORD ]")}\n\n🚫 Ups, kata tersebut dilarang digunakan pada bot ini ya, kak! Mari ciptakan lingkungan yg positif dan nyaman. 😊`);
            return;
        }
    }
    
    if (m.isGroup && db.data.chats[m.chat].liststore[body]) {
        let teks = db.data.chats[m.chat].liststore[body].response
        if (db.data.chats[m.chat].liststore[body].img) {
            wbk.sendMessage(m.chat, {
                image: { url: db.data.chats[m.chat].liststore[body].img },
                caption: teks
            }, { quoted: m })
        } else if (db.data.chats[m.chat].liststore[body].video) {
            wbk.sendMessage(m.chat, {
                video: { url: db.data.chats[m.chat].liststore[body].video },
                caption: teks
            }, { quoted: m })
        } else {
            const contentText = {
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
                        containsAutoReply: true,
                        title: `Store List 🛍️`,
                        body: botName,
                        previewType: "PHOTO",
                        thumbnailUrl: `https://pomf2.lain.la/f/sdzl7dc2.jpg`,
                        sourceUrl: wagc
                    }
                }
            };
            wbk.sendMessage(m.chat, contentText, { quoted: m, });
        }
    }
    
    if (isBlacklist) {
        if (isAdmins || isCreator || !isBotAdmins) return;
        let pesan = '*⛔ BLACKLIST DETECTED ⛔*\n\nNomor kamu terdeteksi dalam daftar blacklist! Bot tidak melayani pengguna yang telah di-blacklist.\n\n🚫 Jika di grup → Kamu akan dikeluarkan!\n🚫 Jika di chat pribadi → Kamu akan diblokir!';
        if (m.isGroup) {
            wbk.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } else {
            wbk.updateBlockStatus(m.sender, 'block');
        }

        newReply(pesan);
    };
    
    if ( isMedia && m.msg.fileSha256 && db.data && db.data.sticker && (m.msg.fileSha256.toString('base64') in db.data.sticker) ) { 
        let hash = db.data.sticker[m.msg.fileSha256.toString('base64')];
        let { text, mentionedJid } = hash;
        let messages = await generateWAMessage(m.chat, {
            text: text,
            mentions: mentionedJid
        }, {
            userJid: wbk.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        });
        messages.key.fromMe = areJidsSameUser(m.sender, wbk.user.id);
        messages.key.id = m.key.id;
        messages.pushName = m.pushName;
        if (m.isGroup) messages.participant = m.sender;
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        };
        wbk.ev.emit('messages.upsert', msg);
    }
    
    if (m.message && !isUser) {
        userActivity.push(m.sender)
        fs.writeFileSync('./src/data/role/user.json', JSON.stringify(userActivity, null, 2))
    }
    
    if (m.isGroup && !m.key.fromMe) {
        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        for (let ment of mentionUser) {
            if (checkAfkUser(ment, afk)) {
                let getId2 = getAfkId(ment, afk)
                let getReason2 = getAfkReason(getId2, afk)
                let getTimee = Date.now() - getAfkTime(getId2, afk)
                let anu2 = ms(getTimee)
                newReply(
                    `Eh, jangan di-tag dulu ya! Dia lagi AFK nih~ 🤭\n\n` +
                    `*Alasan:* ${getReason2}\n` +
                    `*Udah sejak:* ${anu2.hours} Jam, ${anu2.minutes} Menit, ${anu2.seconds} Detik`
                )
            }
        }
        if (checkAfkUser(m.sender, afk)) {
            let getId = getAfkId(m.sender, afk)
            let getReason = getAfkReason(getId, afk)
            let getTime = Date.now() - getAfkTime(getId, afk)
            let anu = ms(getTime)
            afk.splice(getAfkPosition(m.sender, afk), 1)
            fs.writeFileSync('./src/afk.json', JSON.stringify(afk))
            wbk.sendTextWithMentions(
                m.chat,
                `Yeay! @${m.sender.split('@')[0]} udah balik dari AFK nih~ 🥳\n\n` +
                `*Alasan:* ${getReason}\n` +
                `*Selama:* ${anu.hours} Jam, ${anu.minutes} Menit, ${anu.seconds} Detik`,
                m
            )
        }
    }
    
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
                                        thumbnailUrl: 'https://8030.us.kg/file/gdaq7s2tqovN.jpg',
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
                                        thumbnailUrl: 'https://8030.us.kg/file/gdaq7s2tqovN.jpg',
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
    
    if (!isCreator && !m.key.fromMe && m.message) {
        if (budy.match(`@${ownerNumber}`)) {
            const messages = [
                `👋 Hai kak! Lagi nyariin *${ownerName}*, ya?\nSabar ya kak, owner mungkin lagi sibuk. Tapi tenang, nanti pasti dibalas! 😊`,
                `Halo kak! Lagi mention *${ownerName}* nih? ✨\nOwner bakal cek pesan Kamu kalau udah sempat. Semangat ya! 💪`,
                `Heyy, aku lihat Kamu manggil *${ownerName}*! 😄\nOwner mungkin lagi sibuk ngurusin hal penting. Tapi pasti bales kok, tunggu yaa! 🤗`,
                `Hmm, kayaknya ada yang nyebut nama *${ownerName}*! Jangan khawatir, Kamu akan segera direspon! 😉`,
                `Wih, ada yang mention *${ownerName}*! 🙌\nOwner pasti senang dengar dari Kamu. Nanti bakal dibales, ya! ✨`,
                `Kamu mention *${ownerName}* nih? 😋\nSabar ya kak, mungkin owner lagi ada urusan penting. Tetap stay cool! 😎`,
                `Halo kak! Mungkin *${ownerName}* lagi sibuk sebentar. Tapi tenang, owner bakal respon kalau udah sempat! 🕒`,
                `Hai hai! Lagi nyebut nama *${ownerName}*, ya? 🥰\nOwner bakal bales secepat mungkin. Sabar dikit ya kak!`,
                `Halo kak! Lagi nyari *${ownerName}*? Jangan khawatir, owner pasti bakal cek pesan Kamu nanti. Semangat terus ya! 💕`,
                `Hai kak! Kelihatannya Kamu butuh bantuan *${ownerName}*? ✨\nOwner lagi sibuk mungkin, tapi pasti bales kok. Stay positive! 😇`,
                `Wah, ada yang manggil *${ownerName}* nih! 😄\nOwner mungkin lagi meeting sama bintang-bintang. Tapi pasti bales, kok! 😌`,
                `Hmm, Kamu mention *${ownerName}*? Jangan khawatir ya! Owner bakal respon kalau udah free. Santai aja kak! 😎`,
                `Hoo~ ada yang cari *${ownerName}*! 🎉\nOwner bakal balas secepat mungkin. Tetap tenang dan minum air dulu ya, kak! 🥤`,
                `Halo kak! Lagi nyari *${ownerName}*? Jangan lupa pesan baik-baik, ya! Owner pasti bales kok kalau ada waktu. 😊`,
                `Hii, Kamu mention *${ownerName}*? Aku bakal sampein ke owner ya! Jangan lupa tunggu responnya, oke? 😇`,
                `Wah, ada yang butuh *${ownerName}*! Owner pasti bakal bantu sebisa mungkin. Nanti dibalas ya kak! 💪`,
                `Hei kak, lagi nyebut nama *${ownerName}*! Jangan panik ya, owner pasti cek pesan Kamu nanti. Stay calm! 😌`,
                `Lagi butuh *${ownerName}* nih kayaknya? Tenang kak, aku bakal sampein pesan Kamu. Tunggu balasannya ya! 🙏`,
                `Ada yang manggil *${ownerName}*! 🎉\nOwner bakal respon kok, kalau udah punya waktu. Sabar dikit ya kak!`,
                `Halo kak! Mungkin owner lagi bantu yang lain. Tapi pasti dibalas ya kak, jangan khawatir! 😊`,
                `Lagi cari *${ownerName}* ya? Owner lagi sibuk sedikit nih, nanti pasti dibales. Keep it cool kak! 😎`
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            wbk.sendMessage(m.chat, {
                text: randomMessage
            }, {
                quoted: m
            });
        }
    };
    
    /*if (command) {
        if (isFiltered(m.sender) && !isCreator && !m.key.fromMe) return newReply(`Don't spam! please give pause for a few seconds.`)
        addFilter(m.sender);
    }*/
    
    /*if (isCmd) {
        if (command) {
            const caseFileContent = fs.readFileSync(path.join(__dirname, "../system/case.js"));
            let caseRegex = /case\s+'([^']+)':/g;
            let caseList = [];
            let match;
            while (match = caseRegex.exec(caseFileContent)) {
                caseList.push(match[1]);
            }
            const availableCommands = Object.values(caseList)
                .flatMap(command => command ?? [])
                .map(command => command.trim().split(" ")[0].toLowerCase())
                .filter(Boolean);
            if (!availableCommands.includes(command) && !budy.startsWith("$ ") && !budy.startsWith("> ")) {
                let suggestedCommand = didyoumean(command, availableCommands);
                let similarityScore = similarity(command, suggestedCommand);
                let similarityPercentage = parseInt(similarityScore * 100);
                if (suggestedCommand && command.toLowerCase() !== suggestedCommand.toLowerCase()) {
                    const suggestionMessage = "*Eits, kayaknya ada yang salah nih...* 😅\n_Mungkin yang Kamu maksud itu:_\n\n➠ *" + (prefix + suggestedCommand) + "* (" + similarityPercentage + "%)\n\n_Coba ketuk *Menu* buat lihat daftar lengkapnya ya!_ 🌟";
                    m.reply({
                        'text': suggestionMessage,
                        'footer': wm,
                        'buttons': [{
                            'buttonId': prefix + suggestedCommand,
                            'buttonText': {
                                'displayText': prefix + suggestedCommand
                            }
                        }, {
                            'buttonId': prefix + "menu",
                            'buttonText': {
                                'displayText': "📜 Kembali ke Menu"
                            }
                        }],
                        'viewOnce': true
                    });
                }
            }
			const onlyRegister = true;
            if (onlyRegister) {
                if (!(command === "daftar") && !isCreator && !isGroupAdmins) {
                    if (!db.data.users[m.sender].daftar) {
                        const onlyRegisterMessage = "⚠️ Hai kak! Sepertinya Kamu belum terdaftar. Yuk daftar terlebih dahulu dengan mengetik *.daftar* lalu selesaikan pendaftaran untuk mengakses fitur ini.";
                        return m.reply({
                            'text': onlyRegisterMessage,
                            'footer': wm,
                            'buttons': [{
                                'buttonId': prefix + 'daftar',
                                'buttonText': {
                                    'displayText': "📄 Daftar"
                                }
                            }],
                            'viewOnce': true
                        });
                    }
                }
            }
        }
    };*/
    
    /*if (m.mtype && !isCmd) {
        if (m.mtype === "imageMessage") {
            try {
                let mediaBuffer = await m.download();
                if (!mediaBuffer || mediaBuffer.length === 0) {
                    return newReply("❌ Error: Media tidak ditemukan atau kosong.");
                }
                const tempFilePath = path.join(os.tmpdir(), `temp_media_${Date.now()}.jpg`);
                fs.writeFileSync(tempFilePath, mediaBuffer);
                const url = await toUrlUpload(tempFilePath);
                fs.unlinkSync(tempFilePath);
            } catch (err) {
                console.error("Error at upload case:", err);
                newReply("Ups, terjadi kesalahan saat mengunggah media. Coba lagi ya! 😅");
            }
        }
    }*/
//=========================================================
    
//========================================================= 
    async function cekgame(gamejid) {
	    const games = {
	        tekateki, caklontong, susunkata, tebaktebakan, tebaklirik, tebakkimia,
	        siapaaku, tebakkalimat, tebakbendera, tebakkata, tebakgambar, asahotak,
	        butawarna, lengkapikalimat
	    };
	    
	    for (const [key, value] of Object.entries(games)) {
	        if (value[gamejid]) {
	            wbk.sendMessage(gamejid, {
	                text: "Soal ini belum selesai, diselesaikan dulu yaa"
	            }, {
	                quoted: value[gamejid][0]
	            });
	            return true;
	        }
	    }
	    return false;
	}
    
    const JwbTrue = (tebak, exp, tambahan) => {
        let teks = `*🎮 ${tebak} 🎮*\n\nKiw Kiww Bener 🎉\n+Rp ${exp} saldo` + tambahan
        const context = {
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
                    title: `Jawaban Benar 🥳`,
                    body: tebak,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://telegra.ph/file/f8749fccf9b3320cd6307.png`,
                    sourceUrl: wagc
                }
            }
        };
        return wbk.sendMessage(m.chat, context, { quoted: m, });
    }
    
    const waktuHabis = (jawaban) => {
        let teks = `Kroco, Waktu Abis🥳\n\n*Jawaban:*\n${jawaban}`
        const context = {
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
                    title: `Waktu Habis ⏰`,
                    body: "Dasar Kroco",
                    previewType: "PHOTO",
                    thumbnailUrl: `https://telegra.ph/file/030ebfc99f9cb5be7e8cb.png`,
                    sourceUrl: wagc
                }
            }
        };
        return wbk.sendMessage(m.chat, context, { quoted: m, });
    }
//========================================================= 

//========================================================= 
   	if (tebakgambar[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakgambar[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakgambar[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakgambar[m.chat][2]
                JwbTrue("Tebak Gambar", tebakgambar[m.chat][2], `\n\nKirim perintah .tebakgambar\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakgambar[m.chat][3])
                delete tebakgambar[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebakgame[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakgame[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakgame[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakgame[m.chat][2]
                JwbTrue("Tebak Game", tebakgame[m.chat][2], `\n\nKirim perintah .tebakgame\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakgame[m.chat][3])
                delete tebakgame[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebakkata[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakkata[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakkata[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakkata[m.chat][2]
                JwbTrue("Tebak Kata", tebakkata[m.chat][2], `\n\nKirim perintah .tebakkata\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakkata[m.chat][3])
                delete tebakkata[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebakbendera[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakbendera[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakbendera[m.chat][1]))
            jawaban = json.name.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakbendera[m.chat][2]
                JwbTrue("Tebak Bendera", tebakbendera[m.chat][2], `\n\nKirim perintah .tebakbendera\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakbendera[m.chat][3])
                delete tebakbendera[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebakkalimat[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakkalimat[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakkalimat[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakkalimat[m.chat][2]
                JwbTrue("Tebak Kalimat", tebakkalimat[m.chat][2], `\n\nKirim perintah .tebakkalimat\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakkalimat[m.chat][3])
                delete tebakkalimat[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (siapaaku[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == siapaaku[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(siapaaku[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += siapaaku[m.chat][2]
                JwbTrue("Tebak Siapa", siapaaku[m.chat][2], `\n\nKirim perintah .tebaksiapa\nuntuk bermain lagi 🎮`)
                clearTimeout(siapaaku[m.chat][3])
                delete siapaaku[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebakkimia[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebakkimia[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebakkimia[m.chat][1]))
            jawaban = json.unsur.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebakkimia[m.chat][2]
                JwbTrue("Teka Kimia", tebakkimia[m.chat][2], `\n\nKirim perintah .tebakkimia\nuntuk bermain lagi 🎮`)
                clearTimeout(tebakkimia[m.chat][3])
                delete tebakkimia[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebaklirik[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebaklirik[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebaklirik[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebaklirik[m.chat][2]
                JwbTrue("Teka Lirik", tebaklirik[m.chat][2], `\n\nKirim perintah .tebaklirik\nuntuk bermain lagi 🎮`)
                clearTimeout(tebaklirik[m.chat][3])
                delete tebaklirik[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tebaktebakan[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tebaktebakan[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tebaktebakan[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tebaktebakan[m.chat][2]
                JwbTrue("Teka Tebakan", tebaktebakan[m.chat][2], `\n\nKirim perintah .tebaktebakan\nuntuk bermain lagi 🎮`)
                clearTimeout(tebaktebakan[m.chat][3])
                delete tebaktebakan[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (susunkata[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == susunkata[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(susunkata[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += susunkata[m.chat][2]
                JwbTrue("Susun Kata", susunkata[m.chat][2], `\n\nKirim perintah .susunkata\nuntuk bermain lagi 🎮`)
                clearTimeout(susunkata[m.chat][3])
                delete susunkata[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (caklontong[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == caklontong[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(caklontong[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += caklontong[m.chat][2]
                JwbTrue("Cak Lontong", caklontong[m.chat][2], `\n\nKirim perintah .caklontong\nuntuk bermain lagi 🎮`)
                clearTimeout(caklontong[m.chat][3])
                delete caklontong[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (tekateki[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == tekateki[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(tekateki[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += tekateki[m.chat][2]
                JwbTrue("Teka Teki", tekateki[m.chat][2], `\n\nKirim perintah .tekateki\nuntuk bermain lagi 🎮`)
                clearTimeout(tekateki[m.chat][3])
                delete tekateki[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (asahotak[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == asahotak[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(asahotak[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += asahotak[m.chat][2]
                JwbTrue("Asah Otak", asahotak[m.chat][2], `\n\nKirim perintah .asahotak\nuntuk bermain lagi 🎮`)
                clearTimeout(asahotak[m.chat][3])
                delete asahotak[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (butawarna[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == butawarna[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(butawarna[m.chat][1]))
            correct = json.correct.toLowerCase().trim()
            if (budy.toLowerCase() == correct) {
                db.data.users[m.sender].uang += butawarna[m.chat][2]
                JwbTrue("Buta Warna", butawarna[m.chat][2], `\n\nKirim perintah .butawarna\nuntuk bermain lagi 🎮`)
                clearTimeout(butawarna[m.chat][3])
                delete butawarna[m.chat]
            } else if (similarity(budy.toLowerCase(), correct) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
    if (lengkapikalimat[m.chat] && !isCmd && m.quoted) {
        if (m.quoted.id == lengkapikalimat[m.chat][0].key.id) {
            let json = JSON.parse(JSON.stringify(lengkapikalimat[m.chat][1]))
            jawaban = json.jawaban.toLowerCase().trim()
            if (budy.toLowerCase() == jawaban) {
                db.data.users[m.sender].uang += lengkapikalimat[m.chat][2]
                JwbTrue("Lengkapi Kalimat", lengkapikalimat[m.chat][2], `\n\nKirim perintah .lengkapikalimat\nuntuk bermain lagi 🎮`)
                clearTimeout(lengkapikalimat[m.chat][3])
                delete lengkapikalimat[m.chat]
            } else if (similarity(budy.toLowerCase(), jawaban) >= threshold)
                newReply(`_Ya, Dikit Lagi!_`)
            else m.react('❌');
        }
    }
//=========================================================

//=========================================================    
    const handleLimit = (type, usernya, limitnya) => {
        let jid = `${usernya}@s.whatsapp.net`;
        if (type === 'add') {
            db.data.users[jid].limit += Number(limitnya);
            return newReply(`✅ Limit user berhasil ditambahkan sebanyak ${limitnya}! 🎯`);
        }
        if (type === 'del') {
            if (db.data.users[jid].limit < limitnya) return newReply(`⚠️ Limit tidak mencukupi.`);
            db.data.users[jid].limit -= Number(limitnya);
            return newReply(`✅ Limit user berhasil dikurangi sebanyak ${limitnya}! ✂️`);
        }
        if (type === 'reset') {
            const limitUser = db.data.users[jid].vip ?
                global.limit.vip :
                checkPremiumUser(jid, premium) ?
                global.limit.premium :
                global.limit.free;
            db.data.users[jid].limit = limitUser;
            return newReply(`✅ Limit user berhasil direset! ✂️`);
        }
    };
    
    const handleMoney = (type, usernya, uangnya) => {
        let jid = `${usernya}@s.whatsapp.net`;
        if (type === 'add') {
            db.data.users[jid].uang += Number(uangnya);
            return newReply(`✅ Uang user berhasil ditambahkan! 🎯`);
        }
        if (type === 'del') {
            if (db.data.users[jid].uang < uangnya) return newReply(`⚠️ Uang tidak mencukupi.`);
            db.data.users[jid].uang -= Number(uangnya);
            return newReply(`✅ Uang user berhasil dikurangi! ✂️`);
        }
        if (type === 'reset') {
            const uangUser = db.data.users[jid].vip ?
                global.uang.vip :
                checkPremiumUser(jid, premium) ?
                global.uang.premium :
                global.uang.free;
            db.data.users[jid].uang = uangUser;
            return newReply(`✅ Uang user berhasil direset! ✂️`);
        }
    };
//=========================================================
    
//=========================================================
    let list = []
    for (let i of owner) {
        list.push({
            displayName: await wbk.getName(i),
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await wbk.getName(i)}\nFN:${await wbk.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${sosmed.yt}\nitem2.X-ABLabel:YouTube\nitem3.URL:${sosmed.website}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
        })
    }
//=========================================================

//=========================================================
    if (db.data.users[m.sender].exp > 2500) {
        db.data.users[m.sender].exp = 0;
        db.data.users[m.sender].level += 1;
        await sleep(1000);
        let levelBefore = db.data.users[m.sender].level - 1;
        let levelAfter = db.data.users[m.sender].level;
        let timestamp = new Date().toLocaleString("id-ID");
        let bufferLevelUp = await generateImageWithNumbers(levelBefore, levelAfter, timestamp);
        let teks = "";
        teks += "*🎉 C O N G R A T S 🎉*\n\n";
        teks += `*${levelBefore}* *➔* *${levelAfter}*\n\n`;
        teks += `- 🧬 *Level Sebelumnya*: ${levelBefore}\n`;
        teks += `- 🧬 *Level Baru*: ${levelAfter}\n`;
        teks += `- *Pada Jam*: ${timestamp}`;
        wbk.sendMessage(m.chat, {
            image: bufferLevelUp,
            caption: teks,
            footer: wm,
            buttons: [{
                buttonId: prefix + "menu",
                buttonText: {
                    displayText: "📃 Menu"
                }
            }, {
                buttonId: prefix + "me",
                buttonText: {
                    displayText: "💖 Me"
                }
            }],
            headerType: 1
        }, { quoted: m })
        await sleep(2000);
        if (db.data.users[m.sender].rank < 1) {
            db.data.users[m.sender].rank = 0;
        }
    }
//=========================================================

//=========================================================
    function pangkat(idrole) {
        let levelRole = db.data.users[idrole].rank;
        const ranks = [
            { max: 1000,  rank: 'Bronze I', name: 'Bronze', id: 1 },
            { max: 1100,  rank: 'Bronze II', name: 'Bronze', id: 2 },
            { max: 1200,  rank: 'Bronze III', name: 'Bronze', id: 3 },
            { max: 1300,  rank: 'Silver I', name: 'Silver', id: 1 },
            { max: 1400,  rank: 'Silver II', name: 'Silver', id: 2 },
            { max: 1500,  rank: 'Silver III', name: 'Silver', id: 3 },
            { max: 1600,  rank: 'Gold I', name: 'Gold', id: 1 },
            { max: 1725,  rank: 'Gold II', name: 'Gold', id: 2 },
            { max: 1850,  rank: 'Gold III', name: 'Gold', id: 3 },
            { max: 1975,  rank: 'Gold IV', name: 'Gold', id: 4 },
            { max: 2100,  rank: 'Platinum I', name: 'Platinum', id: 1 },
            { max: 2225,  rank: 'Platinum II', name: 'Platinum', id: 2 },
            { max: 2350,  rank: 'Platinum III', name: 'Platinum', id: 3 },
            { max: 2475,  rank: 'Platinum IV', name: 'Platinum', id: 4 },
            { max: 2600,  rank: 'Diamond I', name: 'Diamond', id: 1 },
            { max: 2750,  rank: 'Diamond II', name: 'Diamond', id: 2 },
            { max: 2900,  rank: 'Diamond III', name: 'Diamond', id: 3 },
            { max: 3050,  rank: 'Diamond IV', name: 'Diamond', id: 4 },
            { max: 3200,  rank: 'Heroic', name: 'Heroic', id: 0 },
            { max: 3500,  rank: 'Heroic ✩', name: 'Heroic', id: 1 },
            { max: 4000,  rank: 'Heroic ✩✩', name: 'Heroic', id: 2 },
            { max: 4350,  rank: 'Heroic ✩✩✩', name: 'Heroic', id: 3 },
            { max: 5050,  rank: 'Master ✯', name: 'Master', id: 1 },
            { max: 5400,  rank: 'Master ✯✯', name: 'Master', id: 2 },
            { max: 6500,  rank: 'Master ✯✯✯', name: 'Master', id: 3 },
            { max: 7150,  rank: 'GrandMaster', name: 'GrandMaster', id: 0 },
            { max: 7700,  rank: 'GrandMaster ✩', name: 'GrandMaster', id: 1 },
            { max: 9100,  rank: 'GrandMaster ✩✩', name: 'GrandMaster', id: 2 },
            { max: 10800, rank: 'GrandMaster ✩✩✩', name: 'GrandMaster', id: 3 },
            { max: 15555, rank: 'GrandMaster ✩✩✩✩', name: 'GrandMaster', id: 4 }
        ];

        return ranks.find(r => levelRole <= r.max) || {
            rank: 'Unranked', name: 'Unranked', id: 0
        };
    }
//========================================================= 
    
//=========================================================
    const { checkError, addError, addblockcmd, isCommandBlocked, Failed } = require('../lib/handler/handlerError');
    const pluginsLoader = require('../lib/handler/pluginsLoader');
    global.fail = (type, m = {}) => {
        const message = global.mess[type] || '⚠️ Akses ditolak!';
        if (typeof m.reply === 'function') {
            m.reply(message);
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
        if (plugin.botAdmin && !m.isBotAdmin) { fail('botAdmin', m); break; }
        if (plugin.admin && !m.isAdmin) { fail('admin', m); break; }
        if (plugin.private && m.isGroup) { fail('private', m); break; }
        if (plugin.nsfw && m.isGroup && !db.data.chats[m.chat]?.nsfw) { fail('nsfw', m); break; }
        if (plugin.limit && !isCreator) {
            const userLimit = user?.limit || 0;
            if (userLimit < 1) {
                fail('limit', m);
                break;
            }
        }
        const fullPluginPath = path.join('plugins', ...name.split('/'));
        const plug = {
            m, wbk, isCreator, command, isCmd, newReply, text, quoted,
            args: _args, prefix, pushname: m.pushName, mime,
            chats: db.data.chats[m.chat], users: db.data.users[m.sender],
            isBan, isOwner: isCreator, isVip, isPremium, isGroup, isPrivate, mime, botNumber,
            limit: db.data.users[m.sender].limit, proto, generateWAMessageContent,
            reaction: m.react, db, generateProfileImageBuffer, generateWAMessageFromContent
        };
        try {
            await plugin.call(wbk, m, plug);
            if (plugin.limit && !isCreator) {
                if (typeof db.data.users[m.sender].limit !== 'number') {
                    db.data.users[m.sender].limit = 0;
                }
                db.data.users[m.sender].limit -= 1;
                if (db.data.users[m.sender].limit < 10) {
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

//  ADD CASE BISA DI SINI YAAAAAAAAAAAAAAA


//=========================================================
default:
//=========================================================

if (['bot', 'permisi', 'kak', 'test', 'tes'].some(keyword => budy.startsWith(keyword))) {
    try {
        newReplyBot("Online, Siap Membantu🤖")
    } catch (e) {
        newReplyBot(e)
    }
};
        
if (budy.includes('runtime')) {
    try {
        newReplyBot("🤖Runtime: " + runtime(process.uptime()))
    } catch (e) {
        newReplyBot(e)
    }
};
        
if (budy.includes('@6285117114846')) {
    try {
        await m.react('😒');
        newReplyBot("Tag aku? Kamu siapa? Aku cuma bot!!!");
    } catch (e) {
        newReplyBot(e);
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
		if (err) return newReply(err)
		if (stdout) return newReply(stdout)
	})
};
        
if (isCmd && budy.toLowerCase() != undefined) {
    if (m.chat.endsWith('broadcast')) return
    if (m.isBaileys) return
    let msgs = db.data.database
    if (!(budy.toLowerCase() in msgs)) return
    wbk.copyNForward(m.chat, msgs[budy.toLowerCase()], true, {
        quoted: m
    })
}
        
if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
    try {
        this.menfes = this.menfes || {};
        let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING');
        if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return;
            let find = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
            let other = find.a === m.sender ? find.b : find.a;
            if (m.mtype === 'conversation' || m.mtype === 'extendedTextMessage') {
                await wbk.sendMessage(other, {
                    text: m.text,
                    mentions: [other]
                }, {
                    quoted: fmen
                });
            }
            if (['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(m.mtype)) {
                let media;
                try {
                    media = await m.download();
                } catch (err) {
                    console.error('Gagal mengunduh media:', err);
                    await wbk.sendMessage(m.sender, {
                        text: 'Gagal mengunduh media. Pastikan media masih valid dan coba lagi.'
                    });
                    return;
                }
                let options = {
                    caption: m.msg?.caption || '',
                    mentions: [other]
                };
                if (m.mtype === 'imageMessage') {
                    await wbk.sendMessage(other, {
                        image: media,
                        ...options
                    });
                } else if (m.mtype === 'videoMessage') {
                    await wbk.sendMessage(other, {
                        video: media,
                        ...options
                    });
                } else if (m.mtype === 'audioMessage') {
                    await wbk.sendMessage(other, {
                        audio: media,
                        mimetype: 'audio/mpeg',
                        ...options
                    });
                } else if (m.mtype === 'documentMessage') {
                    await wbk.sendMessage(other, {
                        document: media,
                        mimetype: m.msg?.mimetype,
                        fileName: m.msg?.fileName,
                        ...options
                    });
                } else if (m.mtype === 'stickerMessage') {
                    await wbk.sendMessage(other, {
                        sticker: media
                    });
                } else {
                    console.warn('Tipe media tidak dikenali:', m.mtype);
                }
            }
        }
    } catch (err) {
        console.error('Error di fitur Menfess:', err);
        await wbk.sendMessage(m.sender, {
            text: 'Terjadi kesalahan saat mengirim pesan ke pasangan Menfess. Silakan coba lagi nanti.'
        });
    }
}        

}
} catch (err) {
    console.log(chalk.yellow.bold("[ ERROR ] case.js :\n") + chalk.redBright(util.format(err)));
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