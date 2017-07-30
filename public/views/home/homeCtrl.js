/**
 * Created by avidan on 08-05-16.
 */
(function () {
    'use strict';

    angular
        .module('ChatApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope','teamsService','$stateParams','$interval','$state'];

    /* @ngInject */
    function HomeCtrl($scope) {

        $scope.$on("$destroy", function() {
        });

        activate();

        ////////////////


        function activate() {
        }


    }
})();
