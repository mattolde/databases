var utils = require('./utils');
var db = require('./db');

var getMessagesByRoom = function(request, response) {
  utils.collectData(request, function(room) {
    // save message to DB and return {objectId: message.objectId}
    utils.sendResponse(response, {results: db.getMessagesByRoom(room)});
  });
};

var actions = {
  'GET' : getMessagesByRoom
};

module.exports = function(request, response){
  var action = actions[request.method];
  if(action){
    action(request, response);
  }else{
    utils.send404(response);
  }
};

//add functionality for checking if room exists and throwing
//an error otherwise
