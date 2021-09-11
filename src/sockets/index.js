const Messages = require('../models/Messages');
const User = require('./User');

const users = new User();
const messages = new Messages();

const setSocket = (socket, io) => (fn) => fn(socket, io);

const initConnection = (socket, io) => async (nickname) => {
  users.addUser(socket.id, nickname);
  socket.emit('init', await messages.getAll());
  io.emit('updateUsers', users.getAll());
};

const sendMessage = (_, io) => async (message) => {
  const newMessage = await messages.createMessage(message);
  io.emit('message', newMessage);
};

module.exports = (io) =>
  io.on('connection', async (socket) => {
    const send = setSocket(socket, io);
    socket.on('init', send(initConnection));
    socket.on('message', send(sendMessage));
  });
