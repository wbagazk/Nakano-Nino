let nakano = async (m, { text, prefix, command, args, botNumber, db }) => {
    const q = text.trim().toLowerCase();
    const settingsKey = {
        autoread: 'Auto Read',
        autorecordtype: 'Auto Record & Typing',
        autorecord: 'Auto Record',
        autotype: 'Auto Typing',
        autobio: 'Auto Bio',
        badword: 'Badword'
    };

    if (!settingsKey[command]) return;

    const settingPath = db.data.settings[botNumber];
    const label = settingsKey[command];
    
    if (!args[0]) {
        const teks = `H-Hey! Kamu mau ${label} ini diaktifin atau enggak, sih?!\nJangan bikin aku nunggu lama ya! 😤`;
        return m.reply({
            text: teks,
            footer: global.footer,
            buttons: [
                { buttonId: `${prefix + command} true`, buttonText: { displayText: '✅ Aktifkan' }, type: 1 },
                { buttonId: `${prefix + command} false`, buttonText: { displayText: '❌ Nonaktifkan' }, type: 1 }
            ],
            headerType: 1
        })
    }

    if (q === 'true') {
        settingPath[command] = true;
        return m.reply(`${label} berhasil diaktiffkan!`);
    } else if (q === 'false') {
        settingPath[command] = false;
        return m.reply(`${label} berhasil dinonaktifkan!`);
    } else {
        return m.reply(`Input tidak valid. Gunakan true/false`);
    }
};

nakano.help = ['autoread', 'autorecordtype', 'autorecord', 'autotype', 'autobio', 'badword'];
nakano.tags = ['owner'];
nakano.command = ['autoread', 'autorecordtype', 'autorecord', 'autotype', 'autobio', 'badword'];
nakano.owner = true;

module.exports = nakano;