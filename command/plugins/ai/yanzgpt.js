const axios = require('axios');

const userSessions = {};
const sessionTimeouts = {};

async function yanzgpt(query, sessionId, prompt, model = "yanzgpt-revolution-25b-v3.5") {
    try {
        if (!userSessions[sessionId]) {
            userSessions[sessionId] = [{ role: "system", content: prompt }];
        }
        userSessions[sessionId].push({ role: "user", content: query });

        if (sessionTimeouts[sessionId]) clearTimeout(sessionTimeouts[sessionId]);
        sessionTimeouts[sessionId] = setTimeout(() => {
            delete userSessions[sessionId];
            delete sessionTimeouts[sessionId];
        }, 60 * 60 * 1000);

        const response = await axios.post("https://api.yanzgpt.my.id/v1/chat", {
            messages: userSessions[sessionId],
            model
        }, {
            headers: { 
                authorization: "Bearer yzgpt-sc4tlKsMRdNMecNy", 
                "content-type": "application/json" 
            }
        });

        const reply = response.data.choices?.[0]?.message?.content || "Tidak ada respons.";
        userSessions[sessionId].push({ role: "assistant", content: reply });

        return reply;
    } catch (error) {
        console.error("Error in GPT API:", error.message);
        throw new Error("Gagal terhubung ke GPT API.");
    }
}

let handler = async (m, { text, prefix, command }) => {
	if (!text) return m.reply(`Hello, how can I help you?\nExample: ${prefix + command} Hello`);
    
    await m.react('💬'); 
    
    let quotedMessage = m.quoted ? m.quoted.text : null;
    let query = quotedMessage ? `${quotedMessage}\n\n${text}` : text;
    // let selectedModel = "yanzgpt-revolution-25b-v3.5"; // Default
    let selectedModel = "yanzgpt-legacy-72b-v3.5"; // Pro
    // let selectedModel = "yanzgpt-r1-70b-v3.5"; // Reasoning
    if (text.includes('--25b')) {
        selectedModel = "yanzgpt-revolution-25b-v3.5";
        query = query.replace('--72b', '').trim();
    } else if (text.includes('--70b')) {
        selectedModel = "yanzgpt-r1-70b-v3.5";
        query = query.replace('--70b', '').trim();
    }
    const result = await yanzgpt(query, m.sender, selectedModel);
    const answer = result || 'Maaf, saya tidak dapat memberikan jawaban saat ini.';
    
    m.reply({ text: answer })
    await m.react('🤖');
};

handler.help = ['yanzgpt'];
handler.tags = ['ai text'];
handler.command = ['yanzgpt'];

module.exports = handler;