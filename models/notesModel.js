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

    const updateNote = await notesDb.update({_id: id}, { $set: updatedNote })

    if (updateNote === 1) { // Om uppdateringen lyckades
            return updatedNote
    } else {
            return null
    }
    
}

const deleNoteFromDb =  async (id) => {
    const deletedNote = await notesDb.remove({ _id: id })
    return deletedNote
}

module.exports = {insertNoteToDb, getNotes, getNoteById, updateNoteById, deleNoteFromDb}