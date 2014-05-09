-- CREATE DATABASE chat;

USE chat;
/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/

CREATE TABLE users (
  id INT not null auto_increment,
  name VARCHAR(255),
  primary key(id)
);

CREATE TABLE rooms (
  id INT not null auto_increment,
  name VARCHAR(255),
  primary key(id)
);

CREATE TABLE messages (
  id INT not null auto_increment,
  message VARCHAR(255),
  user_id INT,
  room_id INT,
  primary key(id),
  foreign key(user_id) REFERENCES users(id)
  on update cascade,
    -- on delete cascade
  foreign key(room_id) REFERENCES rooms(id)
  on update cascade
    -- on delete cascade
) ENGINE = InnoDB;

-- SELECT *, rooms.name AS roomName, users.name AS usersName, message
-- FROM messages
-- JOIN users ON (users.id = messages.user_id)
-- JOIN rooms ON (rooms.id = messages.room_id)
-- WHERE rooms.name LIKE 'lobb%'
