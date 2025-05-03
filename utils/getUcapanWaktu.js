const moment = require("moment-timezone");

function ucapanWaktu() {
    const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const date = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");

    let ucapan = "Selamat Malam 🌌";
    if (time < "05:00:00") {
        ucapan = "Selamat Pagi 🌄";
    } else if (time < "11:00:00") {
        ucapan = "Selamat Pagi 🌄";
    } else if (time < "15:00:00") {
        ucapan = "Selamat Siang 🌅";
    } else if (time < "18:00:00") {
        ucapan = "Selamat Sore 🌇";
    } else if (time < "19:00:00") {
        ucapan = "Selamat Petang 🌆";
    }
    return ucapan;
}

module.exports = ucapanWaktu;