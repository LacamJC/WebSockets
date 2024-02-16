const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')

// const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req,res)=>{
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) =>{
    console.log('Um usuario se conectou');

    socket.on('chat message', (msg)=>{
        io.emit('Hello', msg);
    });


    socket.on('chat message', (msg)=>{
        console.log(`Message : ${msg}`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});



// server.listen(port, ()=>{
//     console.log(`Server runnint at port ${port}`);
// })

const port = process.env.PORT ||3000;

// Listen on `port` and 0.0.0.0
server.listen(port, "0.0.0.0", function () {
  console.log(`SERVER OPEN ON PORT ${port}`)
});
