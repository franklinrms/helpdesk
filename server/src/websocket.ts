import prisma from '../prisma/prisma'
import { io } from './app'

io.on('connection', (socket) => {

    socket.on('request_id', (requestId) => {
        void socket.join(requestId)

    } )

    socket.on('message', async (data) => {
        const message = await prisma.message.create({
            data: {
                message: data.message,
                requestId: data.requestId,
                userId: data.userId,
            }
        });

        socket.to(data.requestId).emit('message', message)

    })
})
