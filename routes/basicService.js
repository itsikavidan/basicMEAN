var express = require('express');
var router = express.Router();

var sharedService = require('../services/sharedService')

router.get('/', function (req, res, next) {
	console.log('returning the teams');
	res.send('Hello basic service');
});

router.get('/:id', function (req, res, next) {
	console.log('returning the id+id', req.params.id);
	sharedService.sum(req.params.id, req.params.id, function (err,value){
		if(err){
			res.send('Failed to calc input *2 ')
		}else {
			res.send(value+'')
		}
	})

})

router.post('/', function (req, res, next) {
	console.log('service post been called ',req.body);

	res.send({data:{}});
});



module.exports = router;