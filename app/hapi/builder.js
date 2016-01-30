import Server from './server';
import { info } from 'winston';

/**
 * @param {Persistence} persistence
 * @param {*} options
 * @returns {Promise.<Server>}
 */
export default function builder(persistence, options) {
  return new Promise(resolve => {
    let server = new Server(persistence, options);
    server.registerAuthorization();
    server.registerRoutes();
    server.registerSwagger();
    server.server.start(() => {
      info('Hapi server started.');
      resolve(server);
    });
  });
}
