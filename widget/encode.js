var iconvlite = require('iconv-lite');
var fs = require('fs');

var fileName = './dist/bundle.js',
    fileNameTo = './dist/bundle-cp1251.js',
    coding = 'windows-1251';

function readFileSync_encoding(filename, encoding) {
    var content = fs.readFileSync(filename);
    return iconvlite.decode(content, encoding);
}

fs.writeFile(fileNameTo, readFileSync_encoding(fileName, coding));