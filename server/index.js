'use strict';

const http = require('http');
const socketIO = require('socket.io');

const app = http.createServer().listen(8080);
const io = socketIO.listen(app);

console.log('Server listening on port 8080');

io.sockets.on('connection', socket => {
    socket.on('message', message => {
        console.log('Client said: ', message);
    });

    socket.on('create or join', room => {
        const clientsInRoom = io.sockets.adapter.rooms[room];
        const numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;

        if (numClients === 0) {
            socket.join(room);
            socket.emit('created', room);

        } else if (numClients === 1) {
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room);
            io.sockets.in(room).emit('ready');
        } else { // max two clients
            socket.emit('full', room);
        }
    });
});
