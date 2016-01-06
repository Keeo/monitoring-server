import mysql from './mysql';
import persistence from './persistence';
import generators from '../generator/generators';
import { error, info } from 'winston';

export default function(options) {
  return new Promise((resolve, reject) => {
    let connection = mysql(options);
    connection.connect(err => {
      if (err) {
        error('Mysql connection failed.', err);
        return reject(err);
      }

      info('Mysql connection opened.');
      connection.query('SELECT 1 + 1 AS solution', (err, rows) => {
        if (err || rows[0].solution !== 2) {
          error('Mysql self-test failed.', err);
          return reject(err);
        } else {
          info('Mysql connection tested successfully.');
          return resolve(persistence(connection, generators));
        }
      });
    });
  });
}
