var express = require('express');
var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  //res.send('<h1>Hellow World </h1>');
  res.sendFile(__dirname + "/index.html");
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + "/game.html");
});

io.on('connection', function(socket){
  console.log('A user connected');

  //Handler for the add username function
  socket.on('add username', function(usernm){
    //console.log(usernm);
    io.emit('add username', usernm);
  });

  //Handler for the send a message function

  socket.on('send msg', function(values){
    console.log(values);
    io.emit('send msg', values);
  });

  //Handler for game win function
  socket.on('you win', function(winner){
    console.log(winner);
    io.emit('you win', winner);
  });

  //Handler for the new game function
  socket.on('new game', function(empty){
    io.emit('new game', empty);
  });

//Handler for the end chat function
socket.on('end chat', function(enduser){
  console.log(enduser);
  io.emit('end chat', enduser);
  socket.on('disconnect', function(){
    console.log('A user disconnected');
   });
});

}); //end of socket listeners

http.listen(process.env.PORT || 3000, function(){ //Need the port to deploy from the web server, 3000 is for localhost
  console.log("Waiting for visitors");
});
