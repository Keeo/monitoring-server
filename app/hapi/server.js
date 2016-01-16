import Hapi from 'hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import { info } from 'winston';
import merge from '../utils/merge';
import routeLoader from './route-loader';

/**
 * @param {Persistence} persistence
 * @param {*} options
 * @returns {Promise}
 */
export default function(persistence, options) {
  options = merge({port: 3000}, options);
  info(`Rest api will be available on port: ${options.port}.`);

  let server = new Hapi.Server();
  server.connection(options);
  server.register(AuthBearer, err => {
    if (err) {
      throw err;
    }

    server.auth.strategy('user', 'bearer-access-token', {
      validateFunc(token, callback) {
        persistence.getModel('user').findOne({where: {hash: token}}).then(user => {
          if (user) {
            info(`User ${user.email} authorized successfully.`);
            return callback(null, true, user);
          } else {
            info(`User authorization failed with token: ${token.substring(0, 16)}.`, err);
            return callback(null, false);
          }
        }, err => {
          info(`User authorization failed with token: ${token.substring(0, 16)}.`, err);
          return callback(null, false);
        });
      }
    });

    server.auth.strategy('node', 'bearer-access-token', {
      validateFunc(token, callback) {
        persistence.getModel('node').findOne({where: {hash: token}}).then(node => {
          if(node) {
            info(`Node ${node.name} with id ${node.id} authorized successfully.`);
            return callback(null, true, node);
          } else {
            info(`Node authorization failed with token: ${token.substring(0, 16)}.`, err);
            return callback(null, false);
          }
        }, err => {
          info(`Node authorization failed with token: ${token.substring(0, 16)}.`, err);
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
