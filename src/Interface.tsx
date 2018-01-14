import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Widget from './Widget'
import { Heatmap } from './Heatmap'
import { PlayerType } from './Game'
import autobind from 'autobind-decorator'

@inject('store')
@observer
export class Interface extends Widget {

    @autobind
    pickPolice () {
        this.props.store.perspective = PlayerType.Police
    }

    @autobind
    pickThief () {
        this.props.store.perspective = PlayerType.Criminal
    }

    @autobind
    pickNeutral () {
        this.props.store.perspective = PlayerType.Neutral
    }

    render () {
        return (
            <div>
                    <button onClick={this.pickPolice}>Police</button>
                    <button onClick={this.pickThief}>Thief</button>
                    <button onClick={this.pickNeutral}>Neutral</button>
                   {this.props.store.ready && <Heatmap />}
                    {this.props.store.timer}
                    {this.props.store.ready && this.props.store.game.winner != PlayerType.Neutral && <div id='winner'><h1>Winner: {this.props.store.game.winner}</h1></div>}
            </div>
        )
    }
}
