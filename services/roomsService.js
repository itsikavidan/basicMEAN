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
	console.log(`creating a new room with name: ${_name}`);
	var room = Room.createRoomInstance(_name)
	this.rooms.push(room)
	console.log(`room created, id :${room.id}`);
	console.log(`rooms count is ${this.rooms.length}`)
	clbk(null, room)
}

exports.getRoomById = function(_id, clbk){
	console.log(`requesting room, by id ${_id}`)
    let room = _.filter(this.rooms , {id:_id})[0];
    if (!room){
        console.error(`failed to find the wanted room by id ${_id}`)
    	return clbk(`failed to find the wanted room by id ${_id}`)
    }
	return clbk(null, room)
}
