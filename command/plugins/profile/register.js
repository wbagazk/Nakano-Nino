const axios = require("axios");
const canvas = require("canvas");
const { litespace } = require("@lib/library");
const { randomBytes } = require("crypto");

let nakano = async (m, { wbk, args, text, command, prefix }) => {
    const user = db.data.users[m.sender];

    if (user.register) return m.reply(`Hah?! Kamu itu... udah masukin kode verifikasi tadi, ngapain dimasukin lagi sih?! 😤\nCoba cek pakai *${prefix}profile* biar kamu inget!`);

    let [name, age] = text.split(',').map(v => v.trim());
    if (!name || !age) {
        return m.reply(`Ehh? Kamu bahkan nggak bisa isi data dengan benar?\n\nKetik ${litespace(`${prefix + command} Nama,Umur`)}\n> Contoh: ${prefix + command} Nakano,20\n\nAyo~ Daftar yg bener!!!💢`);
    }

    age = parseInt(age);
    if (isNaN(age)) return m.reply(`Apa itu... angka?! Umurmu harus angka, bukan huruf ya, baka!`);
    if (age < 8) return m.reply(`Ughh... Bocil kayak kamu belum saatnya main bareng aku. Balik sana!`);
    if (age > 35) return m.reply(`Hah?! Kamu... terlalu dewasa buat main sama kami. Cari yang seumuran, ya!`);

    await m.react('📃');
    user.cekRegister = true;
    user.name = name;
    user.age = age;

    const verifCode = randomBytes(3).toString("hex").toUpperCase(); 
    user.verifNumber = verifCode;

    const bgUrl = "https://qu.ax/wOsPu.png";
    const bgRes = await axios.get(bgUrl, { responseType: "arraybuffer" });
    const bgImage = await canvas.loadImage(bgRes.data);
    const width = bgImage.width;
    const height = bgImage.height;
    const cnv = canvas.createCanvas(width, height);
    const ctx = cnv.getContext("2d");

    ctx.drawImage(bgImage, 0, 0, width, height);
    ctx.font = "bold 200px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.fillText(verifCode, width / 2, height / 2 + 60);

    let buffer = cnv.toBuffer("image/png");
    let scale = 1.0;
    while (buffer.length > 250 * 1024 && scale > 0.4) {
        scale -= 0.1;
        const newWidth = Math.floor(width * scale);
        const newHeight = Math.floor(height * scale);
        const resizedCanvas = canvas.createCanvas(newWidth, newHeight);
        const resizedCtx = resizedCanvas.getContext("2d");
        resizedCtx.drawImage(cnv, 0, 0, newWidth, newHeight);
        buffer = resizedCanvas.toBuffer("image/png");
    }

    m.reply({
        image: buffer,
        mimetype: "image/png",
        caption: "Kirim kode di atas untuk verifikasi ya! Jangan sampai salah. ✨"
    });
};

nakano.help = ['register'];
nakano.category = ['profile'];
nakano.command = ['register', 'daftar'];

module.exports = nakano;