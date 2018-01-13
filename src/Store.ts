import { observable } from 'mobx'
import { Game } from '../shared/Game'
import autobind from 'autobind-decorator'
import * as io from 'socket.io-client'
import { debug } from 'util';

export class Store {
    @observable timer = 0

    @observable game: Game = null

    private socket: SocketIOClient.Socket;

    constructor () {
        this.socket = io('ws://localhost:3001')
        this.socket.on('connect', this.connect)
        this.socket.on('message', this.message)
        setInterval(() => {
            this.timer += 1
        }, 1000)
    }

    @autobind
    connect() {
        this.socket.send('something')
    }

    message(data) {
        console.log('[client](message): %s', JSON.stringify(data));
    }
}
