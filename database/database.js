const Datastore = require("nedb-promise")

const usersDb = new Datastore({filename: "./database/usersDb.db", autoload: true})
const notesDb = new Datastore({filename: "./database/notes.db", autoload: true})

module.exports = { usersDb, notesDb }