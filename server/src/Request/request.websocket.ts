import { io } from '../app'

io.of("/requests").on("connection", (socket) => {
    void socket.join('room')

    socket.on('update', (requestId) => {
        socket.to('room').emit('updated', requestId)
    })
});
