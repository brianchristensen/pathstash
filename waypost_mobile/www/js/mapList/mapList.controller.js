/**
 * Created by brian on 6/7/15.
 */
angular.module('waypost.mapList.controller', [])

.controller('mapListCtrl', function($scope, $stateParams) {
    $scope.waypostMaps = [
        'Long Beach Hydrobikes',
        'Naples Kayaks',
        'Long Beach metro #154',
        'Riverbed bike trails'
    ];
});