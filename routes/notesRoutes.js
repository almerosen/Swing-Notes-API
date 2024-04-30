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
 * /api/notes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all notes
 *     description: Retrieve all notes from the database
 *     tags: [Notes]
 *    
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
 * /api/notes:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new note
 *     description: Create a new note in the database
 *     tags: [Notes]
 *     
 *     requestBody:
 *       required: true
 *       description: Create a new note
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Note"
 * 
 *     responses:
 *       '201':
 *         description: Note created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server error
 */
router.post("/", verifyJWT, notesController.createNewNote)

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a note
 *     description: Update a note in the database
 *     tags: [Notes]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to update
 *         schema:
 *           type: string
 *     
 *     requestBody:
 *       required: true
 *       description: Update a new note
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Note"
 *              required:
 * 
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server error
 */
router.put("/:id", verifyJWT, notesController.updateNote)

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a note
 *     description: Delete a note in the database
 *     tags: [Notes]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string

 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server error
 */
router.delete("/:id", verifyJWT, notesController.deleteNote)

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Search a note
 *     description: Search a note in the database
 *     tags: [Notes]
 * 
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     
 *     responses:
 *       '200':
 *         description: Successful search
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server error
 */
router.get("/search", verifyJWT, notesController.searchNotesByTitle)

module.exports = router
