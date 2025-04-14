const fs = require('fs')
const path = require('path')

const getAllPluginFiles = (dir, base = '') => {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
        const filepath = path.join(dir, file)
        const relative = path.join(base, file)
        const stat = fs.statSync(filepath)
        if (stat.isDirectory()) {
            results = results.concat(getAllPluginFiles(filepath, relative))
        } else if (file.endsWith('.js')) {
            results.push(relative)
        }
    })
    return results
}

const nakano = async (m, { text, prefix, command }) => {
    const pluginDir = path.join(__dirname, '../')
    const pluginFiles = getAllPluginFiles(pluginDir)

    if (!text) {
      let tree = '📁 *Daftar Plugin Tersedia* 🌱\n\n'
      const grouped = {}

      for (let file of pluginFiles) {
        const parts = file.split(path.sep)
        const folder = parts.length > 1 ? parts[0] : 'root'
        if (!grouped[folder]) grouped[folder] = []
        grouped[folder].push(parts.slice(1).join(path.sep) || parts[0])
      }

      for (let folder in grouped) {
        tree += `📂 ${folder}/\n`
        const files = grouped[folder]
        files.forEach((f, i) => {
          const isLast = i === files.length - 1
          tree += `${isLast ? '└──' : '├──'} ${f.replace(/\.js$/, '')}\n`
        })
      }

      return m.reply(`${tree}\n📌 *Gunakan:* ${prefix + command} <namaplugin>\n✨ Contoh: ${prefix + command} totalfitur`)
    }

    const isTextMode = text.toLowerCase().includes('--text')
    const pluginName = text.replace(/--text/i, '').trim()

    if (!pluginName) {
        return m.reply(`⚠️ Kakak lupa nulis nama plugin-nya deh~ 😅\nContohnya gini: *${prefix + command} totalfitur*`)
    }

    let found = null

    for (const file of pluginFiles) {
        try {
            const plugin = require(path.join(pluginDir, file))
            if (plugin.help && plugin.help.includes(pluginName)) {
                found = path.join(pluginDir, file)
                break
            }
        } catch (e) {
            continue
        }
    }

    if (!found) {
        let tree = '📁 *Daftar Plugin yang Tersedia* 🌿\n\n'
        const grouped = {}

        for (let file of pluginFiles) {
            const parts = file.split(path.sep)
            const folder = parts.length > 1 ? parts[0] : 'root'
            if (!grouped[folder]) grouped[folder] = []
            grouped[folder].push(parts.slice(1).join(path.sep) || parts[0])
        }

        for (let folder in grouped) {
            tree += `📂 ${folder}/\n`
            const files = grouped[folder]
            files.forEach((f, i) => {
                const isLast = i === files.length - 1
                tree += `${isLast ? '└──' : '├──'} ${f.replace(/\.js$/, '')}\n`
            })
        }

        return m.reply(`❌ Huhh~ Plugin dengan nama help *${pluginName}* nggak ketemu nih, kakak 😢\n\nCoba dicek lagi, mungkin salah ketik ya~ ✍️\n\n${tree}\n📌 *Gunakan:* ${prefix + command} <namaplugin>\n✨ Contoh: ${prefix + command} totalfitur`)
    }

    const pluginContent = fs.readFileSync(found, 'utf-8')

    if (isTextMode) {
        const MAX_LENGTH = 10000
        await m.reply(`📦 Yeay~ Plugin *${pluginName}* berhasil aku temuin~\n\n📂 Lokasi: ${found}`)
        if (pluginContent.length > MAX_LENGTH) {
            return m.reply(`⚠️ Ehe~ Plugin-nya panjang banget (${pluginContent.length} karakter)... Kalau mau liat lengkapnya, hapus '--text' biar aku kirim sebagai dokumen yaa~`)
        }
        return m.reply(`// 📝 *PLUGIN ${pluginName.toUpperCase()}*\n\n\`\`\`${pluginContent}\n\`\`\``)
    } else {
        await m.reply(`📦 Plugin *${pluginName}* ketemu nih kakak~ ✨\n📂 Lokasi: ${found}`)
        return m.reply({
            document: fs.readFileSync(found),
            fileName: path.basename(found),
            mimetype: 'application/javascript',
            caption: `📄 Nih dia pluginnya kakak~ *${pluginName}* 💻`
        })
    }
}

nakano.help = ['getplugin']
nakano.tags = ['owner']
nakano.command = ['getplugin', 'gp']
nakano.owner = true

module.exports = nakano