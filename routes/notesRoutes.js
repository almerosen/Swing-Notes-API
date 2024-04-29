const express = require("express")
const router = express.Router()
const notesController = require("../controllers/notesController")
const verifyJWT = require("../middleware/verifyJWT")


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 */



/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve all notes from the database
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all notes
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
router.get("/", verifyJWT, notesController.getAllNotes)

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note in the database
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Create a new note
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Note"
 *     responses:
 *       '201':
 *         description: Note created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
router.post("/", verifyJWT, notesController.createNewNote)
router.put("/:id", verifyJWT, notesController.updateNote)
router.delete("/:id", verifyJWT, notesController.deleteNote)
router.get("/search", verifyJWT, notesController.searchNotesByTitle)

module.exports = router
