import { Persistence } from './persistence';
import { error, info } from 'winston';

/**
 * @param {*} options
 * @returns {Promise}
 */
export default function(options) {
  return new Promise((resolve, reject) => {
    let persistence = new Persistence(options);
    persistence.connect();
    persistence.loadModels();
    persistence.testConnection().then(() => {
      persistence.sync(options.forceSync).then(() => {
        info('Database synced successfully.');
        return resolve(persistence);
      }, err => {
        error('Database initialization failed.', err);
        return reject(err);
      });
    }, err => {
      error('Test database connection failed.', err);
      return reject(err);
    });
  });
}
