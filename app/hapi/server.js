import Hapi from 'hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import fs from 'fs';
import { info, error } from 'winston';
import merge from '../utils/merge';

export default function(persistence, options) {
  options = merge({port: 3000}, options);
  info(`Rest api will be available on port: ${options.port}.`);

  let server = new Hapi.Server();
  server.connection(options);

  server.register(AuthBearer, err => {
    server.auth.strategy('admin', 'bearer-access-token', {
      validateFunc(token, callback) {
        persistence.getUserFromHash(token).then(user => {
          info(`User ${user.email} authorized successfully.`);
          return callback(null, true, user);
        }, err => {
          info(`Token authorization failed with token: ${token.substring(0, 16)}.`);
          return callback(null, false);
        });
      }
    });
  });

  info('Routes: ');
  fs.readdirSync('./dist/hapi/route').forEach(route => {
    server.route(require(`../../dist/hapi/route/${route}`)(persistence));
    info(`  ${route}`);
  });
  info('Routes loaded');

  return server;
}
