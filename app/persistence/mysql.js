import mysql from 'mysql';
import merge from '../utils/merge';

export default function(options) {
  options = merge({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'treewer'
  }, options);
  return mysql.createConnection(options);
}
