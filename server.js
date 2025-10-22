const express = require("express")
const router= require("./routes/login")
require("dotenv").config()
PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use('/' , router)

app.listen(PORT , () => {
    console.log(`servidor rodando na porta: ${PORT}`)
})
