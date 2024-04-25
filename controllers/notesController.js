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

