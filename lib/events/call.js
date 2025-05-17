const fs = require('fs');
const chalk = require('chalk');
const { decodeJid } = require('../../utils/myfunc');

function eventCall(NakanoNino) {    
    NakanoNino.ev.on('call', async (call) => {
        const botNumber = decodeJid(NakanoNino.user.id);
        if (db.data.settings[botNumber]?.anticall) {
            for (let id of call) {
                if (id.status === 'offer') {
                    const mention = `@${id.from.split('@')[0]}`;
                    await NakanoNino.sendMessage(id.from, { 
                        text: `Maaf ya, kami nggak bisa menerima panggilan *${id.isVideo ? 'video' : 'suara'}* saat ini. 🙏\nKalau ${mention} butuh bantuan, langsung hubungi owner aja ya! 😊`, 
                        mentions: [id.from] 
                    });
                    await NakanoNino.rejectCall(id.id, id.from);
                }
            }
        }
    });
}

module.exports = { eventCall };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  SYSTEM LOG  🌟`)));
    console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🆙  FILE UPDATE  🆙`)));
    console.log(chalk.yellowBright(`📑  ${"FILE".padEnd(20)}  : ${__filename.toUpperCase()}  `));
    console.log(chalk.greenBright(`📝  ${"MESSAGE".padEnd(20)}  : Changes have been applied!  ✅`));
    console.log(chalk.white("------------------------------------------"));
    delete require.cache[file];
    require(file);
});