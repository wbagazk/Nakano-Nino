const fs = require('fs');
const pino = require('pino');
const chalk = require('chalk');
const { makeInMemoryStore } = require('baileys');
const { smsg, decodeJid } = require('../../utils/myfunc');

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

const folderCase = '../../command/case';

function eventMessagesUpsert(NakanoNino) {
	NakanoNino.ev.on('messages.upsert', async chatUpdate => {
        const botNumber = decodeJid(NakanoNino.user.id);
        if (db.data.settings[botNumber]?.autoswview){
            mek = chatUpdate.messages[0];
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
                await NakanoNino.readMessages([mek.key]);
            }
        }
    });
    
    NakanoNino.ev.on('messages.upsert', async chatUpdate => {
        const botNumber = decodeJid(NakanoNino.user.id);
        if (db.data.settings[botNumber]?.autoswviewreact){
            mek = chatUpdate.messages[0];
           if (mek.key.remoteJid === 'status@broadcast') {
                try {
                    await NakanoNino.relayMessage(
                        mek.key.remoteJid, {
                            reactionMessage: {
                                key: {
                                    remoteJid: 'status@broadcast',
                                    id: mek.key.id,
                                    participant: m.key.remoteJid,
                                    fromMe: false
                                },
                                text: '💚'
                            }
                        }, {
                            messageId: m.key.id,
                            statusJidList: [m.key.remoteJid, m.key.participant]
                        }
                    );
                } catch (error) {
                    console.error('Error reacting to status:', error);
                }
            }
        }
    });
}

module.exports = { eventMessagesUpsert };

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