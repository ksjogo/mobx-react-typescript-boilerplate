import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Widget from './Widget'
import { Heatmap } from './Heatmap'
import { PlayerType } from './Game';

@inject('store')
@observer
export class Interface extends Widget {
    render () {
        return (
            <div>
            {this.props.store.ready && <Heatmap />}
            {this.props.store.timer}
            {this.props.store.ready && this.props.store.game.winner != PlayerType.Neutral && <div id="winner"><h1>Winner: {this.props.store.game.winner}</h1></div>}
            </div>
        )
    }
}
