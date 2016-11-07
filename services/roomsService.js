var Room = require('../model/room')
var _ = require('lodash')
// var Rooms = []

exports.init = function () {
	this.rooms = []
	console.log('rooms service init')
}

exports.getRooms = function(clbk){
	return clbk(null, this.rooms )
}

exports.createRoom = function(_name, clbk){
	var room = Room.createRoomInstance(_name)
	this.rooms .push(room)
	clbk(null, room)
}

exports.getRoomById = function(_id, clbk){
	return clbk(null, _.filter(this.rooms , {id:_id})[0])
}
