import express from 'express';
import http from 'http';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import { Server } from 'socket.io';

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: '*',
    }
})

app.use(cors())
app.use(express.json());
app.use(routes);

export { serverHttp, io};
