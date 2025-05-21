const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');
const moment = require("moment-timezone");
const { proto, generateWAMessage, reJidsSameUser, getContentType, jidDecode } = require('baileys');

const smsg = (sock, m, store) => {
	if (!m) return m;
	let M = proto.WebMessageInfo;
	if (m.key) {
		m.id = m.key.id;
		m.isBaileys = 
			m.id.endsWith("WBSF") || 
				m.id.startsWith("AKIRA") || 
					m.id.startsWith("VRDN") || 
						m.id.startsWith("FELZ") ||
							m.id.startsWith("HSK") ||
            					m.id.length === 32 ||
                                    m.id.startsWith("FizzxyTheGreat") ||
                                        (m.id.startsWith("B1EY") && m.id.length === 20) || 
                                            (m.id.startsWith("BAE5") && m.id.length === 16) || 
                                                (m.id.startsWith("3EB0") && (m.id.length === 22 || m.id.length === 40));
		m.device = /^3A/.test(m.id)
			? "ios"
			: /^3E/.test(m.id)
				? "web"
				: /^.{21}/.test(m.id)
					? "android"
					: /^.{18}/.test(m.id)
						? "desktop"
						: "unknown";
		m.chat = m.key.remoteJid;
		m.fromMe = m.key.fromMe;
		m.isGroup = m.chat.endsWith('@g.us');
		m.isNewsletter = m.chat.endsWith('@newsletter');
		m.sender = sock.decodeJid(m.fromMe && sock.user.id || m.participant || m.key.participant || m.chat || '');
		if (m.isGroup) m.participant = sock.decodeJid(m.key.participant) || '';
	}
	if (m.message) {
		m.mtype = getContentType(m.message);
		m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
		m.body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : (m.mtype === "viewOnceMessageV2") ? (m.msg.message.imageMessage?.caption || m.msg.message.videoMessage?.caption || "") : "";
		let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
		if (m.quoted) {
			let type = Object.keys(m.quoted)[0];
			m.quoted = m.quoted[type];
			if (['productMessage'].includes(type)) {
				type = Object.keys(m.quoted)[0];
				m.quoted = m.quoted[type];
			}
			if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			};
			m.quoted.mtype = type;
			m.quoted.id = m.msg.contextInfo.stanzaId;
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
			m.quoted.isBaileys = 
                m.quoted?.id?.endsWith("WBSF") ||
                m.quoted?.id?.startsWith("AKIRA") ||
                m.quoted?.id?.startsWith("VRDN") || 
                m.quoted?.id?.startsWith("FELZ") ||
                m.quoted?.id?.startsWith("HSK") ||
                m.quoted?.id?.startsWith("FizzxyTheGreat") ||
                m.quoted?.id?.length === 32 ||
                (m.quoted?.id?.startsWith("B1EY") && m.quoted?.id?.length === 20) || 
                (m.quoted?.id?.startsWith("BAE5") && m.quoted?.id?.length === 16) || 
                (m.quoted?.id?.startsWith("3EB0") && (m.quoted?.id?.length === 22 || m.quoted?.id?.length === 40));
			m.quoted.device = /^3A/.test(m.quoted.id)
				? "ios"
				: /^3E/.test(m.quoted.id)
					? "web"
					: /^.{21}/.test(m.quoted.id)
						? "android"
						: /^.{18}/.test(m.quoted.id)
							? "desktop"
							: "unknown";
			m.quoted.sender = sock.decodeJid(m.msg.contextInfo.participant);
			m.quoted.fromMe = m.quoted.sender === sock.decodeJid(sock.user.id);
			m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
			m.getQuotedObj = m.getQuotedMessage = async () => {
				if (!m.quoted.id) return false;
				let q = await store.loadMessage(m.chat, m.quoted.id, sock);
				return exports.smsg(sock, q, store);
			};
			let vM = m.quoted.fakeObj = M.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: quoted,
				...(m.isGroup ? {
					participant: m.quoted.sender
				} : {})
			});
			m.quoted.delete = () => sock.sendMessage(m.quoted.chat, {
				delete: vM.key
			});
			m.quoted.copyNForward = (jid, forceForward = false, options = {}) => sock.copyNForward(jid, vM, forceForward, options);
			m.quoted.download = () => sock.downloadMediaMessage(m.quoted);
		}
	}
	if (m.msg.url) m.download = () => sock.downloadMediaMessage(m.msg);
	m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || m.msg.body?.text || m.msg.name || m.msg.message?.imageMessage?.caption || m.msg.message?.videoMessage?.caption || ""
	m.reply = async (text, options = {}) => {
		if (typeof text === "string") {
			await sock.sendMessage(
				m.chat,
				{
					text,
					mentions: [...sock.parseMention(text)],
					...options,
				},
				{
					quoted: m,
					...options,
				},
			);
		} else if (typeof text === "object" && typeof text !== "string") {
			await sock.sendMessage(
				m.chat,
				{
					...text,
					...options,
				},
				{
					quoted: m,
					...options,
				},
			);
		}
	};
	m.react = async (emoji) => {
		await sock.sendMessage(m.chat, {
			react: {
				text: emoji,
				key: m.key,
			},
		});
	};
	m.copy = () => exports.smsg(sock, M.fromObject(M.toObject(m)));
	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => sock.copyNForward(jid, m, forceForward, options);
	sock.appenTextMessage = async (text, chatUpdate) => {
		let messages = await generateWAMessage(m.chat, {
			text: text,
			mentions: m.mentionedJid
		}, {
			userJid: sock.user.id,
			quoted: m.quoted && m.quoted.fakeObj
		});
		messages.key.fromMe = areJidsSameUser(m.sender, sock.user.id);
		messages.key.id = m.key.id;
		messages.pushName = m.pushName;
		if (m.isGroup) messages.participant = m.sender;
		let msg = {
			...chatUpdate,
			messages: [proto.WebMessageInfo.fromObject(messages)],
			type: 'append'
		};
		sock.ev.emit('messages.upsert', msg);
	};
	return m;
};

const runtime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
};

const runtimeID = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? " hari, " : " hari, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " jam, " : " jam, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " menit, " : " menit, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " detik" : " detik") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getGroupAdmins = (participants) => {
    let admins = []
    for (let i of participants) {
        if (i.admin === "superadmin" || i.admin === "admin") {
            admins.push(i.id);
        }
    }
    return admins;
};

const parseMention = (text) => {
    text = typeof text === 'string' ? text : String(text || '')
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
};

const decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        const decode = jidDecode(jid) || {};
        return (decode.user && decode.server && `${decode.user}@${decode.server}`) || jid;
    } else {
        return jid;
    }
};

const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

const ucapanWaktu = () => {
    const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const date = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");

    let ucapan = "Selamat Malam 🌌";
    if (time < "05:00:00") {
        ucapan = "Selamat Pagi 🌄";
    } else if (time < "11:00:00") {
        ucapan = "Selamat Pagi 🌄";
    } else if (time < "15:00:00") {
        ucapan = "Selamat Siang 🌅";
    } else if (time < "18:00:00") {
        ucapan = "Selamat Sore 🌇";
    } else if (time < "19:00:00") {
        ucapan = "Selamat Petang 🌆";
    }
    return ucapan;
};

const getRandomThumbnail = () => {
    const thumbs = global.image?.thumb || []
    if (!thumbs.length) return null
    return thumbs[Math.floor(Math.random() * thumbs.length)]
}

const monospace = (string) => '```' + string + '```';
const litespace = (string) => '*`' + string + '`*';

const logMessage = (title, message) => {
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`${title}`)));
    console.log(chalk.cyanBright(`📅  ${"Date".padEnd(16)} : ${new Date().toLocaleString("id-ID")}`));
    console.log(chalk.yellowBright(`📝  ${"Message".padEnd(16)} : ${message}`));
    console.log(chalk.white("------------------------------------------"));
};

module.exports = { smsg, runtime, runtimeID, sleep, getGroupAdmins, parseMention, decodeJid, getBuffer, ucapanWaktu, getRandomThumbnail, monospace, litespace, logMessage };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});