const { notesDb } = require("../database/database")
const notesModel = require("../models/notesModel")
const moment = require("moment")

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await notesModel.getNotes()
        
        if (!notes || notes.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No notes found"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Successfully retrieved notes",
                notes: notes
            }
        )

    } catch (error) {
        console.error("Error", error)
        return res.status(500).json( // status 500 - server error
            {
                success: false,
                message: "Failed to get notes. Please try again"
            }
        )
    }
}

exports.createNewNote = async (req, res) => {
    try {
        const {title, text} = req.body

        if (!title || title.length > 50) {
            return res.status(400).json(
                {
                    success: false,
                    message: "You need to fill in a title of max 50 characters"
                }
            )
        }

        if(!text || text.length > 300) {
            return res.status(400).json(
                {
                    success: false,
                    message: "You need to till in a text of max 300 characters"
                }
            )
        }

        const note = {
            title: title,
            text: text,
            createdAt: moment().format("YYYY-MM-DD HH:mm"),
            userID: req.user.id // tar id från decoded token (från verifyJWT middleware)
        }

        const insertNote = await notesModel.insertNoteToDb(note)

        return res.status(200).json(
            {
                success: true,
                message: "Successfully inserted new note",
                note: insertNote
            }
        )

    } catch (error) {
        console.error("Error creating new note", error)
        return res.status(500).json(
            {
                success: false,
                message: "Failed to create a new note"
            }
        )
    }
}

exports.updateNote = async (req, res) => {
    try {
        const {id} = req.params //note id
        const {title, text} = req.body

        let existingNote = await notesModel.getNoteById(id)

        if(!existingNote) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Note not found"
                }
            )
        }
   
        const {updatedNote, updatedResult} = await notesModel.updateNoteById(id, { title, text}) 

        return res.status(200).json(
            {
                success: true,
                message: "Updated note successfully",
                updatedNote, //the updated note
                updatedNotes: updatedResult //the result, 1 if updated 
            }
        )
    } catch (error) {
        console.error("Error when trying to update note", error)
        return res.status(500).json(
            {
                success: false,
                message: "Failed to update note. Please try again"
            }
        )
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params

        const existingNote = await notesModel.getNoteById(id)

        if(!existingNote) {
            return res.status(404).json({
                success: false,
                message: "No note found"
            })
        }

        const deletedNote = await notesModel.deleteNoteFromDb(id)

        return res.status(200).json(
            {
                success: true,
                message: "Successfully deleted note",
                deletedNote // the delete result. 1 if it was deleted
            }
        )

    } catch (error) {
        console.error("Error when trying to delete note", error)
        return res.status(500).json(
            {
                success: false,
                message: "Failed to delete the note. Please try again"
            }
        )


    }
}

exports.searchNotesByTitle = async (req, res) => {
    try {
        const { query } = req.query

        if (!query) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please fill in a search query"
                }
            )
        }

        const notes = await notesModel.searchNotesByTitle(query)

        if (notes.length === 0) { // It returns an empty array if nothing is found
            return res.status(200).json(
                {
                    success: false,
                    message: `No notes found that matched ${query}`
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: `Successfully searched for ${query}`,
                notesFound: notes
            }
        )
    } catch (error) {
        console.error("Failed to search note in database", error)
        return res.status(500).json(
            {
                success: false,
                message: "Error when searching in database. Please try again"
            }
        )
    }
}


