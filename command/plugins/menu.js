const fs = require('fs');
const path = require('path');
const axios = require('axios');
const moment = require('moment-timezone');

const pkg = require("../../package.json");
const { runtimeID } = require('@lib/library');

let nakano = async (m, { wbk, args, prefix, command, isOwner, isPremium }) => {
    const user = db.data.users[m.sender];
	
    const categoryMap = {};

    const casePath = path.join(__dirname, '../case.js');
    if (fs.existsSync(casePath)) {
        const caseContent = fs.readFileSync(casePath, 'utf-8');
        const caseRegex = /case\s+['"](.*?)['"]:\s*{([\s\S]*?)break;/g;
        let match;
        while ((match = caseRegex.exec(caseContent)) !== null) {
            const [, cmd, blockContent] = match;
            const categoryMatch = blockContent.match(/\/\/\s*category:\s*"(.*?)"/i);
            const limitMatch = blockContent.match(/\/\/\s*limit:\s*"(true)"/i);
            const category = categoryMatch ? categoryMatch[1] : 'uncategorized';
            const isLimit = !!limitMatch;
            if (!categoryMap[category]) categoryMap[category] = [];
            categoryMap[category].push({ cmd, isLimit });
        }
    }
	
    const pluginDir = path.join(__dirname, './');
    const walkPlugins = dir => {
        const entries = fs.readdirSync(dir);
        for (let entry of entries) {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walkPlugins(fullPath);
            } else if (entry.endsWith('.js')) {
                try {
                    const plugin = require(fullPath);
                    if (plugin?.help && plugin?.category) {
                        plugin.help.forEach((cmd, i) => {
                            const cat = plugin.category?.[i] || plugin.category?.[0] || 'uncategorized';
                            const isLimit = plugin.limit === true || (Array.isArray(plugin.limit) && plugin.limit.includes(cmd));
                            if (!categoryMap[cat]) categoryMap[cat] = [];
                            categoryMap[cat].push({ cmd, isLimit });
                        });
                    }
                } catch (_) {}
            }
        }
    };
    walkPlugins(pluginDir);
    
    for (let cat in categoryMap) {
        categoryMap[cat].sort((a, b) => a.cmd.localeCompare(b.cmd));
    }

    const input = args[0]?.toLowerCase();
    
    const getMenuHeader = () => {
        const now = new Date();
        const waktu = {
            jam: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
            hari: now.toLocaleDateString('id-ID', { weekday: 'long' }),
            tanggal: now.toLocaleDateString('id-ID')
        };
        return `☘️ *N A K A N O  N I N O* ☘️
👋 Hai nama saya Nakano Nino, saya akan membantu anda dengan fitur yang disediakan!
─────────────────────────

🤖 *Info Bot*:
> 🏷️ Nama: ${pkg.name}
> 🔢 Versi: ${pkg.version}
> 👑 Developer: @${global.creator.split('@')[0]}
> 🕰️ Waktu Aktif: ${runtimeID(process.uptime())}
> 📃 Total Fitur: [ ${Object.values(categoryMap).reduce((a, b) => a + b.length, 0)} ]
> 🔑 Prefix: [ ${prefix} ]
─────────────────────────
`;
    };
    m.react('👋')
    // ======================= MENU UTAMA ========================
    if (!input) {
        let categories = Object.keys(categoryMap).sort((a, b) => {
            if (a === 'uncategorized') return 1;
            if (b === 'uncategorized') return -1;
            return a.localeCompare(b);
        });
        const sections = [{
            title: "📚 Nih, semua fitur yang bisa kamu pakai. Jangan asal tekan ya! 😠",
            highlight_label: '',
            rows: [{
                title: "📚 All",
                description: "Ugh, kamu tuh… nih, semua menu udah aku siapin disini. Jangan buang waktuku ya! 💢✨",
                id: `${prefix + command} all`,
            }]
        }, {
            title: "Information! 🌟",
            highlight_label: '',
            rows: [{
                title: "👤 Profile",
                description: "Cek profil kamu disini dan lihat status serta limit yang kamu punya! Ayo, cek sekarang dan lihat seberapa keren kamu! 😉✨",
				id: `${prefix}profile`,
            }, {
                title: "🏆 Leaderboard Top User",
                description: "Hmm...? 🤔 Siapa coba yang paling sering ngobrol sama aku disini? Jangan bilang... kamu? 😳💢",
                id: `${prefix}topuser`,
            }, {
                title: "🏆 Leaderboard Top User Group",
                description:" Tunggu, kamu yang paling sering aktif di grup? Hah? Jangan buat aku tersipu gitu dong! Jangan kaget kalau aku mulai... bales dengan lebih perhatian yaa! 😆💖",
                id: `${prefix}topusergroup`,
            }]
        }, {
            title: '😒 Ugh... Pilih Kategori, Tapi Jangan Lama-lama!',
            highlight_label: '📂 Pilih Kategori',
            rows: categories.map(cat => ({
                title: `📂 ${cat.toUpperCase()}`,
                description: `Lihat perintah dalam kategori ${cat}`,
                id: `${prefix}menu ${cat}`
            }))
        }];

        return m.reply({
            document: fs.readFileSync(path.join(__dirname, '../../package.json')),
            mimetype: "application/pdf",
            fileName: `${m.pushName}`,
            fileLength: Infinity,
            pageCount: 2025,
            jpegThumbnail: "",
            caption: getMenuHeader(),
            footer: global.footer,
            buttons: [
                { buttonId: '.ping', buttonText: { displayText: '📶 Ping' }, type: 1, },
                { buttonId: '.sourcecode', buttonText: { displayText: '📁 Source Code' }, type: 1, },
                { buttonId: '.menu all', buttonText: { displayText: '📑 All Menu' }, type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: '📑 Daftar Menu Bot',
                            sections
                        })
                    }
                }
            ],
            headerType: 1,
            viewOnce: true,
            contextInfo: {
                externalAdReply: {
                    title: global.botName,
                    body: global.desc,
                    thumbnail: global.image.main,
                    mediaUrl: "https://www.youtube.com/",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    // ======================= MENU ALL ========================
    else if (input === 'all') {
        let menuText = getMenuHeader();
        let sortedCategories = Object.keys(categoryMap).sort((a, b) => {
            if (a === 'uncategorized') return 1;
            if (b === 'uncategorized') return -1;
            return a.localeCompare(b);
        });
        for (let cat of sortedCategories) {
            menuText += `\n🧩 *${cat.toUpperCase()}*\n` +
                categoryMap[cat]
                    .map((item, i) => `> (${i + 1}) ${prefix}${item.cmd}${item.isLimit ? ' ▪️' : ''}`)
                    .join('\n') + '\n─────────────────────────';
        }

        return m.reply({
            document: fs.readFileSync(path.join(__dirname, '../../package.json')),
            mimetype: "application/pdf",
            fileName: `${m.pushName}`,
            fileLength: Infinity,
            pageCount: 2025,
            jpegThumbnail: "",
            caption: menuText,
            footer: `─────────────────────────────\n▪️ Fitur Limit\n▫️ Fitur Premium\n` + global.footer,
            buttons: [
                { buttonId: '.ping', buttonText: { displayText: '📶 Ping' }, type: 1, },
                { buttonId: '.sourcecode', buttonText: { displayText: '📁 Source Code' }, type: 1, }
            ],
            headerType: 1,
            viewOnce: true,
            contextInfo: {
                externalAdReply: {
                    title: global.botName,
                    body: global.desc,
                    thumbnail: global.image.main,
                    mediaUrl: "https://www.youtube.com/",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    // ======================= MENU PER KATEGORI ========================
    else {
        const cmds = categoryMap[input];
        if (!cmds) return m.reply(`Kategori *${input}* tidak ditemukan.`);

        let menuText = getMenuHeader();
        menuText += `\n📁 *Kategori:* ${input.toUpperCase()}\n\n` +
    		cmds.map((item, i) => `> (${i + 1}) ${prefix}${item.cmd}${item.isLimit ? ' ▪️' : ''}`).join('\n') + '\n─────────────────────────';

        return m.reply({
            document: fs.readFileSync(path.join(__dirname, '../../package.json')),
            mimetype: "application/pdf",
            fileName: `${m.pushName}`,
            fileLength: Infinity,
            pageCount: 2025,
            jpegThumbnail: "",
            caption: menuText,
            footer: `─────────────────────────────\n▪️ Fitur Limit\n▫️ Fitur Premium\n` + global.footer,
            buttons: [
                { buttonId: '.ping', buttonText: { displayText: '📶 Ping' }, type: 1, },
                { buttonId: '.sourcecode', buttonText: { displayText: '📁 Source Code' }, type: 1, }
            ],
            headerType: 1,
            viewOnce: true,
            contextInfo: {
                externalAdReply: {
                    title: global.botName,
                    body: global.desc,
                    thumbnail: global.image.main,
                    mediaUrl: "https://www.youtube.com/",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }
};

nakano.help = ['menu'];
nakano.category = ['main'];
nakano.command = ['menu'];

module.exports = nakano;