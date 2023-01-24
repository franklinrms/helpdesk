import { io } from '../app'

io.of("/requests").on("connection", (socket) => {
    void socket.join('room')

    const updated = (): void => {
        socket.to('room').emit('updated', '')
    }

    socket.on('update', () => {
        updated()
    })
});
