const {insertUserToDb, getUser} = require("../models/userModel")
const {hashPassword, comparePassword} = require("../bcrypt")
const jwt = require("jsonwebtoken")


exports.userRegister = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please fill in username and password"
                }
            )
        }

        // Kolla om användarnamnet redan finns i databasen
        const user = await getUser(username.toLowerCase())

        if(user) {
            return res.status(418).json(
                {
                    success: false,
                    message: "Username already exists"
                }
            )
        }

        // Kryptera lösenordet innan det sparas i databasen
        const hashedPassword = await hashPassword(password)

        const userData = {
            username: username.toLowerCase(),
            password: hashedPassword
        }

        const registerUser = await insertUserToDb(userData)

        return res.status(200).json(
            {
                success: true,
                message: "User created successfully",
                user: registerUser
            }
        )

    } catch (error) {
        console.error("Failed to create user accout")
    }
}


exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await getUser(username.toLowerCase())

        if (user == null) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        // Check if the password is correct
        const correctPassword = await comparePassword(password, user.password)

        if(!correctPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Wrong password"
                }
            )
        }

        // Create token
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "1h"}
        )

        return res.status(200).json(
            {
                success: true,
                message: "Successfully logged in",
                user: user,
                token: token
            }
        )
    } catch (error) {
        console.error("Error trying to log in", error)
    }  
}

