const {notesDb} = require("../database/database")

const getNotes = async () => {
    const notes = await notesDb.find({})
    return notes
}

const insertNoteToDb = async (note) => {
    const newNote = await notesDb.insert(note)
    return newNote
}

const getNoteById = async (id) => {
    const note = await notesDb.findOne({_id: id})
    return note
}

const updateNoteById = async (id, updatedNote) => {
    const updatedNoteResult = await notesDb.update({_id: id}, { $set: updatedNote })
    return updatedNoteResult
}

module.exports = {insertNoteToDb, getNotes, getNoteById, updateNoteById}