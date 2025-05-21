const { litespace } = require('@lib/library');
const { sendButtonText } = require('@utils/messageButton');

let nakano = async (m, { wbk, args, prefix, command, quoted, text }) => {
    const settingName = args[0]?.toLowerCase();
    const settingValue = args[1]?.toLowerCase();

    const validSettings = {
        welcome: 'Welcome',
        leave: 'Leave',
        adminevent: 'Admin Event',
        groupevent: 'Group Event',
        antibot: 'Anti Bot',
        antilink: 'Anti Link',
        antibadword: 'Anti Badword',
        antistatusmention: 'Anti Status Mention'
    };
    
    if (settingName === 'check') {
        db.data.chats[m.chat] = db.data.chats[m.chat] || {};
        const target = db.data.chats[m.chat];
        const statusList = Object.keys(validSettings).map(fitur => {
            const val = target[fitur];
            const isObject = typeof val === 'object';
            const status = isObject ? (val.check ? '✅ Aktif' : '❌ Nonaktif') : '❌ Nonaktif';
            const kick = ['antilink', 'antibot', 'antibadword', 'antistatusmention'].includes(fitur)
                ? (isObject && val.kick ? '🦵 Kick: Aktif' : '🦵 Kick: Nonaktif')
                : null;
            const textInfo = (['welcome', 'leave'].includes(fitur) && isObject && val.text)
                ? `\n> 📝 Teks: ${val.text}`
                : '';
            return `• ${validSettings[fitur]}:\n> ${status}` + (kick ? `\n> ${kick}` : '') + textInfo + '\n';
        }).join('\n');
        const teks = `${litespace('STATUS FITUR GRUP')}\n\n${statusList}`;
        return m.reply(teks);
    }

    if (['open', 'buka', 'close', 'tutup'].includes(settingName)) {
        const isClose = settingName === 'close' || settingName === 'tutup';
        try {
            await wbk.groupSettingUpdate(m.chat, isClose ? 'announcement' : 'not_announcement');
            return m.reply(`✅ Grup berhasil di${isClose ? 'tutup 🔒' : 'buka 🔓'}`);
        } catch (err) {
            return m.reply(`⚠️ Gagal ${isClose ? 'menutup' : 'membuka'} grup: ${err}`);
        }
    }
    
    if (settingName === 'all' && ['true', 'false'].includes(settingValue)) {
        const allActive = settingValue.toLowerCase();
        db.data.chats[m.chat] = db.data.chats[m.chat] || {};
        const target = db.data.chats[m.chat];
        for (let key of Object.keys(validSettings)) {
            target[key] = target[key] || {};
            target[key].check = allActive === 'true';
            if (['antilink', 'antibot', 'antibadword', 'antistatusmention'].includes(key)) {
                target[key].kick = allActive === 'true';
            }
        }
        return m.reply(`✅ Semua fitur grup berhasil di- *${allActive === 'true' ? 'aktifkan' : 'nonaktifkan'}*!`);
    }

    if (!settingName || !validSettings[settingName]) {
        const sections = [
            {
                title: '🔍 Kontrol Umum',
                rows: [
                    {
                        header: '📋 Lihat Status',
                        title: 'Tampilkan semua pengaturan fitur group saat ini',
                        id: `${prefix + command} check`
                    },
                    {
                        header: '✅ Aktifkan Semua',
                        title: 'Aktifkan semua fitur group sekaligus',
                        id: `${prefix + command} all true`
                    },
                    {
                        header: '❌ Nonaktifkan Semua',
                        title: 'Nonaktifkan semua fitur group sekaligus',
                        id: `${prefix + command} all false`
                    }
                ]
            },
            {
                title: '🔐 Pengaturan Grup',
                rows: [
                    { header: '🔓 Buka Grup', title: 'Semua anggota bisa kirim pesan', id: `${prefix + command} open` },
                    { header: '🔒 Tutup Grup', title: 'Hanya admin yang bisa kirim pesan', id: `${prefix + command} close` }
                ]
            },
            ...Object.keys(validSettings).map(key => ({
                title: `⚙️ Pengaturan: ${validSettings[key]}`,
                rows: [
                    { header: '✅ Aktifkan', title: `Aktifkan fitur ${validSettings[key]}`, id: `${prefix + command} ${key} true` },
                    { header: '❌ Nonaktifkan', title: `Nonaktifkan fitur ${validSettings[key]}`, id: `${prefix + command} ${key} false` },
                    ...(key === 'antilink' || key === 'antibot' || key === 'antibadword' || key === 'antistatusmention' ? [{
                        header: '🦵 Aktifkan Kick',
                        title: `Aktifkan fitur kick otomatis jika melanggar ${validSettings[key]}`,
                        id: `${prefix + command} ${key} kick true`
                    }] : []),
                    ...(key === 'antilink' || key === 'antibot' || key === 'antibadword' || key === 'antistatusmention' ? [{
                        header: '🦵 Nonaktifkan Kick',
                        title: `Nonaktifkan fitur kick otomatis jika melanggar ${validSettings[key]}`,
                        id: `${prefix + command} ${key} kick false`
                    }] : []),
                    ...(key === 'welcome' || key === 'leave' ? [{
                        header: '✏️ Edit Teks',
                        title: `Ubah teks ${validSettings[key]}`,
                        id: `${prefix + command} ${key} set`
                    }] : []),
                    ...(key === 'antibadword' ? [{
                        header: '✏️ Tambah Kata',
                        title: 'Tambahkan kata baru ke daftar badword (pakai koma)',
                        id: `${prefix + command} ${key} set`
                    }, {
                        header: '🗑️ Hapus Kata',
                        title: 'Hapus kata dari daftar badword',
                        id: `${prefix + command} ${key} del`
                    }] : []),
                ]
            }))
        ];
        const button = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: "📌 Pengaturan Grup",
                sections
            })
        }];
        const teks = `${litespace("GROUP SETTINGS")}\n\n🛠️ Atur fitur grup sesuai kebutuhan kamu\n> Cek pengaturan di button/tombol di bawah\n\n`;
        return sendButtonText(wbk, m.chat, button, teks, global.footer, m);
    }

    db.data.chats[m.chat] = db.data.chats[m.chat] || {};
    let target = db.data.chats[m.chat];

    if (settingValue === 'set' && (settingName === 'welcome' || settingName === 'leave')) {
        const customText = quoted?.text;
        if (!customText) return m.reply(
            `📌 Untuk mengubah teks *${validSettings[settingName]}*, silakan *reply* atau *quote* pesan yang berisi teks yang ingin digunakan.\n\n` +
            `Contoh:\n` +
            `1. Kirim pesan: _Selamat datang @user di grup @subject!_\n` +
            `2. Balas pesan tersebut dengan perintah:\n\n` +
            `${litespace(`${prefix + command} ${settingName} set`)}\n\n` +
            `📎 Kamu bisa gunakan:\n• @user → Tag pengguna\n• @pushname → Nama pengguna\n• @subject → Nama grup`
        );
        target[settingName] = target[settingName] || {};
        target[settingName].text = customText;
        return m.reply(`✅ Teks *${validSettings[settingName]}* berhasil disimpan!`);
    }
    
    if (settingValue === 'set' && settingName === 'antibadword') {
        const customText = quoted?.text;
        if (!customText) return m.reply(
            `📌 Untuk menambahkan kata-kata terlarang pada *${validSettings[settingName]}* yang nantinya akan dihapus pada grup ini.\n\n` +
            `1. Kirim pesan: _anjing,bangsat,goblok_\n` +
            `2. Balas pesan tersebut dengan perintah:\n\n` +
            `${litespace(`${prefix + command} ${settingName} set`)}\n\n` +
            `📝 Gunakan tanda koma (,) sebagai pemisah antar kata.`
        );
        target.antibadword = target.antibadword || {};
        target.antibadword.text = customText
            .split(',')
            .map(k => k.trim().toLowerCase())
            .filter(Boolean);
        const sensorVokal = (word) => word.replace(/[aiueo]/gi, '#');
        const daftarSensor = target.antibadword.text.map(sensorVokal).join(', ');
        return m.reply(
            `✅ Daftar *kata terlarang* berhasil diperbarui!\n` +
            `🔢 Jumlah kata: ${target.antibadword.text.length}\n` +
            `📋 Kata saat ini:\n${daftarSensor}`
        );
    }
    
    if (settingValue === 'del' && settingName === 'antibadword') {
        const customText = quoted?.text;
        if (!customText) return m.reply(
            `📌 Untuk *menghapus* kata-kata dari daftar *${validSettings[settingName]}*.\n\n` +
            `1. Kirim pesan: _anjing,bangsat,goblok_\n` +
            `2. Balas pesan tersebut dengan perintah:\n\n` +
            `${litespace(`${prefix + command} ${settingName} del`)}\n\n` +
            `📝 Gunakan tanda koma (,) sebagai pemisah antar kata yang ingin dihapus.`
        );
        const hapusKata = customText
            .split(',')
            .map(k => k.trim().toLowerCase())
            .filter(k => k.length > 0);

        if (!hapusKata.length) return m.reply('⚠️ Tidak ada kata yang bisa dihapus.');
        target.antibadword = target.antibadword || {};
        const sebelumnya = target.antibadword.text || [];
        const sesudah = sebelumnya.filter(k => !hapusKata.includes(k));
        const terhapus = sebelumnya.filter(k => hapusKata.includes(k));
        const daftar = sesudah.length
            ? sesudah.map((word, i) => `${i + 1}. ${word.replace(/[aeiou]/gi, '#')}`).join('\n')
            : 'Kosong';
        target.antibadword.text = sesudah;
        return m.reply(
            `🗑️ Kata berhasil dihapus!\n` +
            `- Dihapus: ${terhapus.length} kata\n` +
            `- Sisa daftar:\n${daftar}`
        );
    }
    
    if (settingValue === 'kick' && ['antilink', 'antibot', 'antibadword', 'antistatusmention'].includes(settingName)) {
        const kickState = args[2]?.toLowerCase();
        if (!['true', 'false'].includes(kickState)) {
            return m.reply('📌 Gunakan *true* untuk mengaktifkan kick, dan *false* untuk menonaktifkan.');
        }
        target[settingName] = target[settingName] || {};
        target[settingName].check = kickState === 'true';
        target[settingName].kick = kickState === 'true';
        return m.reply(`✅ Fitur *Kick otomatis* pada *${validSettings[settingName]}* berhasil di-*${kickState === 'true' ? 'aktifkan' : 'nonaktifkan'}*!`);
    }

    if (!settingValue) {
        const teks = `H-Hey! Kamu mau *${validSettings[settingName]}* ini diaktifin atau enggak, sih?!\nJangan bikin aku nunggu lama ya! 😤`;
        return m.reply({
            text: teks,
            footer: global.footer,
            buttons: [
                { buttonId: `${prefix + command} ${settingName} true`, buttonText: { displayText: '✅ Aktifkan' }, type: 1 },
                { buttonId: `${prefix + command} ${settingName} false`, buttonText: { displayText: '❌ Nonaktifkan' }, type: 1 }
            ],
            headerType: 1
        });
    }

    if (!['true', 'false'].includes(settingValue)) {
        return m.reply('📌 Gunakan *true* untuk mengaktifkan, dan *false* untuk menonaktifkan fitur.');
    }

    target[settingName] = target[settingName] || {};
    target[settingName].check = settingValue === 'true';

    return m.reply(`✅ Fitur *${validSettings[settingName]}* berhasil di- *${settingValue === 'true' ? 'aktifkan' : 'nonaktifkan'}*!`);
};

nakano.help = ['groupsetting'];
nakano.category = ['group'];
nakano.command = ['groupsetting', 'grupsetting', 'groupsett', 'grupsett', 'group', 'grup'];
nakano.group = true;
nakano.admin = true;
nakano.botAdmin = true;

module.exports = nakano;