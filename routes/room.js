var express = require('express');
var router = express.Router();

var roomsService= require('../services/roomsService')

router.get('/', function (req, res, next) {
	console.log('returning the rooms list ');
	roomsService.getRooms(function (err, rooms){
		if(err){
			console.error('failed to get rooms list ')
			res.send([])
		}else {
			res.send(rooms)
		}

	});
});

router.get('/:id', function (req, res, next) {
	console.log('returning the a room', req.params.id);
	roomsService.getRoomById(req.params.id, function(err, room){
		if(err){
			console.error('failed to get a room ')
			res.send({})
		}else {
			res.send(room)
		}
	})

})

router.get('/:id/messages/:indx', function (req, res, next) {
	console.log('returning the room messages ')
	roomsService.getRoomById(req.params.id, function (err, room){
		if(err){
			console.log('failed to get a room data')
			res.send('backed error')
		}else {
			room.getLastMsgs(req.params.indx, function (err, msgs){
				if(err){
					res.send('Failed to get messages ')
				}else {
					res.send(msgs)
				}
			})
		}
	})
})

router.post('/', function (req, res, next) {
	console.log('creating a new room',req.body);
	roomsService.createRoom(req.body.name, function (err, room){
		if(err){
			console.error('failed to create a room ')
		}else {
			res.send(room)
		}
	})
});

router.post('/:id', function (req, res, next){
	console.log('Adding new msg')
	roomsService.getRoomById(req.params.id, function (err, room){
		if(err){
			console.log('failed to get a room data')
			res.send('backed error')
		}else {
			room.addMessage(req.body.msg,req.body.auth, function(err, msg){
				if(err){
					console.log('failed to add a new message')
				}
				console.log('returning new message response ')
				res.send(msg)
			})
		}
	})
})



module.exports = router;