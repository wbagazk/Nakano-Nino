module.exports = async (wbk, m, plug) => {
    const { budy, isCreator } = plug;
    if (!isCreator && !m.key.fromMe && m.message) {
        if (budy.match(`@${global.ownerNumber}`)) {
            const messages = [
                `👋 Hai kak! Lagi nyariin *${ownerName}*, ya?\nSabar ya kak, owner mungkin lagi sibuk. Tapi tenang, nanti pasti dibalas! 😊`,
                `Halo kak! Lagi mention *${ownerName}* nih? ✨\nOwner bakal cek pesan Kamu kalau udah sempat. Semangat ya! 💪`,
                `Heyy, aku lihat Kamu manggil *${ownerName}*! 😄\nOwner mungkin lagi sibuk ngurusin hal penting. Tapi pasti bales kok, tunggu yaa! 🤗`,
                `Hmm, kayaknya ada yang nyebut nama *${ownerName}*! Jangan khawatir, Kamu akan segera direspon! 😉`,
                `Wih, ada yang mention *${ownerName}*! 🙌\nOwner pasti senang dengar dari Kamu. Nanti bakal dibales, ya! ✨`,
                `Kamu mention *${ownerName}* nih? 😋\nSabar ya kak, mungkin owner lagi ada urusan penting. Tetap stay cool! 😎`,
                `Halo kak! Mungkin *${ownerName}* lagi sibuk sebentar. Tapi tenang, owner bakal respon kalau udah sempat! 🕒`,
                `Hai hai! Lagi nyebut nama *${ownerName}*, ya? 🥰\nOwner bakal bales secepat mungkin. Sabar dikit ya kak!`,
                `Halo kak! Lagi nyari *${ownerName}*? Jangan khawatir, owner pasti bakal cek pesan Kamu nanti. Semangat terus ya! 💕`,
                `Hai kak! Kelihatannya Kamu butuh bantuan *${ownerName}*? ✨\nOwner lagi sibuk mungkin, tapi pasti bales kok. Stay positive! 😇`,
                `Wah, ada yang manggil *${ownerName}* nih! 😄\nOwner mungkin lagi meeting sama bintang-bintang. Tapi pasti bales, kok! 😌`,
                `Hmm, Kamu mention *${ownerName}*? Jangan khawatir ya! Owner bakal respon kalau udah free. Santai aja kak! 😎`,
                `Hoo~ ada yang cari *${ownerName}*! 🎉\nOwner bakal balas secepat mungkin. Tetap tenang dan minum air dulu ya, kak! 🥤`,
                `Halo kak! Lagi nyari *${ownerName}*? Jangan lupa pesan baik-baik, ya! Owner pasti bales kok kalau ada waktu. 😊`,
                `Hii, Kamu mention *${ownerName}*? Aku bakal sampein ke owner ya! Jangan lupa tunggu responnya, oke? 😇`,
                `Wah, ada yang butuh *${ownerName}*! Owner pasti bakal bantu sebisa mungkin. Nanti dibalas ya kak! 💪`,
                `Hei kak, lagi nyebut nama *${ownerName}*! Jangan panik ya, owner pasti cek pesan Kamu nanti. Stay calm! 😌`,
                `Lagi butuh *${ownerName}* nih kayaknya? Tenang kak, aku bakal sampein pesan Kamu. Tunggu balasannya ya! 🙏`,
                `Ada yang manggil *${ownerName}*! 🎉\nOwner bakal respon kok, kalau udah punya waktu. Sabar dikit ya kak!`,
                `Halo kak! Mungkin owner lagi bantu yang lain. Tapi pasti dibalas ya kak, jangan khawatir! 😊`,
                `Lagi cari *${ownerName}* ya? Owner lagi sibuk sedikit nih, nanti pasti dibales. Keep it cool kak! 😎`
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            m.reply({ text: randomMessage });
        }
    };
};