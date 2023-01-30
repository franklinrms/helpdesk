import { io } from '../app'
import createNewMessage from './chat.service'


io.of("/chat").on("connection", (socket) => {
    socket.on('request_id', (requestId) => {
        void socket.join(requestId)
    })

    socket.on('message', async (data) => {
        const message = await createNewMessage({
            message: data.message,
            requestId: data.requestId,
            userId: data.userId,
        })

        socket.to(data.requestId).emit('message', message)
    })
});
