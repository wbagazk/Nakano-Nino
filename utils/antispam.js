const COOLDOWN_TIME = 5000       // Cooldown 5 detik
const MAX_SPAM = 5               // Maksimal 5x spam berturut-turut
const BAN_TIME = 30000           // Banned selama 30 detik
const SEND_TIME = 30000          // Reset spam count jika user tidak kirim command selama 30 detik

const cooldown = new Map()
const spamCount = new Map()
const lastMessage = new Map()
const banned = new Map()

function checkAntiSpam(sender) {
    const now = Date.now()

    if (banned.has(sender)) {
        const banTimeLeft = BAN_TIME - (now - banned.get(sender))
        if (banTimeLeft > 0) {
            return { status: 'banned', banTimeLeft }
        } else {
            banned.delete(sender) 
        }
    }

    const lastUsed = cooldown.get(sender) || 0
    if (now - lastUsed < COOLDOWN_TIME) {
        const waitTime = COOLDOWN_TIME - (now - lastUsed)
        return { status: 'cooldown', waitTime }
    }

    const lastMsgTime = lastMessage.get(sender) || 0
    if (now - lastMsgTime > SEND_TIME) {
        spamCount.set(sender, 0)
    }

    const spamTimes = spamCount.get(sender) || 0
    if (spamTimes + 1 >= MAX_SPAM) {
        banned.set(sender, now)
        spamCount.set(sender, 0)
        return { status: 'ban_triggered' }
    }

    cooldown.set(sender, now)
    spamCount.set(sender, spamTimes + 1)
    lastMessage.set(sender, now)

    return { status: 'ok' }
}

function resetSpam(sender) {
    spamCount.set(sender, 0)
}

module.exports = { checkAntiSpam, resetSpam }