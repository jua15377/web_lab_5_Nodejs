//set up the server
const server = require('http').createServer()
const io = require('socket.io')(server)
const FormData = require('form-data')
const fetch = require("node-fetch")
const axios = require('axios')
const url = 'http://34.210.35.174:7000/'
var total_msj = 0
// this function will handle the connections
io.on('connection', async function (client) {
  console.log("new connection from", client.id)

  // sent all the past messages to the client
  try{
    const response = await axios.get(url)
    total_msj = response.data.length
    console.log("sending past messages", total_msj)
    client.emit("first_conn", response.data)
  }
  catch(e) {
    console.error(e)
  }
  // send message to the the API
  try{
    client.on('send_message',async function(st_id, nick, text){
      // setting data
      
      var data = new FormData()
      data.append('student_id', st_id)
      data.append('text', text)
      data.append('nick', nick)
      const otherParam={
        method:"POST",
        body: data
      }
      console.log("pre fetch",total_msj)
      const a = await fetch(url,otherParam)
      console.log("post fetch",total_msj)
      total_msj++
      console.log("count post fetch",total_msj)
    })
  }
  catch(e) {
		console.error(e)
  }

// default for cases
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

async function chek_for_new_msj(){
    // method to be executed
    try {
      const response = await axios.get(url)
      const messages = response.data
      if (messages.length !== total_msj) {
        console.log("new message found:", messages[messages.length - 1])
        io.emit('new_message', messages[messages.length - 1])
        total_msj = messages.length
      }
    } 
    catch(err) {
      console.error(err)
    }
}

async function start(){
  const response = await axios.get(url)
  total_msj = response.data.length
  setInterval(chek_for_new_msj, 500)
}

start()



