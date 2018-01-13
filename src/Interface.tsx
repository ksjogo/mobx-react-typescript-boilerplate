import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer, Provider, inject } from 'mobx-react'
import Widget from './Widget';

@inject('store')
@observer
export class Interface extends Widget {
    render () {
        return (
            <div>
                {this.props.store.timer}
            </div>
        )
    }
}
