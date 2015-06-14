/**
 * Created by brian on 6/7/15.
 */
var editor = angular.module('waypost.editor.controller', ['waypost.core.utility', 'waypost.core.modal']);

editor.controller('editorCtrl', ['$scope', '$ionicModal', 'core.utility', 'core.modal',
function($scope, $ionicModal, utility, modal) {
    // initialize map
    var map = new L.Map('waypostMap', { zoomControl:false });
    if (map.tap) {
        map.tap.disable(); // allow quick-tap control on mobile
    }
    map.dragging.disable();
    
    // create the mapbox tile layer with correct attribution
    var mapBoxToken = 'pk.eyJ1IjoidXNlcmxvZ2ljbWFuIiwiYSI6ImE2OGE0NDAxNTgwYjFmYjJiZGIwNDk3YTYxMGEzNTQxIn0.GKy2HENjVpvTHtujUYVFaQ';
    var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/userlogicman.0bf0f043/{z}/{x}/{y}.png?access_token=' + mapBoxToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });

    // create the OSM tile layer with correct attribution
    //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    //var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 17, attribution: osmAttrib});

    // start the map in Long Beach, CA
    map.setView(new L.LatLng(33.7683, -118.1956), 12);
    map.addLayer(mapboxTiles);

    // initialize editor modes
    $scope.pointEditStack = [];
    $scope.polygonEditStack = [];

    $scope.editorModes = {
        default: 0,
        drag: 1,
        point: 2,
        polygon: 3
    };

    $scope.activeMode = $scope.editorModes.default;

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
                    currentPolygon = null;
                    currentPolygonNodes = [];
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
            case $scope.editorModes.default:
                $scope.activeMode = $scope.editorModes.default;
                map.dragging.disable();
                // if switching back to default, clear out the last polygon edits
                if (currentPolygon) {
                    currentPolygon = null;
                    currentPolygonNodes = []
                }
                // remove editor event listeners
                map.removeEventListener('click', handlePointEdit);
                map.removeEventListener('click', handlePolygonEdit);
                break;
            case $scope.editorModes.drag:
                $scope.activeMode = $scope.editorModes.drag;
                map.dragging.enable();
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

    // handle point edits
    var currentPoint;
    function handlePointEdit (event) {
        currentPoint = L.marker([event.latlng.lat, event.latlng.lng]);

        modal.init('js/editor/point.popupData.html', $scope)
            .then(function(modal) {
                $scope.modal.popupTitle = '';
                $scope.modal.popupText = '';
                modal.show();
            });
    }

    $scope.savePointEdit_popup = function() {
        $scope.closeModal();
        currentPoint.bindPopup('<b>' + $scope.modal.popupTitle + '</b><br/>' +
                                            $scope.modal.popupText).addTo(map);
        $scope.pointEditStack.push(currentPoint);
    }

    $scope.savePointEdit_noPopup = function() {
        $scope.closeModal();
        currentPoint.addTo(map);
        $scope.pointEditStack.push(currentPoint);
    }

    // handle polygon edits
    var currentPolygon;
    var currentPolygonNodes = [];
    function handlePolygonEdit (event) {
        if (!currentPolygon) {
            currentPolygonNodes.push([event.latlng.lat, event.latlng.lng]);
            currentPolygon = L.polygon(currentPolygonNodes);
            currentPolygon.addTo(map).bringToBack();
            $scope.polygonEditStack.push(currentPolygon);
        } else {
            map.removeLayer(currentPolygon);
            currentPolygonNodes.push([event.latlng.lat, event.latlng.lng]);
            currentPolygon = L.polygon(currentPolygonNodes);
            currentPolygon.addTo(map).bringToBack();
            $scope.polygonEditStack.pop();
            $scope.polygonEditStack.push(currentPolygon);
        }
    }

    // add data to point edits
    $ionicModal.fromTemplateUrl('js/editor/point.popupData.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
}]);