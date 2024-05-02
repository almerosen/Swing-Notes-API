const {usersDb, notesDb} = require("../database/database")

const insertUserToDb = async (userData) => {
    const newUser = await usersDb.insert(userData)
    return newUser
}

const getUser = async (username) => {
    const user = await usersDb.findOne({ username: username })
    return user
}

module.exports = {
    insertUserToDb,
    getUser
}