var uuid = require('uuid')
var _ = require('lodash')

var Room = function (_name) {
	this.id = uuid.v4()
	this.msgCounter = 0
	this.msgs = []
	this.setName(_name)
}

Room.prototype.setName = function (_name) {
	this.name = _name
}

Room.prototype.addMessage = function (_msg, _auth, clbk) {
	if (!_msg || !_auth) {
		return clbk('invalid message input')
	}
	var newMsg = {
		body: _msg,
		auth: _auth,
		id: uuid.v4()
	}
	this.msgs.push(newMsg);
	console.log('Added message');
	clbk(null, ++this.msgCounter)
}

Room.prototype.getMsgs = function (_from, _to, clbk) {
	try {
        if (_from >= 0, _from < _to && _to > this.msgCounter) {
            return clbk('invalid msgs index ')
        }
        console.log(`bbb ${ {msgs: this.msgs.slice( _from, _to), lastIndx: this.msgCounter}}`);
        clbk(null, {msgs: this.msgs.slice( _from, _to), lastIndx: this.msgCounter});
    }
    catch (e){
		console.error(`failed to get messages: ${e.message} `);
		clbk(`failed to get messages`);
	}
}

Room.prototype.getAllMsgs = function(clbk){
	return this.getMsgs(0,this.msgCounter, clbk)
}

Room.prototype.getLastMsgs = function (indx, clbk){
	if (indx) {
        return this.getMsgs(indx, this.msgCounter, clbk)
    }else {
		return this.getAllMsgs(clbk)
	}
}

exports.createRoomInstance  = function(_name ){
	return new Room(_name)
}




