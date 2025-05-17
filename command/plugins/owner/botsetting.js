const { litespace } = require('../../../utils/myfunc');
const { sendButtonText } = require('../../../utils/messageButton');

let nakano = async (m, { wbk, args, prefix, command, botNumber, db }) => {
    const settingName = args[0]?.toLowerCase();
    const settingValue = args[1]?.toLowerCase();

    const validSettings = {
        onlyRegister: 'Only Register',
        anticall: 'Anti Call',
        antispam: 'Anti Spam',
        autoread: 'Auto Read',
        autorecordtype: 'Auto Record & Typing',
        autorecord: 'Auto Record',
        autotype: 'Auto Typing',
        autobio: 'Auto Bio',
        autoswview: 'Auto SW View',
        autoswviewreact: 'Auto SW View Reaction',
        badword: 'Badword',
        autobackup: 'Auto Backup',
        autoclearsession: 'Auto Clear Session',
        autocleartemp: 'Auto Clear Temp',
    };

    const specialSettings = ['autobackup', 'autoclearsession', 'autocleartemp'];
    
    const label = validSettings[settingName];
    const settings = db.data.settings[botNumber];
    
    const parseTimeToExpression = (str) => {
        const jam = str.match(/(\d+)\s*jam/i)?.[1];
        const menit = str.match(/(\d+)\s*menit/i)?.[1];
        const detik = str.match(/(\d+)\s*detik/i)?.[1];
        const parts = [];
        if (jam) parts.push(`${jam} * 60 * 60 * 1000`);
        if (menit) parts.push(`${menit} * 60 * 1000`);
        if (detik) parts.push(`${detik} * 1000`);
        return parts.join(' + ') || '0';
    };

    db.data.settings[botNumber] = db.data.settings[botNumber] || {};

    if (settingName === 'check') {
        const target = db.data.settings[botNumber];
        const convertMillisToTime = (milliseconds) => {
            const hours = Math.floor(milliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
            let timeString = '';
            if (hours > 0) timeString += `${hours} jam `;
            if (minutes > 0) timeString += `${minutes} menit `;
            if (seconds > 0) timeString += `${seconds} detik`;
            return timeString || 'Tidak ada interval';
        };
        const statusList = Object.keys(validSettings).map(fitur => {
            let val;
            let intervalInfo = '';
            if (specialSettings.includes(fitur)) {
                val = target[fitur]?.check === true;
                if (target[fitur]?.interval) {
                    intervalInfo = `\n> Interval: ${convertMillisToTime(target[fitur].interval)}`;
                }
            } else {
                val = target[fitur] === true;
            }
            const status = val ? '✅ Aktif' : '❌ Nonaktif';
            return `• ${validSettings[fitur]}: ${status}${intervalInfo}`;
        }).join('\n');
        const teks = `${litespace('STATUS PENGATURAN BOT')}\n\n${statusList}`;
        return m.reply(teks);
    }
    
    if (settingName === 'all' && ['true', 'false'].includes(settingValue)) {
        const status = settingValue === 'true';
        for (const key of Object.keys(validSettings)) {
            if (specialSettings.includes(key)) {
                settings[key] = settings[key] || {};
                settings[key].check = status;
            } else {
                settings[key] = status;
            }
        }
        return m.reply(`✅ Semua fitur berhasil di-*${status ? 'aktifkan' : 'nonaktifkan'}*!`);
    }


    if (!settingName || !validSettings[settingName]) {
        const sections = [
            {
                title: '🔍 Kontrol Umum',
                rows: [
                    {
                        header: '📋 Lihat Status',
                        title: 'Tampilkan semua pengaturan fitur bot saat ini',
                        id: `${prefix + command} check`
                    },
                    {
                        header: '✅ Aktifkan Semua',
                        title: 'Aktifkan semua fitur bot sekaligus',
                        id: `${prefix + command} all true`
                    },
                    {
                        header: '❌ Nonaktifkan Semua',
                        title: 'Nonaktifkan semua fitur bot sekaligus',
                        id: `${prefix + command} all false`
                    }
                ]
            },
            ...Object.keys(validSettings).map(key => ({
                title: `⚙️ Pengaturan: ${key}`,
                rows: [
                    {
                        header: '✅ Aktifkan',
                        title: `Aktifkan fitur ${validSettings[key]}`,
                        id: `${prefix + command} ${key} true`
                    },
                    {
                        header: '❌ Nonaktifkan',
                        title: `Nonaktifkan fitur ${validSettings[key]}`,
                        id: `${prefix + command} ${key} false`
                    },
                    ...(specialSettings.includes(key) ? [{
                        header: '⏱️ Atur Interval',
                        title: `Setel interval ${validSettings[key]}`,
                        id: `${prefix + command} ${key} interval`
                    }] : [])
                ]
            }))
        ];

        const button = [{
            name: "single_select",
            buttonParamsJson: JSON.stringify({
                title: "🔧 Pengaturan Bot",
                sections
            })
        }];

        const teks = `${litespace("BOT SETTINGS")}\n\n📌 Atur pengaturan bot sesuai kebutuhanmu dengan tombol berikut.`;
        return sendButtonText(wbk, m.chat, button, teks, global.footer, m);
    }

    if (!settingValue) {
        const teks = `H-Hey! Kamu mau *${label}* ini diaktifin atau enggak, sih?!\nJangan bikin aku nunggu lama ya! 😤`;
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

    if (specialSettings.includes(settingName) && settingValue === 'interval') {
        const timeText = args.slice(2).join(' ');
        const expression = parseTimeToExpression(timeText);
        let interval;
        try {
            interval = Function('"use strict"; return (' + expression + ')')();
        } catch (e) {
            return m.reply('❌ Ekspresi waktu tidak valid.');
        }
        if (!interval || interval < 10000) {
            return m.reply(`⏱️ Format waktu yang kamu masukkan salah atau terlalu singkat! Pastikan formatnya *3 jam 20 menit 10 detik*

Cara penggunaan:
Gunakan perintah berikut untuk mengatur interval:
*${prefix + command} ${settingName} interval 3 jam 20 menit 10 detik*`);
        }
        settings[settingName] = settings[settingName] || {};
        settings[settingName].interval = interval;
        return m.reply(`✅ Interval untuk *${label}* berhasil diatur menjadi *${timeText}*`);
    }

    if (!['true', 'false'].includes(settingValue)) {
        return m.reply('📌 Gunakan *true* untuk mengaktifkan, *false* untuk nonaktifkan, atau *interval <durasi>* untuk mengatur waktu.');
    }

    const status = settingValue === 'true';

    if (specialSettings.includes(settingName)) {
        settings[settingName] = settings[settingName] || {};
        settings[settingName].check = status;
    } else {
        settings[settingName] = status;
    }

    return m.reply(`✅ Fitur *${label}* berhasil di- *${status ? 'aktifkan' : 'nonaktifkan'}*!`);
};

nakano.help = ['botsetting'];
nakano.tags = ['owner'];
nakano.command = ['botsetting', 'botsett'];
nakano.owner = true;

module.exports = nakano;