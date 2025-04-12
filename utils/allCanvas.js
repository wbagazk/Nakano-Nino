const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

exports.generateProfileImage = async function (m, wbk, db) {
    const profilePicUrl = await wbk.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
    const userName = await wbk.getName(m.sender);
    const userData = db.data.users[m.sender] || { level: 0, exp: 0 };

    const background = await loadImage(path.join(__dirname, '../src/media/profile.png'));
    const maxExp = 2500, maxWidth = 400, profileSize = 72, barWidth = 240, barHeight = 24;

    const scaleFactor = maxWidth / background.width;
    const newWidth = background.width * scaleFactor;
    const newHeight = background.height * scaleFactor;
    const canvasSize = Math.max(newWidth, newHeight);
    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(background, 0, 0, newWidth, newHeight);

    const profilePic = await loadImage(profilePicUrl);
    const profileX = 32, profileY = 17;
    const nameLevelX = profileX + profileSize + 15;
    const nameLevelY = profileY + profileSize / 2 - 6;

    ctx.save();
    ctx.beginPath();
    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profilePic, profileX, profileY, profileSize, profileSize);
    ctx.restore();

    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(userName, nameLevelX, nameLevelY);
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Level ${userData.level}`, nameLevelX, nameLevelY + 20);

    const barX = (newWidth - barWidth) / 2;
    const barY = newHeight - 40;
    const progressWidth = (userData.exp / maxExp) * barWidth;

    ctx.fillStyle = "white";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "orange";
    ctx.fillRect(barX, barY, progressWidth, barHeight);

    ctx.fillStyle = "black";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${userData.exp} / ${maxExp}`, newWidth / 2, barY + barHeight / 1.5);

    if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');

    let quality = 0.8;
    let buffer = canvas.toBuffer('image/jpeg', { quality });
    while (buffer.length / 1024 > 300 && quality > 0.5) {
        quality -= 0.05;
        buffer = canvas.toBuffer('image/jpeg', { quality });
    }
    return buffer;
};

exports.generateImageWithNumbers = async function (levelBefore, levelAfter, timestamp) {
    const imagePath = path.join(__dirname, '../src/media/levelup.png');
    const image = await loadImage(imagePath);
    const maxWidth = 800;
    const scaleFactor = maxWidth / image.width;
    const newWidth = image.width * scaleFactor;
    const newHeight = image.height * scaleFactor;

    const canvas = createCanvas(newWidth, newHeight);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    ctx.fillStyle = 'brown';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(botName.toUpperCase(), newWidth / 2, newHeight * 0.175);
    ctx.textBaseline = 'middle';

    const circles = [
        { x: newWidth * 0.335, y: newHeight * 0.55, number: levelBefore },
        { x: newWidth * 0.665, y: newHeight * 0.55, number: levelAfter }
    ];

    ctx.fillStyle = 'white';
    ctx.font = 'bold 50px Arial';
    circles.forEach(({ x, y, number }) => ctx.fillText(number, x, y));

    ctx.fillStyle = 'brown';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(timestamp, newWidth / 2, newHeight * 0.85);

    let quality = 0.8;
    let buffer = canvas.toBuffer('image/png', { quality });
    let fileSize = buffer.length / 1024;

    while (fileSize > 300 && quality > 0.5) {
        quality -= 0.05;
        buffer = canvas.toBuffer('image/png', { quality });
        fileSize = buffer.length / 1024;
    }
    return buffer;
};