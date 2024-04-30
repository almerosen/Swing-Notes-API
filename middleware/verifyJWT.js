const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJWT = (req, res, next) => {
    const authorizationHeader = req.headers.authorization // ["authorization"]

    // If token is missing
    if(!authorizationHeader) {
        return res.status(401).json(
            {
                success: false,
                message: "Token is missing"
            }
        )
    }

    const token = authorizationHeader.replace("Bearer ", "") // authorizationHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => { 
            if (err) {
                return res.status(403).json(
                    {
                        success: false, 
                        message: "Invalid token" // If the token is faulsy
                    }
                )
            }
            req.user = decodedToken // user Id (and iat, exp...) from decoded token. To use when creating new note to insert user ID...
            console.log(req.user)
            next()
        }
    )
}

module.exports = verifyJWT