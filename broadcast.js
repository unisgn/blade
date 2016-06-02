/**
 * Created by 0xFranCiS on Jun 02, 2016.
 */

// var app = require('express')();
// var server = require('http').Server(app);
var io = require('socket.io')(server);

// server.listen(8086);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});