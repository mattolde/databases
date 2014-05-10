var utils = require('./utils');
var urlParse = require('url');
var db = require('./db');
var queryString = require('querystring');

var getMessagesByUser = function(request, response, user) {
  // save message to DB and return {objectI: message.objectId}
  //
  db.getMessagesByUser(user, function(err, results){
    if(err){
      utils.send404(response);
    } else {
      utils.sendResponse(response, {results: results});
    }
  });
};

var options = function(request, response) {
  utils.sendResponse(response);
};

var actions = {
  'GET' : getMessagesByUser,
  'OPTIONS' : options
};

module.exports = function(request, response){
  var action = actions[request.method];
  if(action){
    var user = queryString.parse(urlParse.parse(request.url).query).username;
    action(request, response, user);
  }else{
    utils.send404(response);
  }
};

//add functionality for checking if user exists and throwing
//an error otherwise
