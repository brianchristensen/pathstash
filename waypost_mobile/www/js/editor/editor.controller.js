/**
 * Created by brian on 6/7/15.
 */
var editor = angular.module('waypost.editor.controller', []);

editor.controller('editorCtrl', function($scope) {
    // initialize map
    var map = new L.Map('waypostMap');

    // create the OSM tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 17, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(33.7683, -118.1956), 12);
    map.addLayer(osm);

    // initialize editor modes
    $scope.pointEditStack = [];
    $scope.polygonEditStack = [];

    $scope.editorModes = {
        move: 0,
        point: 1,
        polygon: 2
    };

    $scope.activeMode = $scope.editorModes.move;

    // actions
    $scope.saveMap = function() {

    };

    $scope.undoLastEdit = function() {
        var lastEdit;

        switch($scope.activeMode) {
            case $scope.editorModes.point:
                if ($scope.pointEditStack.length > 0) {
                    lastEdit = $scope.pointEditStack.pop();
                }
                break;
            case $scope.editorModes.polygon:
                if ($scope.polygonEditStack.length > 0) {
                    lastEdit = $scope.polygonEditStack.pop();
                }
                break;
            default:
                return;
        }

        if (lastEdit) {
            map.removeLayer(lastEdit);
        }
    };
    
    // switch edit handler
    $scope.changeMode = function(newMode) {
        switch(newMode) {
            case $scope.editorModes.move:
                $scope.activeMode = $scope.editorModes.move;
                map.dragging.enable();
                map.removeEventListener('click', handlePointEdit);
                map.removeEventListener('click', handlePolygonEdit);
                break;
            case $scope.editorModes.point:
                $scope.activeMode = $scope.editorModes.point;
                map.dragging.disable();
                map.addEventListener('click', handlePointEdit);
                map.removeEventListener('click', handlePolygonEdit);
                break;
            case $scope.editorModes.polygon:
                $scope.activeMode = $scope.editorModes.polygon;
                map.dragging.disable();
                map.addEventListener('click', handlePolygonEdit);
                map.removeEventListener('click', handlePointEdit);
                break;
        }
    };

    // private handlers
    function handlePointEdit (event) {
        var geojsonPoint = {
            "type": "Feature",
            "properties": {
                "name": "Waypoint"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [event.latlng.lat,  event.latlng.lng]
            }
        };

        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        var newPoint = L.geoJson(geojsonPoint, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        });

        newPoint.addTo(map);
        $scope.pointEditStack.push(newPoint);
    }

    function handlePolygonEdit (event) {
        var test = event;
    }
});