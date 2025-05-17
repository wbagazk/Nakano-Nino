const { register, registerIP, resetNumber, resetPassword, deleteUser, generateAndSaveNewKey, getKey } = require("@wbagazk/wbk-security");

let nakano = async (m, { wbk, text, args, prefix, command, isOwner }) => {

    if (args[0] === 'register') {
        if (!args[1]) return m.reply(`Contohnya kayak gini ya kak\n> ${prefix + command} register username|password|nomorBot`)
        const [username, password, number] = args[1].split('|')
        if (!username || !password || !number) {
            return m.reply(`Hmm formatnya salah nih kak, coba ikutin ini ya\n> ${prefix + command} register username|password|nomorBot`)
        }
        try {
            const result = await register(username, password, number)
            const registerSukses = `Yatta~ ✅ Berhasil daftar akun kamu kak! 🎉  
Berikut data yang aku simpen yaa~ 💾

👤 *Username:* ${username}  
🔑 *Password:* ${password}  
📱 *Nomor:* ${number}  

Jaga baik-baik datanya ya kak~ jangan sampai hilang~ 😘💕
			`
            return m.reply(registerSukses)
            
        } catch (error) {
            let errorMessage = `Huhu gagal daftar nih kak: ${error.message}`
            if (error.message.includes('users_username_key')) {
                errorMessage = `Username *${username}* udah dipake orang lain nih kak 😢 cobain yang lain ya~`
            } else if (error.message.includes('users_number_key')) {
                errorMessage = `Nomor *${number}* udah kepake juga 😵 coba masukin nomor lain ya kak!`
            }
            return m.reply(errorMessage)
        }

    } else if (args[0] === 'register-ip') {
        if (!args[1]) return m.reply(`Mau daftar IP ya kak? Contohnya kayak gini nih\n> ${prefix + command} register-ip ipAddress`)
        const ip = args[1]
        if (!ip) {
            return m.reply(`Formatnya salah nih kak~ coba ketik kayak gini\n> ${prefix + command} register-ip ipAddress`)
        }
        try {
            const result = await registerIP(ip)
            return m.reply(`Horeee~ ✅ IP-nya udah berhasil kakak daftarin~ 📡 

🎯 *IP Address:* ${ip}  
📌 *Status:* ${result}  

Makasih udah percaya sama aku ya kak~ 💕`)
        } catch (error) {
            let errorMessage = `Yah gagal deh: ${error.message}`
            if (error.message.includes('allowed_ips_ip_key')) {
                errorMessage = `IP *${ip}* udah ada kak 😣 coba yang lain yaa`
            }
            return m.reply(errorMessage)
        }

    } else if (args[0] === 'reset-nomor') {
        if (!args[1]) return m.reply(`Contohnya gini ya kak\n> ${prefix + command} reset-nomor username|password|nomorbaru`)
        const [username, password, newNumber] = args[1].split('|')
        if (!username || !password || !newNumber) {
            return m.reply(`Kayaknya formatnya kurang tepat deh kak, coba\n> ${prefix + command} reset-nomor username|password|nomorBaru`)
        }
        if (!/^62\d+$/.test(newNumber)) {
            return m.reply('Nomor barunya harus diawali 62 ya kak, jangan 08~')
        }
        try {
            const result = await resetNumber(username, password, newNumber)
			return m.reply(`Yosh! 🔄 Nomor kamu berhasil diganti loh kak~ ✨  

👤 *Username:* ${username}  
📱 *Nomor Baru:* ${newNumber} 

Semangat terus yaa kakak! Aku dukung kamu~ 💪💕`)

        } catch (error) {
            return m.reply(`Ehh gagal ubah nomor nih kak: ${error.message}`)
        }

    } else if (args[0] === 'reset-password') {
        if (!args[1]) return m.reply(`Contohnya gini ya kak\n> ${prefix + command} reset-password username|passwordLama|passwordBaru`)
        const [username, oldPassword, newPassword] = args[1].split('|')
        if (!username || !oldPassword || !newPassword) {
            return m.reply(`Aduh formatnya kurang pas nih kak, coba\n> ${prefix + command} reset-password username|passwordLama|passwordBaru`)
        }
        try {
            const result = await resetPassword(username, oldPassword, newPassword)
			return m.reply(`Hehe~ 🔐 Password kamu berhasil diganti loh kak~ ✨  

👤 *Username:* ${username}  
🔑 *Password Lama:* ${oldPassword}  
🆕 *Password Baru:* ${newPassword}

Jangan lupa disimpan baik-baik yaa~ aku jagain dari jauh~ 💖`)

        } catch (error) {
            return m.reply(`Gagal ubah passwordnya nih kak: ${error.message}`)
        }

    } else if (args[0] === 'delete-user') {
        if (!args[1]) return m.reply(`Contohnya kayak gini ya\n> ${prefix + command} delete-user username|password`)
        const [username, password] = args[1].split('|')
        if (!username || !password) {
            return m.reply(`Formatnya salah kak, coba\n> ${prefix + command} delete-user username|password`)
        }
        try {
            const result = await deleteUser(username, password)
			return m.reply(`Aduh~ 😢 Kamu yakin mau hapus akun ini kak?

👤 *Username:* ${username}  
🔑 *Password:* ${password}  
${result}  

Semoga kita bisa ketemu lagi ya~ Jangan lupa tetap semangat dan jaga diri! 💖`)

        } catch (error) {
            return m.reply(`Gagal hapus akun kak 😭: ${error.message}`)
        }

    } else if (args[0] === 'setkey') {
        if (!isOwner) return
        if (!args[1]) return m.reply(`Mau buat key ya kak? Nih contohnya\n> ${prefix + command} setkey WBK|100|10`)
        let [customKey, maxUsed, expiresInHours] = args[1].split('|').map(v => v?.trim())
        try {
            maxUsed = maxUsed ? parseInt(maxUsed) : null
            expiresInHours = expiresInHours ? parseInt(expiresInHours) : null
            const newKey = await generateAndSaveNewKey({
                customKey: customKey || null,
                maxUsed: isNaN(maxUsed) ? null : maxUsed,
                expiresInHours: isNaN(expiresInHours) ? null : expiresInHours
            })
            return m.reply(`Horee~ Key-nya berhasil dibuat ya kak!

Password: ${newKey.password || newKey}
Bisa dipake: ${maxUsed || 1}x
Berlaku selama: ${expiresInHours ? `${expiresInHours} jam` : 'selamanya~'}`)
        } catch (err) {
            console.error(err)
            return m.reply(`Huhu gagal bikin key kak: ${err.message}`)
        }

    } else if (args[0] === 'getkey') {
        try {
            const result = await getKey()
            let caption = `Kyaa~ ini dia key-nya kak! 🌟

🔑 *Key:* ${result.password}  
⌛ *Udah dipake:* ${result.used}x  
📊 *Maksimal Pemakaian:* ${typeof result.max_used === 'number' ? result.max_used + 'x' : 'Unlimited'}  

Jangan lupa jaga key-nya ya, semoga sukses terus! 💖`
            let button = [{
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "COPY KEY",
                    id: result.password,
                    copy_code: result.password
                })
            }]
            await wbk.sendButtonText(m.chat, button, caption, global.footer, m)
        } catch (error) {
            return m.reply({ text: `Gagal ambil key-nya kak 😣: ${error.message}` })
        }

    } else {
        return m.reply(`Hai kak @${m.sender.split("@")[0]}~ ✨  
Selamat datang di *NAKANO*, tempatnya pendaftaran akun dengan penuh cinta~ 💌. Yuk mulai petualanganmu bareng aku dengan daftar dulu yaa! 💫

📋 Pilih salah satu perintah di bawah ini:

> • ${prefix + command} register
> • ${prefix + command} register-ip
> • ${prefix + command} reset-nomor
> • ${prefix + command} reset-password
> • ${prefix + command} delete-user
> • ${prefix + command} getkey 

Kalau ada yang bingung, panggil aku aja ya kak~ aku siap bantu kok~ 😘💕
Owner: @${global.creator.split("@")[0]}`, false, true)
    }
}

nakano.help = ['nakano']
nakano.tags = ['main']
nakano.command = ['nakano']

module.exports = nakano