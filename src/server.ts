import * as express from 'express'
import * as socketIo from 'socket.io'
type Socket = SocketIO.Socket
import * as cors from 'cors'
import * as fs from 'fs'
import { Game, applyAction, Deed } from './Game'
import * as _ from 'lodash'
import { Message, MessageType } from './Message'

const port = 3001

const app = express()
const server = app.listen(port)
const io = socketIo.listen(server)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

let game
try {
    let content = fs.readFileSync('./state.json')
    game = JSON.parse(content.toString('utf8'))
} catch {
    game = new Game()
}

process.on('SIGINT', function () {
    console.log('Saving')
    fs.writeFileSync('./state.json', JSON.stringify(game))
    process.exit()
})

let sockets: Socket[] = []

io.on('connect', (socket: Socket) => {
    console.log('Connected client on port %s.', port)
    sockets.push(socket)
    socket.on('message', message(socket))
    socket.on('disconnect', disconnect(socket))
    broadcast()
})

function message (socket: Socket) {
    return function (data: any) {
        //should not happen, that ought to be one way
        console.log('[server](message): %s', JSON.stringify(data))
        socket.send('return')
    }
}

function disconnect (socket: Socket) {
    return function (data: any) {
        _.remove(sockets, socket)
        console.log('Client disconnected')
    }
}

function broadcast () {
    const data: Message = { type: MessageType.GameState, data: JSON.stringify(game) }
    sockets.forEach(s => {
        console.log('broaded')
        s.send(data)
    })
}

app.get('/', (request, response) => {
    game = applyAction(game, { player: game.police, deed: Deed.Running, arguments: [] })
    broadcast()
    response.send('Hello from Express!')
})
