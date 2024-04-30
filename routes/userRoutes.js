const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */


/**

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new account
 *     description: Create a new user and store in the database
 *     tags: [Users]
 *     
 *     requestBody:
 *       required: true
 *       description: Create a new user
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/User"
 * 
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Username already exists
 *       '500':
 *         description: Server error
 */
router.post("/signup", userController.userRegister)

/**
* @swagger
* /api/user/login:
*   post:
*     summary: Login
*     description: Login as a user
*     tags: [Users]
*     
*     requestBody:
*       required: true
*       description: Login as a user
*       content:
*         application/json:
*           schema:
*              $ref: "#/components/schemas/User"
* 
*     responses:
*       '200':
*         description: User logged in successfully
*       '400':
*         description: Bad request
*       '403':
*         description: Wrong password
*       '404':
*         description: User not found
*       '500':
*         description: Server error
*/

router.post("/login", userController.userLogin)

module.exports = router