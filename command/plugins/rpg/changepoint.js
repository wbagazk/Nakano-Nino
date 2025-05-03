let nakano = async (m, { args, prefix, command }) => {
    let item = args[0];
    let amount = parseInt(args[1]);
    const db = global.db.data.users;
    const user = db[m.sender];

    if (!item || isNaN(amount)) {
        return m.reply(`Ih! Formatnya salah tau!! 😤 Coba dicek baik-baik deh!

Contoh yang bener tuh: *${prefix + command} limit 10*
1 Limit harganya 2000 Point, jangan sok lupa ya! 🙄`);
    }

    if (item.toLowerCase() === 'limit') {
        let totalCost = amount * 2000;
        if (user.point >= totalCost) {
            user.point -= totalCost;
            user.limit += amount;
            m.reply(`✅ *Hmph... pembeliannya berhasil sih!*
Tapi jangan seneng dulu! 😤
Kamu beli ${amount} Limit dengan harga ${totalCost} Point tuh... inget ya!

💰 Sisa Point: ${user.point}
📊 Total Limit: ${user.limit}

Jangan buang-buang point sembarangan! Aku gak bakal bantuin lagi kalau habis! 🙄`);
        } else {
            m.reply(`❌ U-uhm... kayaknya point kamu belum cukup deh... 😣
Butuh ${totalCost} Point buat beli ${amount} Limit.
💰 Point kamu sekarang cuma: ${user.point}...

Yuk semangat nabung point dulu yaa~ aku percaya kamu bisa kok! ✨`);
        }
    } else {
        m.reply(`❌ E-eh... item itu nggak ada ya... 😣
Yang bisa kamu beli sekarang cuma *limit* kok~
Coba deh pake: *${prefix + command} limit 10*

Jangan sedih ya... nanti item lainnya aku bantu tambahin~ 😳✨`);
    }
};

nakano.help = ['changepoint'];
nakano.tags = ['rpg'];
nakano.command = ['changepoint', 'cpoint'];

module.exports = nakano;