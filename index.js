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
        const file = trimSlashes(path.replace(folderWatched, ''));

        const folderWatchedTrimmed = trimSlashesEnd(folderWatched);
        let folder = trimSlashes(pathModule.extname(file).replace('.', ''));

        if ('crdownload' === folder) return;

        //Remove slash at the end of the path

        const newPath = `${folderWatchedTrimmed}/${folder}/${file}`;

        if (!fs.existsSync(`${folderWatchedTrimmed}/${folder}`)) {
            fs.mkdirSync(`${folderWatchedTrimmed}/${folder}`);
        }

        fs.rename(path, newPath, function (err) {
            if (err) throw err;
            console.log(`File ${file} successfully moved the folder`);
        });
    });

// Function to trim slashes from the end of a string
function trimSlashesEnd(str) {
    return str.replace(/\/+$/, '');
}

// Function to trim slashes from the start of a string
function trimSlashes(str) {
    return trimSlashesEnd(str.replace(/^\/+/, ''));
}
