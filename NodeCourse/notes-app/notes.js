const fs = require('fs');
const NOTES_FILE = 'files/notes.data';
const getNotes = function(){
    console.log('getNotes');
    var notes = [];
    return notes;
}

const loadNotes = function(){
    try{
        console.log('load notes');
        const dataBuff = fs.readFileSync(NOTES_FILE);
        const dataJSON = dataBuff.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        console.log('No notes');
        return [];
    };
}

const addNote = function(title, body){
    console.log('Adding node in FS');
    existingNotes = loadNotes();
    var dupNotes = existingNotes.filter(function(note){
        if(note.title === title){
            return true;
        }
    });
    if(dupNotes.length === 0){
        existingNotes.push({
            title:title,
            body: body
        });
    }else{
        console.log('Title : '+ title + ' already taken!!');
    }
 
    saveNotes(existingNotes);
}

const removeNote = function(title){
    console.log('Removing note with title : '+ title);
    existingNotes = loadNotes();
    if(existingNotes.length !== 0){
        // filter out notes with give title
        var toKeep = existingNotes.filter(function(note){
            return note.title !== title;
        });
        console.log('toKeep : '+ toKeep);
        if(toKeep.length === existingNotes.length){
            console.log('Nothing to remove, not title matching!!');
        } else{
            saveNotes(toKeep);
        }
    } else{
        console.log('No notes, so cant remove anything!!')
    }
}

const saveNotes = function(notes){
    var data = JSON.stringify(notes);
    data = data+'\n';
    fs.writeFileSync(NOTES_FILE, data)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}