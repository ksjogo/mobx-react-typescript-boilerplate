declare module 'react-heatmap.js' {
    export default class ReactHeatmap  extends React.Component<{
        data: {x:Number,y:Number,value:Number}[]
        max: Number
    }> {

    }
}
