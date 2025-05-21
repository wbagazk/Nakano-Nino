const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function autoClearSessionFolder(folderSession) {
    const excludeFile = "creds.json";

    fs.readdir(folderSession, (err, files) => {
        if (err) {
            console.error(chalk.red("Gagal membaca folder 'session':"), err);
            return;
        }

        const filesToDelete = files.filter(file => file !== excludeFile);
        if (filesToDelete.length === 0) {
            console.log(chalk.yellow("Tidak ada file untuk dihapus di folder 'session'."));
            return;
        }

        console.log(chalk.blueBright(`Membersihkan folder 'session', jumlah file: ${filesToDelete.length}`));

        filesToDelete.forEach(file => {
            const filePath = path.join(folderSession, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(chalk.red("Gagal membaca file:"), filePath, err);
                    return;
                }

                if (stats.isFile()) {
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(chalk.red("Gagal menghapus file:"), filePath, err);
                        } else {
                            console.log(chalk.green("File dihapus:"), filePath);
                        }
                    });
                } else if (stats.isDirectory()) {
                    fs.rmdir(filePath, { recursive: true }, err => {
                        if (err) {
                            console.error(chalk.red("Gagal menghapus folder:"), filePath, err);
                        } else {
                            console.log(chalk.green("Folder dihapus:"), filePath);
                        }
                    });
                }
            });
        });

        console.log(chalk.greenBright("Pembersihan folder 'session' selesai."));
    });
}

module.exports = { autoClearSessionFolder };