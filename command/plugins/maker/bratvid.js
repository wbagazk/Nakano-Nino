const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { videoToWebp, writeExif } = require("../../../utils/exif"); 

let handler = async (m, { text, wbk }) => {
    if (!text) return m.reply("Masukkan teks untuk brat-nya, maksimal 10 kata ya! 😤");

    const words = text.trim().split(/\s+/);
    if (words.length > 10) return m.reply("Maksimal 10 kata aja ya Kak! 🙏");

    await m.react('⏱️');

    const tempDir = path.resolve(__dirname, '../../../temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const framePaths = [];
    const apis = [
        `https://brat.caliphdev.com/api/brat?text=`,
        `https://aqul-brat.hf.space/api/brat?text=`,
        `https://api-ghostx.biz.id/api/imagecreator/bratgenerator?text=`,
        `https://velyn.vercel.app/api/maker/brat?text=&apikey=free`,
        `https://api.suraweb.online/tools/brat?text=`,
        `https://api.siputzx.my.id/api/m/brat?text=`,
        `https://fastrestapis.fasturl.cloud/maker/brat/simple?text=&theme=white`
    ];

    let workingApi = null;
    for (let i = 0; i < apis.length; i++) {
        const testUrl = apis[i].replace('text=', `text=${encodeURIComponent(text)}`);
        const testRes = await axios.get(testUrl, { responseType: "arraybuffer", timeout: 15000 });
        if (testRes.status === 200) {
            workingApi = apis[i];
            break;
        }
    }

    if (!workingApi) return m.reply("❌ Semua API tidak bisa diakses. Silakan coba lagi nanti.");

    for (let i = 0; i < words.length; i++) {
        const textSegment = words.slice(0, i + 1).join(" ");
        const apiUrl = workingApi.replace('text=', `text=${encodeURIComponent(textSegment)}`);
        const res = await axios.get(apiUrl, { responseType: "arraybuffer", timeout: 15000 });
        const framePath = path.join(tempDir, `frame${i}.mp4`);
        fs.writeFileSync(framePath, res.data);
        framePaths.push(framePath);
    }

    const fileListPath = path.join(tempDir, "wbk.txt");
    let fileListContent = "";

    for (let i = 0; i < framePaths.length; i++) {
        fileListContent += `file '${framePaths[i]}'\n`;
        fileListContent += `duration 0.7\n`;
    }
    fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
    fileListContent += `duration 2\n`;
    fs.writeFileSync(fileListPath, fileListContent);

    const outputVideoPath = path.join(tempDir, "output.mp4");
    execSync(
        `ffmpeg -y -f concat -safe 0 -i "${fileListPath}" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p "${outputVideoPath}"`,
        { stdio: 'ignore' }
    );

    const buffer = fs.readFileSync(outputVideoPath);
    const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
        packname: packname,
        author: author
     });

    await m.reply({ sticker: { url: file } });

    await m.react('✅');

    framePaths.forEach(f => fs.existsSync(f) && fs.unlinkSync(f));
    if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
    if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath);
};

handler.help = ['bratvid'];
handler.tags = ['maker'];
handler.command = ['bratvid'];
handler.limit = true;

module.exports = handler;