import { config } from 'dotenv'
config()

import http from 'http'
import { Server } from 'socket.io'
import app from './app'

const PORT = process.env.PORT || 5000

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    console.log("New connection: " + socket.id)
})

// Start server
server.listen(PORT, () => {
    console.clear()
    console.log(`Port: ${PORT}`)
})