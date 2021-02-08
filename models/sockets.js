
class Sockets {

  constructor(io){
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {

    this.io.on('connection', (socket) => {
      console.log('cliente conectado');

      socket.emit('message-server', 'Bienvenido al servidor socket');

      socket.on('message-client', (data) => {
      console.log(data);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
        });
    });
  }

}

module.exports = Sockets;