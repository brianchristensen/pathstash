/**
 * Created by brian on 6/7/15.
 */
var mapList = angular.module('waypost.mapList.controller', [])

mapList.controller('mapListCtrl', function($scope, $stateParams) {

    $scope.searchText = '';

    $scope.waypostMaps = [
        'Long Beach Hydrobikes',
        'Naples Kayaks',
        'Long Beach metro #154',
        'Riverbed bike trails'
    ];
});