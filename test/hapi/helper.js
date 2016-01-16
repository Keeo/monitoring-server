import Server from '../../app/hapi/server';
import Persistence from '../../app/persistence/persistence';

/**
 * @param {Server} server
 * @returns {Promise.<{}>}
 */
export function getNode(server) {
  return server.persistence.getModel('node').find({raw: true});
}

/**
 * @param {Server} server
 * @returns {Promise.<{}>}
 */
export function getUser(server) {
  return server.persistence.getModel('user').find({raw: true});
}

/**
 * @returns {Promise.<Persistence>}
 */
export function getPersistenceInstance() {
  return new Promise(resolve => {
    let persistence = new Persistence({
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'monitoring',
      port: '3306',
      dialect: 'sqlite',
      storage: __dirname + '/../../tmp/test-database.sqlite',
      logging: false
    });
    persistence.connect();
    persistence.loadModels();
    persistence.sync(true).then(() => {
      persistence.testConnection().then(() => {
        persistence.loadFixtures().then(() => {
          resolve(persistence);
        });
      });
    });
  })
}

/**
 * @returns {Promise.<Server>}
 */
export function getServerInstance() {
  return new Promise(resolve => {
    getPersistenceInstance().then(persistence => {
      let server = new Server(persistence);
      server.registerAuthorization();
      server.registerRoutes();
      server.server.start(() => {
        return resolve(server);
      })
    });
  });
}
