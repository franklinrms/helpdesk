import { serverHttp } from './app';
import './Chat/chat.websocket'
import './Request/request.websocket'
import 'dotenv/config';

const PORT = process.env.PORT ?? 3031;

const server = serverHttp.listen(PORT, () => { console.log(
  `Server is running on PORT: ${PORT}`,
); });

export default server;
