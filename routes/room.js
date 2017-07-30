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
			res.status(400).send({msg:'invalid room id'})
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
            res.status(500).send({msg:'failed to get the room data'})
		}else {
			room.getLastMsgs(req.params.indx, function (err, msgs){
				if(err){
					res.status(500).send({mas:'Failed to get messages '});
				}else {
					res.send(msgs)
				}
			})
		}
	})
})

router.post('/', function (req, res, next) {
	console.log('creating a new room',req.body);
    let roomName = req.body.name;
    roomsService.createRoom(roomName, function (err, room){
		if(err){
			console.error('failed to create a room ');
		}else {
			console.log(`succesfully created a new room ${roomName}`);
			res.send(room)
		}
	})
});

router.post('/:id/messages', function (req, res, next){
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
				console.log(`returning new message response, total number of  ${msg}`)
				res.send({msgCount: msg})
			})
		}
	})
})



module.exports = router;