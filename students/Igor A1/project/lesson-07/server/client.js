const api = require('../public/js/api.js');

let start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');

require('child_process').exec(`${start} ${api.server.url}:${api.server.port}`);