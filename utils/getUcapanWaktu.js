const moment = require("moment-timezone");

function getUcapanWaktu() {
    const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const date = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");

    let ucapanWaktu = "Selamat Malam 🌌";
    if (time < "05:00:00") {
        ucapanWaktu = "Selamat Pagi 🌄";
    } else if (time < "11:00:00") {
        ucapanWaktu = "Selamat Pagi 🌄";
    } else if (time < "15:00:00") {
        ucapanWaktu = "Selamat Siang 🌅";
    } else if (time < "18:00:00") {
        ucapanWaktu = "Selamat Sore 🌇";
    } else if (time < "19:00:00") {
        ucapanWaktu = "Selamat Petang 🌆";
    }

    return { ucapanWaktu, time, date };
}

module.exports = getUcapanWaktu;