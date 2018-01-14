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

app.use(cors({ origin: ['http://localhost:3000', 'http://royalcopsnrobbers.com:3001'], credentials: true }))

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
        // should not happen, that ought to be one way
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

let lastSend = Date.now()
let skipped = true

function checker () {
    if (skipped)
        broadcast()
}
setInterval(checker, 500)

function broadcast () {
    let date = Date.now()
    if (date < lastSend + 500) {
        skipped = true
        return
    }

    skipped = false
    lastSend = Date.now()

    let places = 4
    let json = JSON.stringify(game, function (key, value) {
        if (typeof value === 'number') {
            return parseFloat(value.toFixed(places))
        }
        return value
    })

    const data: Message = { type: MessageType.GameState, data: json }
    console.log('broaded', Date.now())
    sockets.forEach(s => {
        s.send(data)
    })

    lastSend = Date.now()
}

app.get('/:player/:action/:argument', (request, response) => {
    let playerId = request.params.player
    let player = parseInt(playerId,10) === 0 ? game.police : game.thief
    let action = request.params.action as Deed
    let argument = parseInt(request.params.argument,10)
    console.log(playerId, action, argument)
    game = applyAction(game, { player: player, deed: action, argument: argument })
    let distance = Math.min(game.distance > 0.01 ? game.distance * 255 : 0, 255)
    response.send(JSON.stringify(Math.floor(distance)))
    broadcast()
})
