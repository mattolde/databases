var mysql = require('mysql');

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
exports.dbConnect = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

var valueNames = "SELECT messages.id AS objectId, users.name AS username,rooms.name AS roomname,message FROM messages JOIN rooms ON(rooms.id = messages.room_id) JOIN users ON(users.id = messages.user_id)";

exports.getAllMessages = function(callback){
  var queryString = valueNames + ';';
  this.dbConnect.query(queryString, callback);
};

exports.getMessagesByRoom = function(room, callback){
  var queryString = valueNames + ' WHERE rooms.name ="' + room + '";';
  this.dbConnect.query(queryString, callback);
};

exports.getMessagesByUser = function(user, callback){
  var queryString = valueNames + ' WHERE users.name ="' + user + '";';
  this.dbConnect.query(queryString, callback);
};

exports.createMessage = function(message){
  this.createUser(message.username);
  this.createRoom(message.roomname);
  var queryString = "INSERT INTO messages (room_id, user_id, message) VALUE((SELECT id FROM rooms WHERE name = '"+ message.roomname +"'), (SELECT id FROM users WHERE name='"+ message.username +"'), '"+ message.message +"');";

  this.dbConnect.query(queryString, function(err, result){
    if(err){
      throw err;
    }
  });

};

exports.createUser = function(user){
  var self = this;
  //check if user with same name exists, if not create it
  var queryString = 'Select count(*) AS count from users where name="'+user+'";';
  this.dbConnect.query(queryString, function(err, result){
    if(err){
      throw err
    }else{
      if(result[0].count === 0){
        //insert user
        queryString = 'Insert into users (name) values("'+user+'");';
        self.dbConnect.query(queryString, function(err, result){
          if(err){
            throw err;
          }
        });
      }
    }
  });
};

exports.createRoom = function(room){
  var self = this;
  //check if room with same name exists, if not create it
  var queryString = 'Select count(*) AS count from rooms where name="'+room+'";';
  this.dbConnect.query(queryString, function(err, result){
    if(err){
      throw err
    }else{
      if(result[0].count === 0){
        //insert room
        queryString = 'Insert into rooms (name) values("'+room+'");';
        this.dbConnect.query(queryString, function(err, result){
          if(err){
            throw err;
          }
        });
      }
    }
  });
};
