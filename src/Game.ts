import { observable, computed } from 'mobx'
import * as  _ from 'lodash'
import * as dropData from '../heatmap/moneydrops.json'
import { type } from 'os';

const drops = (dropData as any).map(p => pos(p[0],p[1]))

function drop (): Position {
    return drops[Math.floor(Math.random() * drops.length)]
}

export enum PlayerType {
    Neutral = "Neutral",
    Police = "Police",
    Criminal = "Criminal",
}

type Position = {lat: number, lng: number}
function pos (y, x): Position {
    return { lat: y, lng: x }
}

function dist (a: Position, b: Position): number {
    return Math.sqrt((a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2)
}

export class Player {
    type: PlayerType
    position: Position
    move (action: Action, game: Game) {
        action.argument /= 100
        switch (action.deed) {
            case Deed.East:
                this.position.lng += action.argument
                break
            case Deed.West:
                this.position.lng -= action.argument
                break
            case Deed.North:
                this.position.lat += action.argument
                break
            case Deed.South:
                this.position.lat -= action.argument
                break
            case Deed.Special:
                switch (this.type) {
                    case(PlayerType.Criminal):
                        game.drops = _.filter(game.drops, x => dist(x, this.position) > 0.03)
                        if (game.drops.length === 0)
                            game.winner = PlayerType.Criminal
                        break
                    case(PlayerType.Police):
                        if (dist(game.thief.position, this.position) <= 0.02)
                            game.winner = PlayerType.Police
                        break
                }
                break
        }
    }
}

export class Thief extends Player {
    type = PlayerType.Criminal
    position = drop() // (41.88, -87.67)
    move (action, game) {
        super.move(action, game)
    }
}

export class Police extends Player {
    type = PlayerType.Police
    position = drop() // pos(41.82, -87.61)
}

export class Game {
    @observable
    count = 0

    @observable
    winner= PlayerType.Neutral

    @observable.deep
    police = new Police()

    @observable.deep
    thief = new Thief()

    @observable
    drops: Position[] = _.range(5).map(x => drop())

    @observable
    collectedDrops: Position[] = []

    @computed
    get distance (): number {
        return dist(this.thief.position, this.police.position)
    }
}

export enum Deed {
    East = 'east',
    West = 'west',
    North = 'north',
    South = 'south',
    Special = 'special',
}

export class Action {
    player: Player
    deed: Deed
    argument: number
}

export function applyAction (game: Game, action: Action): Game {
    game.count++
    action.player.move(action, game)
    /* game.police.position.lat += (2 * Math.random() - 1) * 0.02
     * game.police.position.lng += (2 * Math.random() - 1) * 0.02
     * game.thief.position.lat += (2 * Math.random() - 1) * 0.02
     * game.thief.position.lng += (2 * Math.random() - 1) * 0.02*/
    return game
}
