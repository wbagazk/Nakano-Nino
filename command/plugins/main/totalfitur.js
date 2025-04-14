const fs = require('fs')
const path = require('path')

function getCaseCommands() {
  const casePath = path.join(__dirname, '../../case.js')
  const content = fs.readFileSync(casePath, 'utf-8')
  const regex = /case\s+["'`](.*?)["'`]:\s*{[^}]*\/\/\s*Kategory:\s*["'`](.*?)["'`]/g
  let match, result = {}
  while ((match = regex.exec(content)) !== null) {
    const command = match[1]
    const category = match[2].toLowerCase()
    if (!result[category]) result[category] = []
    result[category].push(command)
  }
  return result
}

function getAllPluginFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  for (let file of list) {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      results = results.concat(getAllPluginFiles(filepath))
    } else if (file.endsWith('.js')) {
      results.push(filepath)
    }
  }
  return results
}

let nakano = async (m) => {
  const pluginDir = path.join(__dirname, '../')
  const pluginFiles = getAllPluginFiles(pluginDir)

  let plugins = pluginFiles.map(file => {
    try {
      const plugin = require(file)
      plugin.__file = file
      return plugin
    } catch {
      return null
    }
  }).filter(p => p && p.help && p.tags)

  const pluginFeatureCount = plugins.reduce((acc, p) => acc + (p.help?.length || 0), 0)

  // Buat struktur kategori dari plugin
  let pluginCategories = {}
  for (let plugin of plugins) {
    for (let tag of plugin.tags) {
      if (!pluginCategories[tag]) pluginCategories[tag] = []
      pluginCategories[tag].push(...plugin.help)
    }
  }

  // Data dari case.js
  const caseCategories = getCaseCommands()
  const caseCommandCount = Object.values(caseCategories).reduce((acc, val) => acc + val.length, 0)

  // Gabungkan kategori plugin dan case
  for (let [cat, cmds] of Object.entries(caseCategories)) {
    if (!pluginCategories[cat]) pluginCategories[cat] = []
    pluginCategories[cat].push(...cmds)
  }

  // Hitung total fitur per kategori (gabungan)
  let kategoriList = Object.entries(pluginCategories)
    .map(([tag, cmds]) => {
      const uniqueCmds = [...new Set(cmds)]
      const tagName = tag.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      return {
        category: tagName,
        featureCount: uniqueCmds.length
      }
    })
    // Urutkan berdasarkan jumlah fitur terbanyak
    .sort((a, b) => b.featureCount - a.featureCount) // Mengurutkan dari terbesar ke terkecil
    .map(({ category, featureCount }) => `> 📂 *${category}*: ${featureCount} fitur`)
    .join('\n')

  const totalKategori = Object.keys(pluginCategories).length

  // ✅ Langsung jumlahkan plugin + case
  const totalFitur = pluginFeatureCount + caseCommandCount

  const replyText = `
📊 *STATISTIK FITUR BOT*

🧩 Total Fitur dari Plugin: ${pluginFeatureCount}
📦 Total Fitur dari Case: ${caseCommandCount}
📌 Total Kategori: ${totalKategori}

📁 *Jumlah Fitur per Kategori:*
${kategoriList}

🎯 *Total Seluruh Fitur:* ${totalFitur}
`.trim()

  m.reply(replyText, false, true)
}

nakano.help = ['totalfitur']
nakano.tags = ['main']
nakano.command = ['totalfitur']

module.exports = nakano
