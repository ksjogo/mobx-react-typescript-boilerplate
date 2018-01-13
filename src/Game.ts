import { observable } from 'mobx'

export enum PlayerType {
    Police = 1,
    Criminal = 2,
}

type Position = {lat: number, lng: number}
function pos (y, x): Position {
    return { lat: y, lng: x }
}

export class Player {
    type: PlayerType
    position: Position
}

export class Thief extends Player {
    type = PlayerType.Criminal
    position = pos(41.88, -87.67)
}

export class Police extends Player {
    type = PlayerType.Police
    position = pos(41.82, -87.61)
}

export class Game {
    @observable count = 0
    @observable police = new Police()
    @observable thief = new Thief()
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

export function applyAction (game: Game, action: Action): Game {
    game.count++
    game.police.position.lat += (2 * Math.random() - 1) * 0.02
    game.police.position.lng += (2 * Math.random() - 1) * 0.02
    game.thief.position.lat += (2 * Math.random() - 1) * 0.02
    game.thief.position.lng += (2 * Math.random() - 1) * 0.02
    return game
}
