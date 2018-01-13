import * as React from 'react'
import { Store } from './Store'

export interface WidgetProps {
    store?: Store,
}

export default class Widget<T extends WidgetProps = WidgetProps> extends React.Component<T> {
    style: any = null
}
