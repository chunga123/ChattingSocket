// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// let data = [];
// io.on('connection', function(socket) {
//     console.log('a user connected ');
//     socket.on('disconnect', function() {
//         console.log("Users Disconnect DKM !!");
//     });
//     socket.on('chat message', function(msg) {
//         io.emit('chat message', msg);
//     });
//     socket.on('Create Room', function(a) {
//         io.emit("Recive Room", a);
//     });

// });

// http.listen(5000, function() {
//     console.log('listening on *:5000');
// });
// var express = require('express');
// var socket = require('socket.io');

// var app = express();


// let server = app.listen(5000, function() {
//     console.log('server is running on port 5000')
// });

// let io = socket(server);

// io.on('connection', (socket) => {
//     console.log(socket.id);

//     socket.on('SEND_MESSAGE', function(data) {
//         io.emit('RECEIVE_MESSAGE', data);
//     })
// });
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001;

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('New client connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('chat message', function(msg) {
        io.emit('send message', msg);
    });
    socket.on('Create Room', function(a) {
        io.emit("Recive Room", a);
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`))