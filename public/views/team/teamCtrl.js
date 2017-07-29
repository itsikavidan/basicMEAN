/**
 * Created by avidan on 08-05-16.
 */
(function () {
	'use strict';

	angular
		.module('ChatApp')
		.controller('TeamCtrl', TeamCtrl);

	TeamCtrl.$inject = ['teamsService','$stateParams'];

	/* @ngInject */
	function TeamCtrl(teamsService,$stateParams) {
		var REFRESH_RATE = 5000;

		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.title = 'TeamCtrl';
		vm.room
		vm.msgCounter
		vm.newMsgAuth = ''
		vm.newMsg = ''
		vm.addNewMsg  =function (){
			teamsService.addMessage(vm.room.id,vm.newMsg, vm.newMsgAuth).then(function (response){
				refresh()
			})
			vm.newMsgAuth = ''
			vm.newMsg = ''

		}

		activate();

		////////////////

		function activate() {
			vm.room = {}
			teamsService.getRoom($stateParams.teamCode).then(function (response){
				vm.room= response.data
				vm.msgCounter = vm.room.msgCounter
			}).catch(function (){
				console.error('failed to get teams ')
				vm.room = {}
			})

			setInterval(refresh, REFRESH_RATE)
		}

		function refresh (){
			teamsService.getMessagesFromIndx(vm.room.id, vm.room.msgCounter).then(function (response){
				vm.msgCounter = response.lastIndx
				if(vm.rooms && vm.rooms.msgs) {
					vm.room.msgs.concat(response.msgs)
				}
			})

		}


	}
})();
