const fs = require('fs');
const { logMessage } = require('../lib/library')

//=========================================================
// SETTING GITHUB CDN
global.githubCDN = {
    user: "IyaaTauKamuPro", // Ganti dengan username GitHub
    repo: "cdn", // Ganti dengan nama repositori
    token: "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" // Ganti dengan token, ambil di > https://github.com/settings/tokens/new
}

// SETTING ORDER KUOTA >>> CEK OKECONNECT
global.orderkuota = {
    merchant: "OK388034",
    member: "OK388034",
    pin: "8494",
    password: "bagas160803",
    apikey: "78158691734266400388034OKCTE76864479794F4D03852E967B0E84211",
    qrcode: "00020101021226670016COM.NOBUBANK.WWW01189360050300000879140214459472381924500303UMI51440014ID.CO.QRIS.WWW0215ID20222129272240303UMI520448145303360540115802ID5914BAGAZ STORE ID6006JEMBER61056811162070703A0163049B3E"
}

// SETTING ALL APIKEY
global.apikey = {
    atlantic: "a9hhabZO0mxXRBWRNZm3B9qZtaRN1yKwPH5DMzkoQTXmzxSIeIGe9JI5M5C8nhwTPZflXLIqJKIPJi3D8Gupdjpjz0i8gAhbgRaj",
    groqapi: "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",
    openaiapi: "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",
    geminiapi: "AIzaSyCPUPUKIselvwuqo8x09O_OCuqcsbPuWik",
    mistral: "g59Th8VvkAmp8N8mdCVfZmHUSmojpuD6"
};

// SETTING API
global.api = {
    siputzx: "https://api.siputzx.my.id/api",
    fastrestapis: "https://fastrestapis.fasturl.cloud",
    betabotz: {
        url: "https://api.betabotz.eu.org/api",
        key: "WBKApikey"
    }
};
//=========================================================

//=========================================================
// NOTif CONSOLE
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});