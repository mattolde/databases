/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = sequelize.define('users', {
  id: Sequelize.UUID,
  name: Sequelize.STRING,
});

var Rooms = sequelize.define('rooms', {
  id: Sequelize.UUID,
  name: Sequelize.STRING,
});

var Messages = sequelize.define('messages', {
  id: Sequelize.UUID,
  messages: Sequelize.STRING
});

Messages.hasOne(Rooms);
Messages.hasOne(Users);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({user_name: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {user_name: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].user_name + " exists");
      }
    });
  });
});
