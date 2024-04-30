require("dotenv").config()
const express = require("express")
const userRoutes = require("./routes/userRoutes")
const notesRoutes = require("./routes/notesRoutes")
const {notesD} = require("./database/database")
const swaggerUi = require("swagger-ui-express")
const specs = require("./swagger") 


const app = express()

app.use(express.json())

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs))
app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes)


app.listen(process.env.PORT, process.env.BASE_URL, () => {
    console.log(`Server running at ${process.env.BASE_URL}:${process.env.PORT}`)
})

