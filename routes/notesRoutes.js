const express = require("express")
const router = express.Router()
const notesController = require("../controllers/notesController")
const verifyJWT = require("../middleware/verifyJWT")

router.get("/", verifyJWT, notesController.getAllNotes)
router.post("/", verifyJWT, notesController.createNewNote)
router.put("/:id", verifyJWT, notesController.updateNote)

module.exports = router
