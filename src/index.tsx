import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer, Provider } from 'mobx-react'

import DevTools from 'mobx-react-devtools'
import { Interface } from './Interface';
import { Store } from './Store';

const store = new Store()

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Interface />
        </Provider>
    <DevTools />
    </div>,
    document.getElementById('root'));
