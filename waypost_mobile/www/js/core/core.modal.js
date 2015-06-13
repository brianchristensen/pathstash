/**
 * Created by brian on 6/13/15.
 */
var modal = angular.module('waypost.core.modal', ['ionic']);

modal.service('core.modal', ['$ionicModal', '$rootScope', function($ionicModal, $rootScope) {
    var init = function(tpl, $scope) {

        var promise;
        $scope = $scope || $rootScope.$new();

        promise = $ionicModal.fromTemplateUrl(tpl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            return modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        return promise;
    }

    return {
        init: init
    }

}]);
