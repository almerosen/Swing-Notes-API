const notesModel = require("../models/notesModel")
const moment = require("moment")

exports.createNewNote = async (req, res) => {
    try {
        const {title, text} = req.body

        if (!title || !text) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Plase fill in both title and text"
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

