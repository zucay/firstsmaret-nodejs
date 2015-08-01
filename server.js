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
var room = null;
http.listen(listenPort);
io.on('connection', function(socket) {
  //console.log('one user connected: ' + socket.id);
  socket.on('joinRoom', function(roomName) {
    room = socket.join(roomName);
    //console.log('joinned room: ' + roomName + '(' + room.rooms + ')');
    room.on('msg', function(data) {
      //room.emit('msg', data); //明示的にio.to()して部屋を指定しないと、そのroomで接続しているユーザに通知できなかった。
      io.to(roomName).emit('msg', data);
      console.log(data);
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
