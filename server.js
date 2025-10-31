const express = require("express")
const router= require("./routes/login")
require("dotenv").config()
const cors = require('cors')
PORT = process.env.PORT || 3000;


const app = express()
app.use(cors())
app.use(express.json())


app.use('/' , router)

app.listen(PORT , () => {
    console.log(`servidor rodando na porta: ${PORT}`)
})
