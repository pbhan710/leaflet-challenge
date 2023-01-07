// Store URL of earthquake data over the past 7 days in a variable.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Obtain and store the Promise object from the earthquake data URL in a variable.
let promiseObject = d3.json(url);

// Perform a GET request to the URL.
promiseObject.then(function (data) {
    createFeatures(data.features);
});

// Create a function to run for each earthquake.
function createFeatures(data) {
    // Create a function that gives a popup describing the place and time for each earthquake.
    function bindOnEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date (feature.properties.time)}</p>`);
    };

    // Set up a GeoJSON layer that parses through the features array of the GeoJSON data.
    let layerGeoJSON = L.geoJSON(data, {
        onEachFeature: bindOnEachFeature
    });

    // Create map using GeoJSON object.
    createMap(layerGeoJSON);
};

// Create a function to plot earthquake data on a map using Leaflet.
function createMap(data) {
    // Create a map object.
    let map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4
    });

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create function that set size of marker based on magnitude.
    function setSize(magnitude) {
        return Math.sqrt(magnitude) * 500;
    };

    function setColor(depth) {
    };

};