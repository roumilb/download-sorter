const chokidar = require('chokidar');
const fs = require('fs');
const pathModule = require('path');

const fileWatched = '/Users/rleclercq/Downloads/';

const watcher = chokidar.watch(fileWatched, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 0
});

watcher
    .on('add', path => {
        const file = path.replace(fileWatched, '');

        let folder = pathModule.extname(file).replace('.', '');

        if ('crdownload' === folder) return;

        const newPath = `${fileWatched}${folder}/${file}`;

        if (!fs.existsSync(`${fileWatched}${folder}`)) {
            fs.mkdirSync(`${fileWatched}${folder}`);
        }

        fs.rename(path, newPath, function (err) {
            if (err) throw err;
            console.log(`File ${file} successfully moved the folder`);
        });
    });
