/**
 * Created by avidan on 08-05-16.
 */
(function () {
	'use strict';
	angular
		.module('ChatApp')
		.controller('TeamsCtrl', TeamsCtrl);

	TeamsCtrl.$inject = ['teamsService'];

	/* @ngInject */
	function TeamsCtrl(teamsService) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.title = 'teamsCtrl';
		vm.teams = []
		vm.newRoomName = ''

		vm.createNewRoom = function () {
			alert('this will create a new room ')
			teamsService.createRoom(vm.newRoomName).then(function () {
				refresh()
				vm.newRoomName = ''
				alert('created a new room')
			}).catch(function (){
				alert('failed to create a new room !')
			})
		}


		activate();

		////////////////

		function activate() {
			refresh()
		}

		function refresh() {
			teamsService.getRooms().then(function (response) {
				vm.rooms = response.data
			}).catch(function () {
                let message = 'failed to get teams ';
                console.error(message)
				alert(message)
				vm.teams = []
			})
		}


	}
})();
