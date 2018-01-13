
export class Dummy {

}

export enum MessageType {
    Notify = 0,
    GameState = 1,
}

export class Message {
    type: MessageType
    data: any
}
