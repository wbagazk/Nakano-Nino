const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const { writeExif } = require("../../../utils/exif");

const folderFont = path.join(__dirname, '../../../src/font');

async function downloadFont(url, path) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(path, Buffer.from(response.data));
}

async function cewebrat(teks) {
    if (!fs.existsSync(folderFont)) fs.mkdirSync(folderFont, { recursive: true });

    const fontPath = path.join(folderFont, 'font-nulis.ttf');
    const fontUrl = 'https://files.catbox.moe/4dk4b8.ttf';

    if (!fs.existsSync(fontPath)) await downloadFont(fontUrl, fontPath);
    registerFont(fontPath, { family: 'wbkFont-BaksoDaging' });

    const tmpImgPath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.jpg`);

    const response = await axios.get('https://files.catbox.moe/vkoaby.jpg', { responseType: 'arraybuffer' });
    fs.writeFileSync(tmpImgPath, Buffer.from(response.data));

    try {
        const img = await loadImage(tmpImgPath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const paper_x = img.width * 0.285;
        const paper_y = img.height * 0.42;
        const paper_width = img.width * 0.42;
        const paper_height = img.height * 0.32;

        let font_size = Math.min(paper_width / 7.5, paper_height / 3.5);
        ctx.font = `${font_size}px wbkFont-BaksoDaging`;
        ctx.fillStyle = 'black';

        const max_width = paper_width * 0.88;
        const words = teks.split(' ');
        let lines = [], line = '';

        for (let word of words) {
            const test_line = line + (line ? ' ' : '') + word;
            const test_width = ctx.measureText(test_line).width;

            if (test_width > max_width && line) {
                lines.push(line);
                line = word;
            } else {
                line = test_line;
            }
        }
        if (line) lines.push(line);

        while (lines.length * font_size > paper_height * 0.85) {
            font_size -= 2;
            ctx.font = `${font_size}px wbkFont-BaksoDaging`;

            lines = [];
            line = '';
            for (let word of words) {
                const test_line = line + (line ? ' ' : '') + word;
                const test_width = ctx.measureText(test_line).width;

                if (test_width > max_width && line) {
                    lines.push(line);
                    line = word;
                } else {
                    line = test_line;
                }
            }
            if (line) lines.push(line);
        }

        const line_height = font_size * 1.15;
        const text_height = lines.length * line_height;
        const textStartY = paper_y + (paper_height - text_height) / 2 + (lines.length > 2 ? 270 : 275);

        ctx.save();
        ctx.translate(paper_x + paper_width / 2 + 24, textStartY);
        ctx.rotate(0.12);
        ctx.textAlign = 'center';

        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 0, i * line_height);
        }
        ctx.restore();

        return canvas.toBuffer();
    } finally {
        if (fs.existsSync(tmpImgPath)) fs.unlinkSync(tmpImgPath);
    }
}

let handler = async (m, { text, command, prefix }) => {
    if (!text) return m.reply(`Contoh: ${prefix + command} Hai kak`);

    await m.react('⏱️');

    const buffer = await cewebrat(text);
    const file = await writeExif({ data: buffer, mimetype: 'image/jpeg' }, {
        packname: packname,
        author: author
    });

    await m.reply({ sticker: { url: file } });
    await m.react('✅');
};

handler.help = ['cewebrat'];
handler.tags = ['maker'];
handler.command = ['cewebrat', 'cwebrat', 'cwkbratt', 'cewekbrat'];
handler.limit = true;

module.exports = handler;
