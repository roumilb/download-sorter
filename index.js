require('dotenv').config();
const chokidar = require('chokidar');
const fs = require('fs');
const pathModule = require('path');

const folderWatched = process.env.DOWNLOAD_PATH;

const watcher = chokidar.watch(folderWatched, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 0
});

watcher
    .on('add', path => {
        const file = path.replace(folderWatched, '');

        let folder = pathModule.extname(file).replace('.', '');

        if ('crdownload' === folder) return;

        const newPath = `${folderWatched}${folder}/${file}`;

        if (!fs.existsSync(`${folderWatched}${folder}`)) {
            fs.mkdirSync(`${folderWatched}${folder}`);
        }

        fs.rename(path, newPath, function (err) {
            if (err) throw err;
            console.log(`File ${file} successfully moved the folder`);
        });
    });
