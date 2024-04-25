const {notesDb} = require("../database/database")

const insertNoteToDb = async (note) => {
    const newNote = await notesDb.insert(note)
    return newNote
}

module.exports = {insertNoteToDb}