var utils = require('./utils');
var db = require('./db');

var idCounter = 1;
var messages = [
  {    username: 'fred',
    text: 'hello world',
    roomName: 'lobby',
    objectId: idCounter
  }
];

var getMessages = function(request, response) {
  db.getAllMessages(function(err, results, fields){
    utils.sendResponse(response, {results: results});
  });
};


var postMessage = function(request, response) {
  utils.collectData(request, function(message) {
    // save message to DB and return {objectId: message.objectId}
    utils.sendResponse(response, db.createMessage(message));
  });
};

var options = function(request, response) {
  utils.sendResponse(response);
};

var actions = {
  'GET': getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

module.exports = function(request, response) {

  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.send404(response);
  }
};
