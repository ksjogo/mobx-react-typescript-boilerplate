import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Widget from './Widget'
import { Heatmap } from './Heatmap'

@inject('store')
@observer
export class Interface extends Widget {
    render () {
        return (
            <div>
                <Heatmap />
                {this.props.store.timer}
            </div>
        )
    }
}
