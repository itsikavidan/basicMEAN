/**
 * Created by avidan on 08-05-16.
 */
(function () {
	'use strict';

	angular
		.module('ChatApp')
		.controller('TeamCtrl', TeamCtrl);

	TeamCtrl.$inject = ['$scope','teamsService','$stateParams','$interval','$state'];

	/* @ngInject */
	function TeamCtrl($scope,teamsService,$stateParams,$interval,$state) {
		var REFRESH_RATE = 5000;
		var refreshPromise;

		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.title = 'TeamCtrl';
		vm.room
		vm.msgCounter

        vm.addNewMsg  =function (){
			teamsService.addMessage(vm.room.id,vm.newMsg, vm.newMsgAuth).then(function (response){
				refresh()
			})
			initValues();

		}

        $scope.$on("$destroy", function() {
            if (refreshPromise) {
                $interval.cancel(refreshPromise);
            }
        });

		activate();

		////////////////

        function initValues() {
            vm.newMsgAuth = ''
            vm.newMsg = ''
        }

		function activate() {
			vm.room = {}
            initValues();
			teamsService.getRoom($stateParams.teamCode).then(function (response){
				vm.room= response.data
				vm.msgCounter = vm.room.msgCounter
			}).catch(function (){
                let message = 'failed to get the rooms ';
                console.error(message);
				alert(message);
				vm.room = {}
                $state.go('teams');
            })

            refreshPromise = $interval(refresh, REFRESH_RATE)
		}

		function refresh (){
			teamsService.getMessagesFromIndx(vm.room.id, vm.room.msgCounter).then(function (response){
                vm.room.msgCounter = response.data.lastIndx
				if(vm.room && vm.room.msgs) {
                    vm.room.msgs = vm.room.msgs.concat(response.data.msgs)
				}
			})

		}


	}
})();
