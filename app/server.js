import Hapi from 'hapi';
import fs from 'fs';
import { info } from 'winston';

export default function server(options) {
  options = options || {port: 3000};
  info('==========================================================================');
  info(`Server starting on port ${options.port} at ${new Date()}`);

  let server = new Hapi.Server();
  server.connection(options);

  info('Routes: ');
  fs.readdirSync('./dist/route').forEach(route => {
    server.route(require(`../dist/route/${route}`));
    info(`  ${route} - done`);
  });
  info('Routes loaded');

  return server;
}
