const fs = require('fs');
const pino = require('pino');
const chalk = require('chalk');
const { makeInMemoryStore } = require('baileys');
const { smsg, decodeJid, logMessage } = require('../library');

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

const folderCase = '../../command/case';

function eventMessagesUpsert(NakanoNino) {
    NakanoNino.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return;
            if (mek.key.fromMe) return;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            m = smsg(NakanoNino, mek, store)
            require(folderCase)(NakanoNino, m, chatUpdate, mek, store)
        } catch (err) {
            console.log(err)
        }
    })
    
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
    logMessage("🆙  Update  🆙", `${__filename}`)
    delete require.cache[file];
    require(file);
});