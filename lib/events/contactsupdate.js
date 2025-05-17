const fs = require('fs');
const pino = require('pino');
const chalk = require('chalk');
const { makeInMemoryStore } = require('baileys');

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

function eventContactsUpdate(NakanoNino) {
    NakanoNino.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = NakanoNino.decodeJid(contact.id);
            if (store && store.contacts) {
                store.contacts[id] = {
                    id,
                    name: contact.notify
                };
            }
        }
    });
}

module.exports = { eventContactsUpdate };

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