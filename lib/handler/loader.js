const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const pluginsLoader = async (directory, base = '') => {
    let plugins = {};
    const items = fs.readdirSync(directory);
    for (const item of items) {
        const fullPath = path.join(directory, item);
        const relativePath = base ? path.join(base, item) : item;
        if (fs.statSync(fullPath).isDirectory()) {
            const nestedPlugins = await pluginsLoader(fullPath, relativePath);
            Object.assign(plugins, nestedPlugins);
        } else if (item.endsWith('.js')) {
            try {
                const resolvedPath = path.resolve(fullPath);
                if (require.cache[resolvedPath]) delete require.cache[resolvedPath];
                const plugin = require(resolvedPath);
                const key = relativePath.replace(/\\/g, '/');
                plugins[key] = plugin;
            } catch (err) {
                console.log(chalk.white(chalk.bgHex("#ff5e78").bold(`\n🌟  ERROR LOG  🌟`)));
                console.log(chalk.white(chalk.bgHex("#4a69bd").bold(`🚀  CEK PATH  🚀`)));
                console.log(chalk.cyanBright(`📅  ${"Path".padEnd(20)} : ${relativePath}`));
                console.log(chalk.redBright(`📝  ${"Log".padEnd(20)} : \n${err.message}`));
                console.log(chalk.white("------------------------------------------"));
            }
        }
    }

    return plugins;
};

async function pluginsLoaderFunc(dir) {
    const result = [];
    const readAllFiles = async folder => {
        const files = await fs.promises.readdir(folder);
        for (const file of files) {
            const fullPath = path.join(folder, file);
            const stat = await fs.promises.stat(fullPath);
            if (stat.isDirectory()) {
                await readAllFiles(fullPath);
            } else if (file.endsWith('.js')) {
                try {
                    const customFunction = require(fullPath);
                    if (typeof customFunction === 'function') {
                        result.push(customFunction);
                    }
                } catch (e) {
                    console.error(`❌ Gagal load custom file: ${fullPath}`);
                    console.error(e);
                }
            }
        }
    };

    await readAllFiles(dir);
    return result;
}

module.exports = { pluginsLoader, pluginsLoaderFunc };