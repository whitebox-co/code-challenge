const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()
server.use(cors())
server.use(helmet())
server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({Hello: "World!"})
})

server.get("/products", (req, res) => {

})

module.exports = server