import server from './mysql';
import RSVP from 'rsvp';
import { error, info } from 'winston';

export default function(options) {
  return new RSVP.Promise((resolve, reject) => {
    let instance = server(options);
    instance.connect(err => {
      if (err) {
        error('Mysql connection failed.', err);
        return reject(err);
      }

      info('Mysql connection opened.');
      instance.query('SELECT 1 + 1 AS solution', (err, rows) => {
        if (err || rows[0].solution !== 2) {
          error('Mysql self-test failed.', err);
          return reject(err);
        } else {
          info('Mysql connection tested successfully.');
          return resolve(instance);
        }
      });
    });
  });
}
