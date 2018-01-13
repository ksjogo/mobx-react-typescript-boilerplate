import { observable, computed } from 'mobx'
import * as  _ from 'lodash'
import * as dropData from '../heatmap/moneydrops.json'

const drops = (dropData as any).map(p => pos(p[0],p[1]))

function drop (): Position {
    return drops[Math.floor(Math.random() * drops.length)]
}

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
    move (action: Action) {
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
                break
        }
    }
}

export class Thief extends Player {
    type = PlayerType.Criminal
    position = drop() // (41.88, -87.67)
    move (action) {
        super.move(action)
    }
}

export class Police extends Player {
    type = PlayerType.Police
    position = drop() // pos(41.82, -87.61)
}

export class Game {
    @observable
    count = 0

    @observable.deep
    police = new Police()

    @observable.deep
    thief = new Thief()

    @observable
    drops: Position[] = _.range(5).map(x => drop())

    @computed
    get distance (): number {
        return Math.sqrt((this.thief.position.lat - this.police.position.lat) ** 2 + (this.thief.position.lng - this.police.position.lng) ** 2)
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
    action.player.move(action)
    /* game.police.position.lat += (2 * Math.random() - 1) * 0.02
     * game.police.position.lng += (2 * Math.random() - 1) * 0.02
     * game.thief.position.lat += (2 * Math.random() - 1) * 0.02
     * game.thief.position.lng += (2 * Math.random() - 1) * 0.02*/
    return game
}
