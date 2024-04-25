const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJWT = (req, res, next) => {
    const authorizationHeader = req.headers.authorization // ["authorization"]

    if(!authorizationHeader) {
        return res.status(401).json(
            {
                success: false,
                message: "Token missing"
            }
        )
    }

    console.log(authorizationHeader) 

    const token = authorizationHeader.replace("Bearer ", "") // authorizationHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => { 
            if (err) {
                return res.status(403).json(
                    {
                        success: false, 
                        message: "Invalid token"
                    }
                )
            }
            req.user = decodedToken // lägger till användarinformation (user id) från avkodade token
            next()
        }
    )
}

module.exports = verifyJWT