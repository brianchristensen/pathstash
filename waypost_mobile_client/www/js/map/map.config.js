/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var map = angular.module('waypost.map');

    map.config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('map', {
                url: '/map',
                views: {
                    'map-default': {
                        templateUrl: 'js/map/map.html',
                        controller: 'mapController'
                    }
                }
            });
    }]);

})();
