import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io'
import * as cors from 'cors'
import { Game } from '../shared/Game'

const port = 3001

const app = express()
const server = app.listen(port);
const io = socketIo.listen(server);

app.use(cors({origin: 'http://localhost:3000', credentials: true}))

const game = new Game();

app.get('/', (request, response) => {
    response.send('Hello from Express!')
})

io.on('connect', (socket: SocketIO.Socket) => {
    console.log('Connected client on port %s.', port);
    socket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));
        socket.send('return')
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
