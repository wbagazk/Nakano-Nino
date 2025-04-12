const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const { runtime } = require("../../utils/myfunc")
const pkg = require("../../package.json")

let menu = async (m, { wbk, prefix, command, isOwner, isVip, isPremium, args }) => {
  const nameBot = global.botName
  const db = global.db
  const user = db.data.users[m.sender]
	
  let header = `☘️ *N A K A N O  N I N O*
👋 Hai nama saya Nakano Nino saya akan membantu anda dengan fitur yang sediakan!
─────────────────────────\n\n`
  
  let footer = `📢 *Jika Anda menemui masalah, hubungi developer bot @${global.creator.split("@")[0]}.*

> 💬 *Fitur Limit*: 🥈
> 💎 *Fitur Premium*: 🥇
─────────────────────────`;

  let menuText = `🎮 *Info Pengguna*:\n` +
    `> - 🧑‍💻 Nama: ${m.pushName}\n` +
    `> - 🏷️ Tag: @${m.sender.split("@")[0]}\n` +
    `> - 🎖️ Status: ${isOwner ? "Developer" : isVip ? 'VIP User' : isPremium ? 'Premium User' : 'Free User'}\n` +
    `> - ⚖️ Limit: ${isOwner ? "Unlimited" : user.limit}\n\n` +
    `🤖 *Info Bot*:\n` +
    `> - 🏷️ Nama: ${pkg.name}\n` +
    `> - 🔢 Versi: v${pkg.version}\n` +
    `> - 👑 Developer: ${pkg.author}\n` +
    `> - 🕰️ Waktu Aktif: ${runtime(process.uptime())}\n` +
    `> - 🔑 Prefix: [ ${prefix} ]\n\n` +
    `🕰️ *Info Waktu*:\n` +
    `> - 🕒 ${moment().tz("Asia/Jakarta").format("HH:mm:ss")} WIB\n` +
    `> - 📅 Hari: ${moment().tz("Asia/Jakarta").format("dddd")}\n` +
    `> - 📅 Tanggal: ${moment().tz("Asia/Jakarta").format("DD MMMM YYYY")}`
  
  menuText += `\n─────────────────────────\n`;

  const pluginsDir = path.join(__dirname, '..', 'plugins')
  const getAllPlugins = (dir) => {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach(file => {
      const filepath = path.join(dir, file)
      const stat = fs.statSync(filepath)
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllPlugins(filepath))
      } else if (file.endsWith('.js')) {
        results.push(filepath)
      }
    })
    return results
  }

  const pluginFiles = getAllPlugins(pluginsDir)
  const plugins = pluginFiles.map(file => {
    try {
      let plugin = require(file)
      plugin.__file = file
      return plugin
    } catch (e) {
      return null
    }
  }).filter(p => p && p.help && p.tags)

  let tagMap = {}
  for (let plugin of plugins) {
    for (let tag of plugin.tags) {
      if (!tagMap[tag]) tagMap[tag] = []
      tagMap[tag].push(...plugin.help)
    }
  }

  Object.keys(tagMap).forEach(tag => {
    tagMap[tag] = tagMap[tag].sort((a, b) => a.localeCompare(b))
  })

  tagMap = Object.fromEntries(Object.entries(tagMap).sort(([a], [b]) => a.localeCompare(b)))

  const input = args.join(' ').toLowerCase()

  if (input === 'all') {
    for (let [tag, helps] of Object.entries(tagMap)) {
      menuText += `\n🧩 *${tag.toUpperCase()}*\n`
      helps.forEach((h, i) => {
        menuText += `> (${i + 1}) ${prefix + h}\n`
      })
      menuText += `─────────────────────────\n`;
    }
    return m.reply({
      document: fs.readFileSync(path.join(__dirname, '../../package.json')),
      mimetype: "application/pdf",
      fileName: `${m.pushName}`,
      fileLength: Infinity,
      pageCount: 2025,
      jpegThumbnail: "",
      caption: header + menuText.trim(),
      footer: footer,
      buttons: [
        { buttonId: '.owner', buttonText: { displayText: 'OWNER' }, type: 1 },
        { buttonId: '.ping', buttonText: { displayText: 'PING' }, type: 1 },
      ],
      headerType: 1,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: global.wm,
          body: global.desc,
          thumbnail: global.image.main,
          mediaUrl: "https://www.youtube.com/",
          sourceUrl: sosmed.website,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
  } else if (input && tagMap[input]) {
    menuText += `\n🧩 *${input.toUpperCase()}*\n`
    tagMap[input].forEach((h, i) => {
      menuText += `> (${i + 1}) ${prefix + h}\n`
      menuText += `─────────────────────────\n`;
    })
    return m.reply({
      document: fs.readFileSync(path.join(__dirname, '../../package.json')),
      mimetype: "application/pdf",
      fileName: `${m.pushName}`,
      fileLength: Infinity,
      pageCount: 2025,
      jpegThumbnail: "",
      caption: header + menuText.trim(),
      footer: `Ketik *${prefix + command} all* untuk melihat semua fitur.\n\n` + footer,
      buttons: [
        { buttonId: '.owner', buttonText: { displayText: 'OWNER' }, type: 1 },
        { buttonId: '.ping', buttonText: { displayText: 'PING' }, type: 1 },
      ],
      headerType: 1,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: global.wm,
          body: global.desc,
          thumbnail: global.image.main,
          mediaUrl: "https://www.youtube.com/",
          sourceUrl: sosmed.website,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
  }

  let teks = menuText + `\n📂 *Daftar Kategori Menu:*\n` +
    Object.keys(tagMap).map((tag, i) => `> (${i + 1}) ${prefix + command} ${tag}`).join('\n')
  teks += `\n─────────────────────────\n`;

  m.reply({
    document: fs.readFileSync(path.join(__dirname, '../../package.json')),
    mimetype: "application/pdf",
    fileName: `${m.pushName}`,
    fileLength: Infinity,
    pageCount: 2025,
    jpegThumbnail: "",
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        mediaUrl: "https://www.youtube.com/",
        mediaType: 1,
        title: global.wm,
        body: global.desc,
        thumbnail: global.image.main,
        sourceUrl: sosmed.website,
        renderLargerThumbnail: true
      },
    },
    caption: header + teks,
    footer: `Ketik *${prefix + command} all* untuk melihat semua fitur.\n\n` + footer,
    buttons: [
      { buttonId: '.owner', buttonText: { displayText: 'OWNER' }, type: 1 },
      { buttonId: '.ping', buttonText: { displayText: 'PING' }, type: 1 },
      {
        buttonId: '.allmenu',
        buttonText: { displayText: 'ALL MENU' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: 'MENU 🧾',
            sections: [
              {
                title: `Menu Lengkap, karena Aku Baik Hari Ini! 🌟`,
                highlight_label: `All`,
                rows: [{
                  title: "📚 All Menu",
                  description: `Ugh, kamu tuh… nih, semua menu udah aku siapin disini. Jangan buang waktuku ya! 💢✨`,
                  id: `${prefix + command} all`,
                }]
              },
              {
                title: `Silahkan dipilih menu yang tersedia ya kak. 🤩`,
                highlight_label: ``,
                rows: Object.keys(tagMap).map(tag => ({
                  title: `📂 ${tag.charAt(0).toUpperCase() + tag.slice(1)}`,
                  description: `Menu berisi fitur ${tag}`,
                  id: `${prefix + command} ${tag}`
                }))
              }
            ]
          })
        }
      }
    ],
    headerType: 1
  })
}

menu.help = ['menu']
menu.tags = ['main']
menu.command = ['menu']
menu.register = false

module.exports = menu