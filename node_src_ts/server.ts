import App from './app';
import { createServer } from 'http';
import { Application } from 'express';

const port = normalizePort(process.env.PORT || 3000);
const expressApp: Application = App.app;
expressApp.set('port', port);

const server = createServer(expressApp);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  const portNumber: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(portNumber)) return val;
  else if (portNumber >= 0) return portNumber;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
