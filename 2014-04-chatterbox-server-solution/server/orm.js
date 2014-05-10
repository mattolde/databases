var Sequelize = require('sequelize');

//create users
//create rooms
//create messages

//create foreign keys for messages -> rooms, messages -> users

//sync and startup, db connection?
var Messages, Users, Rooms;


exports.dbConnect = function(){
  var sequelize = new Sequelize('chat', 'root', '', {
      dialect: 'mysql',
      port:    3306, // or 5432 (for postgres)
    });

  sequelize
    .authenticate()
    .complete(function(err) {
      if (!!err) {
        console.log('Unable to connect to the database:', err);
      } else {
        console.log('Connection has been established successfully.');

        Users = sequelize.define('users', {
          name: Sequelize.STRING
        });

        Rooms = sequelize.define('rooms', {
          name: Sequelize.STRING
        });

        Messages = sequelize.define('messages', {
          message: Sequelize.STRING
        });

        Messages.hasOne(Rooms);
        Rooms.belongsTo(Messages);

        Messages.hasOne(Users);
        Users.belongsTo(Messages);
      }
    });
};


exports.getAllMessages = function(callback){
  Messages
  .findAll()
  .complete(function(err, messages) {
    if (err) {
      console.log('An error occurred while searching for all messages:', err);
    } else {
      console.log('Got all messages ');
      callback(messages);
    }
  });
};

exports.getMessagesByRoom = function(room, callback){

};

exports.getMessagesByUser = function(user, callback){

};

exports.createMessage = function(message){

  Users
    .findOrCreate({ name: message.username })
    .success(function(user, created) {

      Rooms
        .findOrCreate({ name: message.roomname })
        .success(function(room, created) {

          Messages
            .create({ message: message.message, room_id: room.id, user_id: user.id })
            .success(function(message, created) {
              console.log('CREATED MSG ', created);
            });

        });
    });



};

// exports.createUser = function(user){
//   Users
//     .findOrCreate({ name: user })
//     .success(function(user, created) {
//       return user;
//     });
// };

// exports.createRoom = function(room){
//   Rooms
//     .findOrCreate({ name: room })
//     .success(function(room, created) {
//       return room;
//     });
// };
