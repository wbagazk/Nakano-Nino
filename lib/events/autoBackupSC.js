const fs = require("fs");
const { execSync } = require("child_process");

async function autoBackupSC(NakanoNino, backupDir) {
    try {
        console.log("🔄 Memulai proses auto backup...");
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
            console.log(`📁 Folder ${backupDir} dibuat.`);
        }

        const randomHex = Math.random().toString(36).slice(2, 10);
        const filename = `AUTO BACKUP SC NAKANO NINO - ${randomHex}.tar.gz`;
		const filepath = `${backupDir}/${filename}`

        const ls = execSync("ls")
            .toString()
            .split("\n")
            .filter(file =>
                !["node_modules", "package-lock.json", "yarn.lock", "tmp", ".cache", ".npm"].includes(file) &&
                file !== ""
            );

        execSync(`tar --exclude="temp/*.tar.gz" -czf "${filepath}" ${ls.join(" ")}`);
        console.log(`✅ Backup ${filename} berhasil dibuat di ${backupDir}`);

        await NakanoNino.sendMessage(global.idgcbackup, {
            document: fs.readFileSync(filepath),
            mimetype: "application/gzip",
            fileName: filename,
            caption: "✅ Auto Backup berhasil! Simpan file ini baik-baik ya."
        });

        console.log("📤 Backup berhasil dikirim!");
        fs.unlinkSync(filepath);
        console.log(`🗑️ File ${filename} telah dihapus dari ${backupDir}`);
    } catch (error) {
        console.error("❌ Gagal melakukan auto backup:", error);
    }
}

module.exports = { autoBackupSC };