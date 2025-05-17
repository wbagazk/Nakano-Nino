const fs = require('fs')
const path = require('path')

const nakano = async (m, { text, quoted, prefix, command }) => {
    if (!m.quoted) {
        return m.reply(`⚠️ Kakak harus reply pesan yang berisi kode plugin-nya ya~\n\nContoh:\n1. Kirim dulu kodenya\n2. Lalu reply dengan: *${prefix + command} folder/namafile.js*`)
    }

    if (!text || !text.includes('/')) {
        return m.reply(`❗ Format salah nih kak~\nHarus dalam format: *${prefix + command} folder/namafile.js*\nContoh: *${prefix + command} testes/test.js*`)
    }

    const baseDir = path.join(__dirname, '../')
    const savePath = path.join(baseDir, text)
    const saveDir = path.dirname(savePath)

    fs.mkdirSync(saveDir, { recursive: true })

    try {
        fs.writeFileSync(savePath, quoted.text.trim(), 'utf-8')
        m.reply(`✅ Plugin berhasil disimpan di *${text}*\n\n💡 Coba cek folder *${saveDir}* ya kak~`)
    } catch (err) {
        console.error(err)
        m.reply(`❌ Gagal menyimpan plugin: ${err.message}`)
    }
}

nakano.help = ['saveplugin']
nakano.tags = ['owner']
nakano.command = ['saveplugin', 'sf']
nakano.owner = true

module.exports = nakano