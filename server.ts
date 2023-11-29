import http from 'http';
import { app } from './app.js';
import swaggerDocs from './api/utils/swagger.js';

const port = Number(process.env.PORT) || 3000;
const server = http.createServer(app);

server.listen(port, async () => {
	swaggerDocs(app, port);
});
