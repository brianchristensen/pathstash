/**
 * Created by brian on 6/13/15.
 */
var util = angular.module('waypost.core.utility', []);

util.service('core.utility', [function() {
    var self = this;

    self.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}]);
