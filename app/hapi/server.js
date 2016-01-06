import Hapi from 'hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import fs from 'fs';
import { info, error } from 'winston';
import merge from '../utils/merge';
import routeLoader from './route-loader';

export default function(persistence, options) {
  options = merge({port: 3000}, options);
  info(`Rest api will be available on port: ${options.port}.`);

  let server = new Hapi.Server();
  server.connection(options);
  server.register(AuthBearer, err => {
    if (err) {
      throw err;
    }

    server.auth.strategy('admin', 'bearer-access-token', {
      validateFunc(token, callback) {
        persistence.getUserFromHash(token).then(user => {
          info(`User ${user.email} authorized successfully.`);
          return callback(null, true, user);
        }, err => {
          info(`Token authorization failed with token: ${token.substring(0, 16)}.`, err);
          return callback(null, false);
        });
      }
    });
  });

  return new Promise(resolve => {
    routeLoader(server, persistence);
    info('Routes loaded.');
    return resolve(server);
  });
}
