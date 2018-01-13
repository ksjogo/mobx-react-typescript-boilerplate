import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Widget from './Widget'
import ReactHeatmap from 'react-heatmap.js'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'

import * as data from '../heatmap/crimes_count.json'

import '../node_modules/leaflet/dist/leaflet.css'

import * as L from 'leaflet';

/* delete L.Icon.Default.prototype._getIconUrl;
 * L.Icon.Default.mergeOptions({
 *     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
 *     iconUrl: require('leaflet/dist/images/marker-icon.png'),
 *     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
 * });
 * */
@inject('store')
@observer
export class Heatmap extends Widget {
    render () {
        return <div>
            <Map center={[41.84,-87.67]} zoom={12} style={{height: '100%', width: '100%'}}>
                <HeatmapLayer

                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={data}

                    longitudeExtractor={m => m.lon}
                    latitudeExtractor={m => m.lat}
                    intensityExtractor={m => m.count} />

                <TileLayer
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                    attribution='<a href="http://cartodb.com/attributions">CartoDB</a>'
        />
            </Map>
        </div>
    }
}
