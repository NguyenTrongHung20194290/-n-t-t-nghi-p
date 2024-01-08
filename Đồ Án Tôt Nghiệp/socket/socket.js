const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const cors = require('cors')

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 4000

io.on("connection", (socket) => {
    socket.on('Login', (userId) => {
        try {
            socket.join(userId);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('SendMessage', (messageInfo, listMember, listDeviceId, type, fromweb, IdConvOrigin) => {
        try {
            for (var i in listMember) {
                io.in(listMember[i]).emit('SendMessage', messageInfo);
            }
        } catch (error) {
            console.error(error);
        }
    });
})


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
