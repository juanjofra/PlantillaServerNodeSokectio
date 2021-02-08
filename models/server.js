const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const path      = require('path');
const Sockets   = require('./sockets');
const cors      = require('cors');

class Server {

  constructor(){

    this.app =  express();
    this.port = process.env.PORT;

    //HTTP server
    this.server = http.createServer( this.app );

    //SocketIo
    this.io = socketio(this.server);
  }

  middlewares () {
    //Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //Uso de cors
    this.app.use( cors() );
  }


  configurarSockets() {
    new Sockets(this.io);
  }


  execute(){
    //Inicializar Middleware
    this.middlewares();

    //Inicializar Sockets
    this.configurarSockets();

    //Iniciar el server
    this.server.listen(this.port, () => {
      console.log('listening on:'+ this.port);
    });
  }
}

module.exports = Server;