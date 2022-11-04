# Download Sorter

This little node script allows you to sort all your downloaded files in sub folder sorted by their extension (zip, png, gif, etc)


## Installation

1. Clone it wherever you want on your computer
``git clone ...``
2. Rename or duplicate the file ``.env.example`` into ``.env`` and modify the variable for your download folder path
3. Open a terminal in the app folder and start the application  
```pm2 start index.js --name "download-sorter"```