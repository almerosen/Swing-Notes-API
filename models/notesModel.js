const {notesDb} = require("../database/database")
const moment = require("moment")


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

const updateNoteById = async (id, updates) => {

    const existingNote = await notesDb.findOne({_id: id})

    const updatedNote = {
        ...existingNote,
        title: updates.title || existingNote.title, // Update if passed in from frontend
        text: updates.text || existingNote.text, // Update if passed in from frontend
        modifiedAt: moment().format("YYYY-MM-DD HH:mm")
    }

    const updatedResult = await notesDb.update({_id: id}, { $set: updatedNote })

    return {updatedNote, updatedResult} // return updated note and the result

    
}

const deleteNoteFromDb =  async (id) => {
    const deletedNote = await notesDb.remove({ _id: id })
    return deletedNote
}

const searchNotesByTitle = async (query) => {
    const regex = new RegExp(query, 'i')

    const notes = await notesDb.find({ title: { $regex: regex} })
    return notes
}

module.exports = {
    insertNoteToDb, 
    getNotes, 
    getNoteById, 
    updateNoteById, 
    deleteNoteFromDb, 
    searchNotesByTitle
}