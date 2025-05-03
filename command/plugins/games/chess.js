const { Chess } = require('chess.js');

let nakano = async (m, { wbk, args, prefix }) => {
    const key = m.chat;
    wbk.chess = wbk.chess || {};
    let chessData = wbk.chess[key] || {
        gameData: null,
        fen: null,
        currentTurn: null,
        players: [],
        hasJoined: []
    };
    wbk.chess[key] = chessData;

    const { gameData, fen, currentTurn, players, hasJoined } = chessData;
    const feature = args[0]?.toLowerCase();
    const senderId = m.sender;

    if (feature === 'delete') {
        delete wbk.chess[key];
        return await wbk.sendMessage(m.chat, { text: '🏳 *Permainan catur dihentikan.*' }, { quoted: m });
    }

    if (feature === 'create') {
        if (gameData) 
            return await wbk.sendMessage(m.chat, { text: '⚠ *Permainan sudah dimulai.*' }, { quoted: m });

        chessData.gameData = {
            status: 'waiting',
            black: null,
            white: null
        };
        return await wbk.sendMessage(m.chat, { text: `🎮 *Permainan catur dimulai.*\nMenunggu pemain lain untuk bergabung.\n> Ketik *${prefix}chess join* untuk bergabung` }, { quoted: m });
    }

    if (feature === 'join') {
        if (!gameData || gameData.status !== 'waiting') {
            return await wbk.sendMessage(m.chat, { text: '⚠ *Tidak ada permainan catur yang sedang menunggu.*' }, { quoted: m });
        }
        if (players.includes(senderId)) {
            return await wbk.sendMessage(m.chat, { text: '🙅‍♂ *Anda sudah bergabung dalam permainan ini.*' }, { quoted: m });
        }
        if (players.length >= 2) {
            return await wbk.sendMessage(m.chat, { text: '👥 *Pemain sudah mencukupi.*\nPermainan otomatis dimulai.' }, { quoted: m });
        }

        players.push(senderId);
        hasJoined.push(senderId);

        if (players.length === 2) {
            gameData.status = 'ready';
            const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
            gameData.black = black;
            gameData.white = white;
            chessData.currentTurn = white;

            return await wbk.sendMessage(m.chat, { 
                text: `🙌 *Pemain yang telah bergabung:*\n${hasJoined.map(playerId => `@${playerId.split('@')[0]}`).join('\n')}\n\n⚫ *Hitam:* @${black.split('@')[0]}\n⚪ *Putih:* @${white.split('@')[0]}\n\n🕹 Silakan gunakan *${prefix}chess start* untuk memulai permainan.`,
                mentions: hasJoined 
            }, { quoted: m });
        } else {
            return await wbk.sendMessage(m.chat, { 
                text: '🙋‍♂ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.' 
            }, { quoted: m });
        }
    }

    if (feature === 'start') {
        if (!gameData || gameData.status !== 'ready') {
            return await wbk.sendMessage(m.chat, { 
                text: '⚠ *Tidak dapat memulai permainan.*\nTunggu hingga dua pemain bergabung.' 
            }, { quoted: m });
        }
        gameData.status = 'playing';
        const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        chessData.fen = fen;

        const encodedFen = encodeURIComponent(fen);
        const giliran = `🎲 *Giliran:* Putih @${gameData.white.split('@')[0]}`;
        const flipParam = senderId === gameData.black ? '' : '&flip=true';
        const flipParam2 = senderId === gameData.black ? '' : '-flip';
        const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;

        try {
            return await wbk.sendMessage(m.chat, { 
                image: { url: boardUrl }, 
                caption: giliran,
                mentions: [gameData.white]
            }, { quoted: m });
        } catch (error) {
            return await wbk.sendMessage(m.chat, { 
                image: { url: boardUrl2 }, 
                caption: giliran,
                mentions: [gameData.white]
            }, { quoted: m });
        }
    }

    if (args.length === 2) {
        if (!gameData || gameData.status !== 'playing') {
            return await wbk.sendMessage(m.chat, { 
                text: '⚠ *Permainan belum dimulai.*' 
            }, { quoted: m });
        }
        if (currentTurn !== senderId) {
            return await wbk.sendMessage(m.chat, { 
                text: `⏳ *Sekarang giliran ${currentTurn === gameData.white ? 'Putih' : 'Hitam'} untuk bergerak.*`, 
                mentions: [currentTurn]
            }, { quoted: m });
        }

        const chess = new Chess(fen);

        if (chess.isCheckmate()) {
            delete wbk.chess[key];
            return await wbk.sendMessage(m.chat, { 
                text: `🏆 *Checkmate! Pemenang:* @${m.sender.split('@')[0]}`, 
                mentions: [m.sender]
            }, { quoted: m });
        }

        if (chess.isDraw()) {
            delete wbk.chess[key];
            return await wbk.sendMessage(m.chat, { 
                text: '🤝 *Permainan berakhir seri.*' 
            }, { quoted: m });
        }

        const [from, to] = args;

        try {
            chess.move({ from, to, promotion: 'q' });
        } catch (e) {
            return await wbk.sendMessage(m.chat, { 
                text: '❌ *Langkah tidak valid.*' 
            }, { quoted: m });
        }

        chessData.fen = chess.fen();
        chessData.currentTurn = players.find(p => p !== senderId);

        const encodedFen = encodeURIComponent(chess.fen());
        const currentColor = chessData.currentTurn === gameData.white ? 'Putih' : 'Hitam';
        const giliran = `🎲 *Giliran:* ${currentColor} @${chessData.currentTurn.split('@')[0]}`;
        const flipParam = senderId === gameData.black ? '' : '&flip=true';
        const flipParam2 = senderId === gameData.black ? '' : '-flip';
        const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;

        try {
            return await wbk.sendMessage(m.chat, { 
                image: { url: boardUrl }, 
                caption: giliran,
                mentions: [chessData.currentTurn]
            }, { quoted: m });
        } catch (error) {
            return await wbk.sendMessage(m.chat, { 
                image: { url: boardUrl2 }, 
                caption: giliran,
                mentions: [chessData.currentTurn]
            }, { quoted: m });
        }
    }

    if (feature === 'help') {
        return await wbk.sendMessage(m.chat, { 
            text: `🌟 *Perintah Permainan Catur:*\n\n` +
                  `🏁 *chess create* - Mulai permainan catur\n` +
                  `👥 *chess join* - Bergabung dalam permainan catur yang sedang menunggu\n` +
                  `🎲 *chess start* - Memulai permainan jika ada dua pemain yang sudah bergabung\n` +
                  `🚫 *chess delete* - Menghentikan permainan catur\n` +
                  `🔄 *chess [dari] [ke]* - Melakukan langkah dalam permainan catur\n\n` +
                  `📌 *Contoh:*\n` +
                  `- _chess create_ → Memulai permainan catur.\n` +
                  `- _chess join_ → Bergabung dalam permainan.\n` +
                  `- _chess e2 e4_ → Melakukan langkah e2 ke e4.` 
        }, { quoted: m });
    }

    return wbk.sendMessage(m.chat, { text: '❓ Perintah tidak valid. Gunakan "chess help" untuk melihat bantuan.' }, { quoted: m });
};

nakano.help = ['chess'];
nakano.tags = ['games'];
nakano.command = ['chess', 'catur'];
nakano.group = true;

module.exports = nakano;