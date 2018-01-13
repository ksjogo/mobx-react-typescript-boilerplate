//var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var baseLayer = L.tileLayer.provider('CartoDB.DarkMatter');
//var baseLayer = L.tileLayer.provider('Stamen.Toner');


var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 0.004,
    "maxOpacity0": .7, 
    // scales the radius based on map zoom
    "scaleRadius": true, 
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lon',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
};

var heatmapLayer = new HeatmapOverlay(cfg);


var thiefIcon = L.icon({
    iconUrl: 'img/thief.png',
    iconSize: [32, 32],
});

var policeIcon = L.icon({
    iconUrl: 'img/policeman.png',
    iconSize: [32, 32],
});


var line = L.polyline(path),
    thiefMarker = L.animatedMarker(line.getLatLngs(), {
	distance: 400, // meters
	interval: 100, // milliseconds
	icon: thiefIcon,
	autoStart: false,
	onEnd: function() {
	},
    }),
    policeMarker = L.animatedMarker(line.getLatLngs(), {
	distance: 400,
	interval: 100,
	icon: policeIcon,
	autoStart: false,
	onEnd: function() {
	    
	},
    });


var map = new L.Map('map', {
    center: new L.LatLng(41.84, -87.67),
    zoom: 12,
    layers: [baseLayer, heatmapLayer, thiefMarker, policeMarker]
});


heatmapLayer.setData({max: 482, data: crimes});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveMarkers() {
    thiefMarker.start();
    await sleep(1000);
    policeMarker.start();
}

moveMarkers();
