const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const { runtime2 } = require("../../utils/myfunc")
const pkg = require("../../package.json")

function getCaseCategories() {
  const casePath = path.join(__dirname, '../../command/case.js')
  const content = fs.readFileSync(casePath, 'utf-8')
  const regex = /case\s+["'`](.*?)["'`]:\s*{[^}]*\/\/\s*Kategori:\s*["'`](.*?)["'`]/g
  let match, result = {}
  while ((match = regex.exec(content)) !== null) {
    const command = match[1]
    const category = match[2].toLowerCase()
    if (!result[category]) result[category] = []
    result[category].push(command)
  }
  return result
}

let nakano = async (m, { wbk, prefix, command, isOwner, isVip, isPremium, args }) => {
  const nameBot = global.botName
  const db = global.db
  const user = db.data.users[m.sender]

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
  let totalCommand = 0

  for (let plugin of plugins) {
    for (let tag of plugin.tags) {
      if (!tagMap[tag]) tagMap[tag] = []
      tagMap[tag].push(...plugin.help)
      totalCommand += plugin.help.length
    }
  }

  const caseCategories = getCaseCategories()
  for (let [cat, commands] of Object.entries(caseCategories)) {
    if (!tagMap[cat]) tagMap[cat] = []
    tagMap[cat].push(...commands)
    totalCommand += commands.length
  }

  Object.keys(tagMap).forEach(tag => {
    tagMap[tag] = tagMap[tag].sort((a, b) => a.localeCompare(b))
  })

  tagMap = Object.fromEntries(Object.entries(tagMap).sort(([a], [b]) => a.localeCompare(b)))

  let header = `☘️ *N A K A N O  N I N O* ☘️
👋 Hai nama saya Nakano Nino saya akan membantu anda dengan fitur yang sediakan!\n> 🫶 Silahkan cek menunya dibawah yaa
─────────────────────────\n\n`

  let footer = `📢 *Jika Anda menemui masalah, hubungi developer bot @${global.creator.split("@")[0]}.*

> *Fitur Limit*: 🥈
> *Fitur Premium*: 🥇
─────────────────────────`

  let menuText = /*`🎮 *Info Pengguna*:\n` +
    `> - 🧑‍💻 Nama: ${m.pushName}\n` +
    `> - 🏷️ Tag: @${m.sender.split("@")[0]}\n` +
    `> - 🎖️ Status: ${isOwner ? "Developer" : isVip ? 'VIP User' : isPremium ? 'Premium User' : 'Free User'}\n` +
    `> - ⚖️ Limit: ${isOwner ? "Unlimited" : user.limit}\n` +
    `> - ⚡ Point: ${isOwner ? "Unlimited" : user.point}\n` +
  	`> - 💵 Saldo: ${isOwner ? "Unlimited" : user.saldo}\n\n` +*/
    `🤖 *Info Bot*:\n` +
    `> - 🏷️ Nama: ${pkg.name}\n` +
    `> - 🔢 Versi: v${pkg.version}\n` +
    `> - 👑 Developer: ${pkg.author}\n` +
    `> - 🕰️ Waktu Aktif: ${runtime2(process.uptime())}\n` +
    `> - 📃 Total Fitur: [ ${totalCommand} ]\n` +
    `> - 🔑 Prefix: [ ${prefix} ]`
    /*`🕰️ *Info Waktu*:\n` +
    `> - 🕒 ${moment().tz("Asia/Jakarta").format("HH:mm:ss")} WIB\n` +
    `> - 📅 Hari: ${moment().tz("Asia/Jakarta").format("dddd")}\n` +
    `> - 📅 Tanggal: ${moment().tz("Asia/Jakarta").format("DD MMMM YYYY")}`*/

  menuText += `\n─────────────────────────\n`
    
  const input = args.join(' ').toLowerCase()

  if (input === 'all') {
    await m.react('🫶🏽');
    for (let [tag, helps] of Object.entries(tagMap)) {
      menuText += `\n🧩 *${tag.toUpperCase()}*\n`
      helps.forEach((h, i) => {
        let featureText = `> (${i + 1}) ${prefix + h}`
        const plugin = plugins.find(p => p.help.includes(h))
        if (plugin && plugin.limit === true) {
          featureText += ' 🥈'
        }
        /*if (plugin && plugin.owner === true) {
          featureText += ' 👑'
        }*/
        menuText += featureText + '\n'
      })
      menuText += `─────────────────────────\n\n`
    }

    return m.reply({
      document: fs.readFileSync(path.join(__dirname, '../../package.json')),
      mimetype: "application/pdf",
      fileName: `${m.pushName}`,
      fileLength: Infinity,
      pageCount: 2025,
      jpegThumbnail: "",
      caption: header + menuText.trim() + footer,
      footer: global.footer,
      buttons: [
        { buttonId: '.sc', buttonText: { displayText: 'SC' }, type: 1 },
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
    await m.react('🫶🏽');
    menuText += `\n🧩 *${input.toUpperCase()}*\n`
    tagMap[input].forEach((h, i) => {
      let featureText = `> (${i + 1}) ${prefix + h}`
      const plugin = plugins.find(p => p.help.includes(h))
      if (plugin && plugin.limit === true) {
        featureText += ' 🥈'
      }
      /*if (plugin && plugin.owner === true) {
        featureText += ' 👑'
      }*/
      menuText += featureText + '\n'
    })
    menuText += `─────────────────────────\n\n`

    return m.reply({
      document: fs.readFileSync(path.join(__dirname, '../../package.json')),
      mimetype: "application/pdf",
      fileName: `${m.pushName}`,
      fileLength: Infinity,
      pageCount: 2025,
      jpegThumbnail: "",
      caption: header + menuText.trim() + footer,
      footer: global.footer,
      buttons: [
        { buttonId: '.sc', buttonText: { displayText: 'SC' }, type: 1 },
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
  teks += `\n─────────────────────────\n\n`
  await m.react('🫶🏽');
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
    caption: header + teks + footer,
    footer: global.footer,
    buttons: [
      { buttonId: '.sc', buttonText: { displayText: 'SC' }, type: 1 },
      { buttonId: '.ping', buttonText: { displayText: 'PING' }, type: 1 },
      {
        buttonId: '.menu all',
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
                  title: "📚 All",
                  description: `Ugh, kamu tuh… nih, semua menu udah aku siapin disini. Jangan buang waktuku ya! 💢✨`,
                  id: `${prefix + command} all`,
                }]
              }, {
                title: `Information! 🌟`,
                highlight_label: ``,
                rows: [{
                  title: "👤 Profile",
                  description: `Cek profil kamu disini dan lihat status serta limit yang kamu punya! Ayo, cek sekarang dan lihat seberapa keren kamu! 😉✨`,
                  id: `${prefix}profile`,
                },{
                  title: "🏆 Leaderboard Top User",
                  description: `Hmm...? 🤔 Siapa coba yang paling sering ngobrol sama aku disini? Jangan bilang... kamu? 😳💢`,
                  id: `${prefix}topuser`,
                },{
                  title: "🏆 Leaderboard Top User Group",
                  description: `Tunggu, kamu yang paling sering aktif di grup? Hah? Jangan buat aku tersipu gitu dong! Jangan kaget kalau aku mulai... bales dengan lebih perhatian yaa! 😆💖`,
                  id: `${prefix}topusergroup`,
                }]
              }, {
                title: `Silahkan dipilih menu yang tersedia ya kak. 🤩`,
                highlight_label: ``,
                rows: Object.keys(tagMap).map(tag => ({
                  title: `📂 ${tag.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`,
                  description: `Menu berisi fitur ${tag.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}`,
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

nakano.help = ['menu']
nakano.tags = ['main']
nakano.command = ['menu']
nakano.register = false

module.exports = nakano