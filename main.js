//set up the server
const server = require('http').createServer()
const io = require('socket.io')(server)

// this function will handle the connections
io.on('connection', function (client) {
	console.log("new connection from", client.id)
  client.on('send_message', function(msj){
	console.log(msj)
  })

// default for this cases
  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

// server listen on port 3010
server.listen(3010, function (err) {
  if (err) throw err
  console.log('listening on port 3010')
})

