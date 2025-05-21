const fs = require('fs');
const path = require('path');
const { logMessage } = require('../lib/library')

// ==================================================
// HEHEHE BANYAK, BIAR THUMBNAILNYA GANTI-GANTI
global.image = {
    main: fs.readFileSync(path.join(__dirname, '../src/media/thumbnail.jpeg')),
    thumb: [
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail1.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail2.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail3.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail4.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail5.jpeg')),
        fs.readFileSync(path.join(__dirname, '../src/media/thumbnail6.jpeg'))
    ],
    thumbmusic: fs.readFileSync(path.join(__dirname, '../src/media/thumb-music.jpg')),
    thumbrpg: fs.readFileSync(path.join(__dirname, '../src/media/thumb-rpg.jpg')),
    avatar: fs.readFileSync(path.join(__dirname, '../src/media/avatar.png')),
    status: {
        error: fs.readFileSync(path.join(__dirname, '../src/media/error.png')),
    	denied: fs.readFileSync(path.join(__dirname, '../src/media/accessdenied.png')),
        detectbot: fs.readFileSync(path.join(__dirname, '../src/media/detectedBot.png')),
        detectlink: fs.readFileSync(path.join(__dirname, '../src/media/detectedLink.png')),
        detectbadword: fs.readFileSync(path.join(__dirname, '../src/media/detectedBadword.png')),
        detectspam: fs.readFileSync(path.join(__dirname, '../src/media/detectedSpam.png')),
    },
    thumbUrl: [
        "https://qu.ax/epDkj.jpeg", "https://qu.ax/KzVqU.jpeg",
        "https://qu.ax/noTwC.jpeg", "https://qu.ax/XNwUD.jpg",
        "https://qu.ax/voCyG.jpeg", "https://qu.ax/KqtWr.jpeg"
    ],
    errorUrl: "https://files.catbox.moe/rclqvi.jpeg"
};
// ==================================================

//=========================================================
// NOTif CONSOLE
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});