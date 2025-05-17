const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function autoClearTempFolder(folderTemp, sessionName) {

    fs.readdir(folderTemp, (err, files) => {
        if (err) {
            console.error(chalk.red("Gagal membaca folder 'temp':"), err);
            return;
        }

        const filesToDelete = files.filter(file => file !== sessionName);

        if (filesToDelete.length === 0) {
            console.log(chalk.yellow("Tidak ada file untuk dibersihkan di folder 'temp'."));
            return;
        }

        console.log(chalk.blueBright(`Membersihkan folder 'temp', jumlah item: ${filesToDelete.length}`));

        filesToDelete.forEach(file => {
            const filePath = path.join(folderTemp, file);

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
                    fs.rm(filePath, { recursive: true, force: true }, err => {
                        if (err) {
                            console.error(chalk.red("Gagal menghapus folder:"), filePath, err);
                        } else {
                            console.log(chalk.green("Folder dihapus:"), filePath);
                        }
                    });
                }
            });
        });

        console.log(chalk.greenBright("Pembersihan folder 'temp' selesai."));
    });
}

module.exports = { autoClearTempFolder };