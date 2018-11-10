//setting up app
const express = require('express');
const app = express();
app.get('/',(req,res)=>{
	res.send("hello world")
})
// setup sockets
server = app.listen(3010)
const io = require("socket.io")(server);

io.on('connection', function(socket) {
	console.log("New connecction, wuju!");

	socket.on('disconnect', function () {
		console.log('client disconnect...', client.id)
		handleDisconnect()
	})
	
	socket.on('error', function (err) {
		console.log('received error from client:', client.id)
		console.log(err)
	})
})
// var messages = [{
// 	author: "Carlos",
//     text: "Hola! que tal?"
// },{
// 	author: "Pepe",
//     text: "Muy bien! y tu??"
// },{
// 	author: "Paco",
//     text: "Genial!"
// }];

// server.listen(3010, function() {
// 	console.log('Servidor corriendo en http://localhost:3010');
// });

// io.on('connection', function(socket) {
// 	console.log('Un cliente se ha conectado');
//     socket.emit('messages', messages);
// });