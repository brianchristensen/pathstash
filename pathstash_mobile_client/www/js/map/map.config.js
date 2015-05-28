/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var map = angular.module('pathstash.paths');

    map.config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'js/paths/map.html',
                controller: 'mapController'
            });
    }]);

})();
