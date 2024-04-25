const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
    const passwordMatches = await bcrypt.compare(password, hashedPassword)
    return passwordMatches
}

module.exports = {hashPassword, comparePassword}