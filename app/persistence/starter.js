import generators from '../generator/generators';
import { Persistence } from './persistence';
import { error, info } from 'winston';

export default function(options) {
  return new Promise((resolve, reject) => {
    let persistence = new Persistence(generators, options);
    persistence.connect();
    persistence.loadModels();
    persistence.sync(options.forceSync).then(() => {
      info('Database synced successfully.');
      return resolve(persistence);
    }, err => {
      error('Database initialization failed.', err);
      return reject(err);
    });
  });
}
