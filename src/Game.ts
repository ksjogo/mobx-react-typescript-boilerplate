import { observable } from 'mobx'

export enum Player {
    Police = 1,
    Criminal = 2,
}

export enum Deed {
    Running = 1,
    Walking = 2,
}

export class Action {
    player: Player
    deed: Deed
    arguments: number[]
}

export class Game {
    @observable count = 0
    @observable position = 0
    @observable position2 = 0
}

export function applyAction (game: Game, action: Action): Game {
    game.count++
    return game
}
