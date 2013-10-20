var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

server.listen(8000);

io.sockets.on('connection', function (socket) {
  socket.on('offer', function(desc) {
    io.sockets.emit('callee offer', desc);
  });

  socket.on('answer', function(desc) {
    io.sockets.emit('caller answer', desc);
  });

  socket.on('new caller candidate', function(candidate) {
    io.sockets.emit('callee candidate', candidate);
  });

  socket.on('new callee candidate', function(candidate) {
    io.sockets.emit('caller candidate', candidate);
  });
});
