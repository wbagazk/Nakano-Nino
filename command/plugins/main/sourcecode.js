let nakano = async (m, { wbk }) => {
    let caption = `Hay Kak @${m.sender.split("@")[0]} 👋

Source code/script Bot ini gratis, Silahkan akses dan unduh melalui tautan dibawah ini

*_https://github.com/wbagazk/Nakano-Nino/_*
> ${global.footer}
•----------------------------------•`
    m.reply({
        product: {
            productImage: { url: "https://files.catbox.moe/21e5n2.png" },
            productImageCount: 1,
            title: `SOURCE CODE BOT`,
            description: "",
            priceAmount1000: 0 * 1000,
            currencyCode: "IDR",
            retailerId: "100000",
            url: `https://wa.me/${global.botNumber}`,
        },
        businessOwnerJid: m.sender,
        caption: caption,
        title: "Free",
        media: true,
        viewOnce: true,
        shop: "WA",
        id: "689739h2dgshG",
        ephemeralExpiration: m.expiration
    });
    await m.react('💵');
};

nakano.help = ['sourcecode'];
nakano.tags = ['main'];
nakano.command = ['sourcecode', 'sc', 'script'];

module.exports = nakano;