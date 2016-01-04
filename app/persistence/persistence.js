import RSVP from 'rsvp';
import { info, warn } from 'winston';
const { isInteger } = Number;

export default function(connection, generators) {
  return {
    generators: generators,
    connection: connection,

    query(query, values) {
      return new Promise((resolve, reject) => {
        this.connection.query(query, values, (error, result) => {
          return error ? reject(error) : resolve(result);
        });
      });
    },

    createNode(owner, name = this.generators.name.getName()) {
      info(`Creating new node with name: ${name}.`);
      let hash = this.generators.crypto.getNodeHash();
      let user = isInteger(owner) ? owner : owner.id;
      return this.query('INSERT INTO `node` SET hash = ?, user = ?, name = ?', [hash, user, name]).then(result => {
        return {id: result.insertId, hash: hash, name: name, user: user};
      });
    },

    getUserFromHash(hash) {
      info(`Retrieving user based on hash: ${hash.substring(0, 16)}.`);
      return this._getOne('SELECT * FROM `user` WHERE hash = ?', hash);
    },

    getNodeFromHash(hash) {
      info(`Retrieving node based on hash: ${hash.substring(0, 16)}.`);
      return this._getOne('SELECT * FROM `node` WHERE hash = ?', hash);
    },

    getNodeFromId(id) {
      info(`Retrieving node based on id: ${id}.`);
      return this._getOne('SELECT * FROM `node` WHERE id = ?', id);
    },

    getNodes() {
      info(`Retrieving nodes`);
      return this._getAll('node');
    },

    saveLog(node, severity, message, context, created) {
      return this.query('INSERT INTO log SET node = ?, severity = ?, message = ?, context = ?, created = ?', [
        node, severity, message, context, created
      ]).then(null, err => console.log(err));
    },

    getLogs(node, limit) {
      return this.query('SELECT * FROM log WHERE node = ? ORDER BY created DESC LIMIT ?', [node, limit]);
    },

    _getAll(table) {
      return this.query('SELECT * FROM ??', [table]);
    },

    _getOne(query, key) {
      return this.query(query, [key]).then(result => {
        if (result.length !== 1) {
          warn(`Something with key: '${key}' was not found.`, {query: query, key: key});
          return RSVP.reject('Something with this hash was not found.');
        } else {
          return result[0];
        }
      });
    }
  };
}
