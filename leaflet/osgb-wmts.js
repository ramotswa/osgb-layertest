// Define a Proj4Leaflet crs instance configured for British National Grid
// (EPSG:27700) and the resolutions of our base map
var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [2500,1000,500,200,100,50,25,10,5,4,2.5,2,1.75,1,0.75,0.5,0.25]
    }
);

// Define a standard Leaflet map specifying our crs instance and define a WMS
// base map
var map = new L.Map('map', {
    crs: crs   
});
var url = "http://ivm-dev-geoserver01-c1:8080/geoserver/gwc/service/wmts?"
var layerTimerStart;
var layerTimerStop;
var tileTimerStart;
var tileTimerStop;
var averageTileLoadTime = 0;
var tileCount;

map.setView([51.5, -0.2], 10);

var myNewLayer = new L.TileLayer.WMTS( url ,
                               {
                                   layer: 'collinsbartholomew:Londonpanorama20',
                                   style: "normal",
                                   tilematrixSet: "ESPG:27700",
                                   format: "image/png8",
                                   tilesize: 128
                               }
                              );

map.addLayer(myNewLayer);


var myLayer = L.tileLayer.wms('http://ivm-dev-geoserver01-c1:8080/geoserver/gwc/service/wms?',
 {
    //subdomains: ['1','2'],
    layers: 'collinsbartholomew:Londonpanorama20',
    tiled: true,
    format: 'image/png8',
    transparent: true,
    
    tileSize: 128,
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true
});

map.addLayer(myLayer);


myLayer.on("loading",function() {
    layerTimeStart = new Date();
});

myLayer.on("load",function() { 
    layerTimeStop = new Date();
    var timeDiff = Math.abs(layerTimeStop.getTime() - layerTimeStart.getTime());
    console.log("all visible tiles have been loaded in " + timeDiff + ' milliseconds');
    console.log("average tile load time is " + averageTileLoadTime + ' milliseconds for ' +  tileCount + ' tiles.') 
    tileCount = 0;
    averageTileLoadTime = 0;
});

myLayer.on("tileloadstart",function() {
    tileTimerStart = new Date();
});

myLayer.on("tileload",function() { 
    tileCount ++;
    tileTimerStop = new Date();
    var timeDiff = Math.abs(tileTimerStop.getTime() - tileTimerStart.getTime());
    averageTileLoadTime =+ timeDiff;
    averageTileLoadTime = averageTileLoadTime / tileCount;
    
    tileTimerStart = new Date();
});
