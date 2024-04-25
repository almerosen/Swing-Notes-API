const {usersDb, notesDb} = require("../database/database")

const insertUserToDb = async (userData) => {
    const newUser = await usersDb.insert(userData)
    return newUser
}

const getUser = async (username) => {
    try {
        const user = await usersDb.findOne({ username: username })
        return user
    } catch (error) {
        console.error("Error get user", error)
        throw new Error ("Error when getting user")
    }
}

module.exports = {
    insertUserToDb,
    getUser
}