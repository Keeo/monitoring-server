import Server from '../../app/hapi/server';

/**
 * @returns {Promise.<Server>}
 */
export function getServerInstance() {
  return new Promise(resolve => {
    let server = new Server();
    server.registerAuthorization();
    server.registerRoutes();
    server.server.start(() => {
      return resolve(server);
    })
  });
}
