import Hapi from 'hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import { info, error } from 'winston';
import merge from '../utils/merge';
import routeLoader from './route-loader';

export default class Server {

  /**
   * @param {Persistence} persistence
   * @param {*} options
   */
  constructor(persistence, options) {
    options = merge({port: 3000, routes: {cors: true}}, options);
    info(`Rest api is going to be available on port ${options.port}.`);
    this.persistence = persistence;
    this.server = new Hapi.Server();
    this.server.connection(options);
  }

  registerRoutes() {
    routeLoader(this.server, this.persistence);
  }

  registerAuthorization() {
    let persistence = this.persistence;
    this.server.register(AuthBearer, err => {
      if (err) {
        error(err);
        throw err;
      }

      this.server.auth.strategy('user', 'bearer-access-token', {
        validateFunc(token, callback) {
          persistence.getModel('user').findOne({where: {hash: token}}).then(user => {
            if (user) {
              info(`User ${user.email} authorized successfully.`);
              return callback(null, true, user);
            } else {
              info(`User with token: ${token.substring(0, 16)} not found.`, err);
              return callback(null, false);
            }
          }, err => {
            info(`User authorization failed with token: ${token.substring(0, 16)}.`, err);
            return callback(null, false);
          });
        }
      });

      this.server.auth.strategy('node', 'bearer-access-token', {
        validateFunc(token, callback) {
          persistence.getModel('node').findOne({where: {hash: token}}).then(node => {
            if (node) {
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
  }
}
