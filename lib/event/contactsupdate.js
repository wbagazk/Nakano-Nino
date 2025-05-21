const fs = require('fs');
const pino = require('pino');
const chalk = require('chalk');
const { makeInMemoryStore } = require('baileys');
const { logMessage } = require('../../lib/library')

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
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});