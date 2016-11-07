/**
 * Created by avidan on 08-05-16.
 */
(function () {
	angular.module('DaPulseChat')
		.factory('teamsService', TeamsServiceFactory)

	TeamsServiceFactory.$inject = ['$http']

	/* @ngInject */
	function TeamsServiceFactory($http) {

		var service = {
			getRooms: getRooms,
			getRoom: getRoom,
			createRoom : createRoom,
			addMessage:addMessage,
			getMessagesFromIndx:getMessagesFromIndx
		}

		return service;


		function getRooms() {
			return $http.get('rooms')
		}

		function getRoom(roomId) {
			var url = ['rooms', roomId].join('/')
			return $http.get(url)
		}

		function createRoom(roomName){
			var url = ['rooms', ''].join('/')
			return $http.post(url, {name:roomName})
		}

		function addMessage(roomId, msg, auth){
			var url = ['rooms',roomId] .join('/')
			return $http.post(url, {msg:msg, auth:auth})
		}

		function getMessagesFromIndx(roomId, indx){
			var url = ['rooms', roomId,'messages',indx].join('/')
			console.log(url)
			return $http.get(url)
		}
	}
})();
