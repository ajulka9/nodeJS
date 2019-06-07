const fs = require('fs')
const fileName = 'files/notes.txt';
fs.writeFileSync(fileName,'this is a test for fs!!!! \n');

// Append
fs.appendFileSync(fileName,'Appended Text!!')

console.log(lodedFile);