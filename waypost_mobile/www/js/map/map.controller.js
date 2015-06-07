/**
 * Created by brian on 6/7/15.
 */
var mapCtrl = angular.module('waypost.map.controller', []);

mapCtrl.controller('mapCtrl', function($scope, $stateParams) {
    // initialize map
    var map = new L.Map('waypostMap');

    // create the OSM tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 17, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(33.7683, -118.1956), 12);
    map.addLayer(osm);
    console.log(map.getCenter());
});