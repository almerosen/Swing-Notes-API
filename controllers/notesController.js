const notesModel = require("../models/notesModel")
const moment = require("moment")

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await notesModel.getNotes()
        
        if (!notes) {
            res.status(404).json(
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

        const date = moment().format("YYYY-MM-DD HH:mm")

        const note = {
            title: title,
            text: text,
            createdAt: date,
            userID: req.user.id // tar id från decoded token (från verifyJWT middleware)
        }

        const insertNote = await notesModel.insertNoteToDb(note)

        return res.status(200).json(
            {
                success: true,
                message: "Successfully inserted new note",
                note: note
            }
        )

    } catch (error) {
        console.error("Error creating new note", error)
    }
}

exports.updateNote = async (req, res) => {
    try {
        const {id} = req.params
        const {title, text} = req.body

        const existingNote = await notesModel.getNoteById(id)

        if(!existingNote) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Note not found"
                }
            )
        }

        if (title) {
            existingNote.title = title
        }
        if (text) {
            existingNote.text = text
        }

        const updatedNote = await notesModel.updateNoteById(id, existingNote)

        return res.status(200).json(
            {
                success: true,
                message: "Updated note successfully",
                updatedNote: updatedNote
            }
        )
    } catch (error) {
        console.error("Error when trying to update note", error)
        return res.status(500).json(
            {
                success: false,
                message: "Failed to update note"
            }
        )
    }
}

