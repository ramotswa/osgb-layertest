This is a test environment for an OSGB WMTS / WMS layer test. 


Usage; 

Deploy the whole foler into a web container (apache for instance). 

The important files are;
- leaflet-complete.html
- leaflet-complete.js
- leaflet.css
- /lib folder


Note; you will need to add the url of your server (and change the layer name if it doesn't exist on the server).
This is done in leaflet-complete.js here:
https://github.com/ramotswa/osgb-layertest/blob/master/leaflet/leaflet-complete.js#L27

The combination of these should give you a map.

Any questions just raise an issue.

