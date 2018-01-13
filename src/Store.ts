import { observable } from 'mobx'
import { Game } from './Game'
import autobind from 'autobind-decorator'
import * as io from 'socket.io-client'
import { Message, MessageType } from './Message'

export class Store {
    @observable timer = 0

    @observable.deep game: Game = null

    @observable ready = false

    private socket: SocketIOClient.Socket

    constructor () {
        this.socket = io('ws://localhost:3001')
        this.socket.on('connect', this.connect)
        this.socket.on('message', this.message)
        setInterval(() => {
            this.timer += 1
        }, 1000)
    }

    @autobind
    connect () {
        this.socket.send('something')
    }

    @autobind
    message (msg: Message) {
        switch (msg.type) {
            case MessageType.Notify:
                console.log('[client](message): %s', JSON.stringify(msg.data))
                break
            case MessageType.GameState:
                this.game = JSON.parse(msg.data)
                this.ready = true
                break
        }
    }
}
