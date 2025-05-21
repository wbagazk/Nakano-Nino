const fs = require('fs');
const path = require('path');

const errorPath = path.join(__dirname, '../../src/data/function/fiturerror.json');

// Ambil data dari file JSON
const getErrorData = () => {
    try {
        if (!fs.existsSync(errorPath)) {
            fs.writeFileSync(errorPath, JSON.stringify({ listerror: [], listcmdblock: [] }, null, 2));
        }
        const fileContent = fs.readFileSync(errorPath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Validasi properti
        if (!data.listerror) data.listerror = [];
        if (!data.listcmdblock) data.listcmdblock = [];
        return data;
    } catch (e) {
        console.error('[ERROR] Failed to read fiturerror.json, creating new one:', e);
        const freshData = { listerror: [], listcmdblock: [] };
        saveErrorData(freshData);
        return freshData;
    }
};

// Simpan data kembali ke file JSON
const saveErrorData = (data) => {
    try {
        fs.writeFileSync(errorPath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('[ERROR] Failed to write fiturerror.json:', e);
    }
};

// Cek apakah error sudah pernah terjadi
const checkError = (message) => {
    const { listerror } = getErrorData();
    return listerror.some(e => e.error === message);
};

// Tambahkan error baru ke database
const addError = (message, command, plugin, sender, type, level = 'error') => {
    let data;
    try {
        data = getErrorData();
        if (!Array.isArray(data.listerror)) data.listerror = [];
    } catch (e) {
        data = { listerror: [], listcmdblock: [] };
    }

    const log = {
        error: message,
        command,
        plugin,
        sender,
        type,
        level,
        date: new Date().toISOString()
    };

    data.listerror.push(log);
    saveErrorData(data);

    // Log tambahan
    console.log(`[ADD ERROR] "${message}" from command "${command}" in plugin "${plugin}"`);
};

// Tambahkan command ke daftar block jika error terus
const addblockcmd = (command, plugin) => {
    const data = getErrorData();
    let found = data.listcmdblock.find(e => e.command === command && e.plugin === plugin);
    if (found) {
        found.attempt++;
    } else {
        data.listcmdblock.push({ command, plugin, attempt: 1 });
    }
    saveErrorData(data);

    console.log(`[BLOCK CMD] ${command} in ${plugin} | attempt: ${found ? found.attempt : 1}`);
};

// Cek apakah command sudah diblock karena error 3x
const isCommandBlocked = (command, plugin) => {
    const data = getErrorData();
    const found = data.listcmdblock.find(e => e.command === command && e.plugin === plugin);
    return found && found.attempt >= 3;
};

// Kirim notifikasi error ke owner
const Failed = async (command, plugin, message, m, wbk) => {
    console.log(`[PLUGIN ERROR] ${command} at ${plugin}: ${message}`);
    const errMsg = `
⚠️ *COMMAND ERROR NOTIFY*

📁 *Plugin:* ${plugin}
💬 *Command:* ${command}
👤 *User:* @${m.sender.split("@")[0]}
🗂 *Chat:* ${m.isGroup ? m.chat : 'Private Chat'}
🕓 *Waktu:* ${new Date().toLocaleString()}
📄 *Error Message:*

\`\`\`${message}\`\`\``.trim();

    await wbk.sendMessage(global.creator, {
        text: errMsg,
        mentions: [m.sender]
    });
};

module.exports = {
    checkError,
    addError,
    addblockcmd,
    isCommandBlocked,
    Failed
};