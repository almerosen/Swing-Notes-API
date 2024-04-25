const {notesDb} = require("../database/database")

const getNotes = async () => {
    const notes = await notesDb.find({})
    return notes
}

const insertNoteToDb = async (note) => {
    const newNote = await notesDb.insert(note)
    return newNote
}

module.exports = {insertNoteToDb, getNotes}