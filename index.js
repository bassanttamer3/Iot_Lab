const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/iot.html');
});

let submissions = [];

io.on('connection', (socket) => {
    console.log('A user connected');

   
    socket.emit('update-list', submissions);

    
    socket.on('new-data', (data) => {
        console.log('Received data:', data);
        submissions.push(data);
        io.emit('update-list', submissions); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const port = 4000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
