import Hapi from 'hapi';
import fs from 'fs';
import { info } from 'winston';
import merge from '../utils/merge';

export default function(persistence, options) {
  options = merge({port: 3000}, options);
  info(`Rest api will be available on port: ${options.port}.`);

  let server = new Hapi.Server();
  server.connection(options);

  info('Routes: ');
  fs.readdirSync('./dist/hapi/route').forEach(route => {
    server.route(require(`../../dist/hapi/route/${route}`)(persistence));
    info(`  ${route} - done`);
  });
  info('Routes loaded');

  return server;
}
