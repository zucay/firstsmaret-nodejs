"use strict";

//settings--start
var listenPort = process.env.PORT || 3000;
//settings--end

var html = require('fs').readFileSync('index.html');
var http = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html)
});

var io = require('socket.io')(http);
http.listen(listenPort);
io.on('connection', function(socket) {
  socket.on('joinRoom', function(roomName) {
    var room = socket.join(roomName);
    console.log('joinned room: ' + roomName);
    room.on('msg', function(data) {
      room.emit('msg', data);
    });
  });
});
