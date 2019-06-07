const notes = require('./notes');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const argv = process.argv;
// console.log(argv);
console.log('exports notes : '+ notes);
// const command = argv[2];
yargs.version('1.1.0');
yargs.command({
    command:'add',
    describe:'Add a new note.',
    builder: {
        title:{
            describe: 'note title.',
            demandOption: true,
            type:'string'
        },
        body:{
            describe: 'note body',
            demandOption: true,
            type:'srting'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body);
        // needs title and body
    }
});

yargs.command({
    command:'remove',
    describe:'Remove a note.',
    builder: {
        title:{
            describe: 'note title.',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv){
        console.log('removing a note');
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command:'list',
    describe:'list all notes.',
    handler: function(){
        console.log('lsiting all notes');
    }
})


yargs.command({
    command:'read',
    describe:'read note.',
    handler: function(){
        console.log('read a note.');
    }
})
// if(command === 'add'){
//     console.log('Adding note!');
// } else if(command === 'remove'){
//     console.log('Removing the note!!');
// }
// console.log('apps.js');

// var notes = gn();
yargs.parse();

// console.log('Notes from notes Manager  : '+ notes);
// console.log(validator.isEmail('julka.+abhi@gmail.com'));
// console.log(validator.isURL('http:/www.google.com'));
// console.log(chalk.red.italic.bold('Error!!'));
// console.log(process.argv[2])