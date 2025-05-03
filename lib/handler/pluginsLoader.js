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
                console.log(chalk.redBright(`❌ Failed: ${relativePath}`));
                console.error(chalk.redBright(`   ↳ ${err.message}`));
            }
        }
    }

    return plugins;
};

module.exports = pluginsLoader;