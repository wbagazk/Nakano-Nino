const os = require('os');
const nou = require('node-os-utils');
const { formatp, runtime } = require('../../../utils/myfunc')

let nakano = async (m, { wbk }) => {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });
    let start = performance.now();
    let end = performance.now();
    let latensi = end - start;
    let osInfo = await nou.os.oos();
    let storage = await nou.drive.info();
    let respon = `✨ *Informasi Bot WhatsApp* ✨

📡 *Jaringan Server*
   • *Ping:* ${latensi.toFixed(4)} Detik

🖥️ *Informasi Server*
   • *OS:* ${osInfo}
   • *IP Address:* ${nou.os.ip()}
   • *Tipe OS:* ${nou.os.type()}

💾 *RAM*
   • *Total:* ${formatp(os.totalmem())}
   • *Digunakan:* ${formatp(os.totalmem() - os.freemem())}

📂 *Penyimpanan*
   • *Total:* ${storage.totalGb} GB
   • *Digunakan:* ${storage.usedGb} GB (${storage.usedPercentage}%)
   • *Tersedia:* ${storage.freeGb} GB (${storage.freePercentage}%)

⏳ *Waktu Aktif Server*
   ${runtime(process.uptime())}

⚙️ *CPU (${cpus.length} Core)*
   • *Model:* ${cpus[0].model.trim()}
   • *Kecepatan:* ${cpu.speed} MHz
${Object.keys(cpu.times).map(type => `   • *${type}*: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

Tetap semangat ya kak! WBK selalu siap membantu 🥰
`;

    await m.reply(respon, false, true)
    await m.react('💵');
};

nakano.help = ['ping'];
nakano.tags = ['main'];
nakano.command = ['ping', 'speed'];

module.exports = nakano;