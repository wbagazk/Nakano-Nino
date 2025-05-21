const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const crypto = require('crypto');

const nakanoUpdate = path.resolve(__dirname, '../../../.update-temp');
const NakanoUpdate = path.join(nakanoUpdate, 'index.json');

let NaKaNoIndexMap = {};

function fileHash(filePath) {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha1').update(content).digest('hex');
}

function FoldersFilesNakano(dirPath, basePath = '') {
    let nakANOcount = 1;
    let newList = [];
    let changeList = [];
    let sameList = [];
    NaKaNoIndexMap = {};

    const skipnaKAno = [
        '.update-temp',
        'LICENSE',
        'README.md',
        'index.js',
        'start.js',
        'temp/session',
    ];


    function nAkaNO(currentPath, rel = '') {
        const files = fs.readdirSync(currentPath);
        for (const file of files) {
            const relnaKAnoPath = path.join(rel, file);
            const fullNAkaNOPath = path.join(currentPath, file);
            const statsnAkaNo = fs.statSync(fullNAkaNOPath);
            const RelativeNAkAnO = relnaKAnoPath.replace(/\\/g, '/');
            const NakaNOoriginal = path.resolve(__dirname, '../../../', relnaKAnoPath);

            if (skipnaKAno.some(skip => RelativeNAkAnO.startsWith(skip))) continue;

            if (statsnAkaNo.isDirectory()) {
                NaKaNoIndexMap[nakANOcount] = relnaKAnoPath;
                if (!fs.existsSync(NakaNOoriginal)) {
                    newList.push(`${nakANOcount}. 📁 ${relnaKAnoPath}`);
                } else {
                    sameList.push(`${nakANOcount}. 📁 ${relnaKAnoPath}`);
                }
                nakANOcount++;
                nAkaNO(fullNAkaNOPath, relnaKAnoPath);
            } else {
                NaKaNoIndexMap[nakANOcount] = relnaKAnoPath;
                if (!fs.existsSync(NakaNOoriginal)) {
                    newList.push(`${nakANOcount}. 📄 ${relnaKAnoPath}`);
                } else {
                    const nAKAnoHash = fileHash(NakaNOoriginal);
                    const nakANOhash = fileHash(fullNAkaNOPath);
                    if (nAKAnoHash !== nakANOhash) {
                        changeList.push(`${nakANOcount}. 📄 ${relnaKAnoPath}`);
                    } else {
                        sameList.push(`${nakANOcount}. 📄 ${relnaKAnoPath}`);
                    }
                }
                nakANOcount++;
            }
        }
    }

    nAkaNO(dirPath);
    return { newList, changeList, sameList };
}

const nakano = async (m, { args, command, prefix }) => {
    const NAkaNO = args[0];

    if (!NAkaNO) {
        return m.reply(`📦 *Cara Penggunaan:*
➤ *${prefix + command} now* untuk mengunduh & ekstrak update.
➤ *${prefix + command} <angka>* untuk update file/folder tertentu. 
➤ *${prefix + command} delete* untuk hapus file update.
➤ *${prefix + command} all* untuk update semua file (kecualikan folder temp, LICENSE, README.md, index.js, start.js).`);
    }

    if (NAkaNO === 'now' && !args[1]) {
        const url = 'https://api.github.com/repos/wbagazk/Nakano-Nino/zipball';
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const zipPath = path.join(nakanoUpdate, 'update.zip');

            if (!fs.existsSync(nakanoUpdate)) fs.mkdirSync(nakanoUpdate, { recursive: true });
            fs.writeFileSync(zipPath, response.data);

            const zip = new AdmZip(zipPath);
            zip.extractAllTo(nakanoUpdate, true);

            const extractnAKanO = fs.readdirSync(nakanoUpdate).filter(d => {
                const full = path.join(nakanoUpdate, d);
                return fs.statSync(full).isDirectory() && d !== 'node_modules';
            });

            if (extractnAKanO.length === 0) return m.reply('❌ Tidak ditemukan folder setelah ekstraksi.');

            const extractnakanO = path.join(nakanoUpdate, extractnAKanO[0]);
            const { newList, changeList, sameList } = FoldersFilesNakano(extractnakanO);

            fs.writeFileSync(NakanoUpdate, JSON.stringify(NaKaNoIndexMap, null, 2));

            m.reply('✅ File update telah diunduh dan diekstrak.');
            if (newList.length > 0) m.reply(`📂 *Daftar file new:*\n\n${newList.join('\n')}`);
            if (changeList.length > 0) m.reply(`📂 *Daftar file changes:*\n\n${changeList.join('\n')}`);
            if (sameList.length > 0) m.reply(`📂 *Daftar file no changes:*\n\n${sameList.join('\n')}`);
            return;
        } catch (err) {
            return m.reply(`❌ Gagal update:\n${err.message}`);
        }
    }

    if (NAkaNO === 'delete') {
        fs.rmSync(nakanoUpdate, { recursive: true, force: true });
        return m.reply('🗑️ Folder update berhasil dihapus.');
    }

    if (NAkaNO === 'all') {
        if (!fs.existsSync(NakanoUpdate)) {
            return m.reply('⚠️ Silakan jalankan *!scupdate now* terlebih dahulu untuk mengunduh update.');
        }

        const NaKaNoIndexMap = JSON.parse(fs.readFileSync(NakanoUpdate));
        const naKANOexclude = ['LICENSE', 'README.md', 'index.js', 'start.js'];
        const selectNaKano = Object.entries(NaKaNoIndexMap)
            .filter(([_, val]) => {
                const top = val.split(/[\\/]/)[0];
                return !naKANOexclude.includes(val) && top !== '.update-temp';
            });

        const extractnAKanO = fs.readdirSync(nakanoUpdate).find(d => {
            const full = path.join(nakanoUpdate, d);
            return fs.statSync(full).isDirectory();
        });

        if (!extractnAKanO) return m.reply('❌ Folder update tidak ditemukan.');

        const extractNakaNo = path.join(nakanoUpdate, extractnAKanO);
        for (const [_, relativeNaKANoPath] of selectNaKano) {
            const naKANo = path.join(extractNakaNo, relativeNaKANoPath);
            const NakaNO = path.resolve(__dirname, '../../../', relativeNaKANoPath);
            const nAKanO = fs.statSync(naKANo);
            if (nAKanO.isDirectory()) {
                fs.cpSync(naKANo, NakaNO, { recursive: true });
            } else {
                const dir = path.dirname(NakaNO);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.copyFileSync(naKANo, NakaNO);
            }
        }

        return m.reply(`✅ Semua file berhasil diupdate (kecuali file/folder yang dikecualikan).`);
    }

    if (!fs.existsSync(NakanoUpdate)) {
        return m.reply('⚠️ Silakan jalankan *!scupdate now* terlebih dahulu untuk mendapatkan daftar file.');
    }

    NaKaNoIndexMap = JSON.parse(fs.readFileSync(NakanoUpdate));
    const selectNAKAnoIndex = args[0];

    if (!NaKaNoIndexMap[selectNAKAnoIndex]) {
        return m.reply('❌ Angka tidak ditemukan. Ketik *!scupdate now* untuk melihat daftar.');
    }

    const relativeNaKANoPath = NaKaNoIndexMap[selectNAKAnoIndex];
    const extractnAKanO = fs.readdirSync(nakanoUpdate).find(d => {
        const full = path.join(nakanoUpdate, d);
        return fs.statSync(full).isDirectory();
    });

    if (!extractnAKanO) return m.reply('❌ Folder update tidak ditemukan.');

    const extractNakaNo = path.join(nakanoUpdate, extractnAKanO);
    const naKANoPath = path.join(extractNakaNo, relativeNaKANoPath);
    const NakaNOPath = path.resolve(__dirname, '../../../', relativeNaKANoPath);

    try {
        const nAKanO = fs.statSync(naKANoPath);
        if (nAKanO.isDirectory()) {
            fs.cpSync(naKANoPath, NakaNOPath, { recursive: true });
        } else {
            const dir = path.dirname(NakaNOPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.copyFileSync(naKANoPath, NakaNOPath);
        }

        return m.reply(`✅ Update selesai untuk *${relativeNaKANoPath}*`);
    } catch (err) {
        return m.reply(`❌ Gagal update:\n${err.message}`);
    }
};

nakano.help = ['scupdate'];
nakano.tags = ['owner'];
nakano.command = ['scupdate'];
nakano.owner = true;

module.exports = nakano