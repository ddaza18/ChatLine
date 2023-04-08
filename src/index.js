const express = require('express');
const path = require('path'); //Une directorios
const app = express();
const server = require('http').Server(app); //servidor para socket
const socketio = require('socket.io')(server); //socket

app.set('port',process.env.PORT || 3443);

require('./sockets')(socketio); // se ejecuta lo que este en el archivo sockets

//Inicializamos el puerto
server.listen(app.get('port'), ()=>{
    console.log("Iniciando en el puerto: " +app.get('port'));
});

//Busca los archivos estaticos mediante el path
app.use(express.static(path.join(__dirname, 'public')));        