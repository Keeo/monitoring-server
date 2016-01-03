import RSVP from 'rsvp';
import { info } from 'winston';
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

    createNode(name = this.generators.name.getName()) {
      info(`Creating new node with name: ${name}.`);
      let hash = this.generators.crypto.getNodeHash();
      return this.query('INSERT INTO `node` SET hash = ?, name = ?', [hash, name]).then(result => {
        return {id: result.insertId, hash: hash, name: name};
      });
    },

    getNodeFromHash(hash) {
      info(`Retrieving node based on hash: ${hash.substring(0, 16)}.`);
      return this.query('SELECT * FROM `node` WHERE hash = ?', [hash]).then(result => {
        if (result.length !== 1) {
          return RSVP.reject('Server with this hash was not found.');
        } else {
          return result[0];
        }
      });
    },

    saveLog(node, log) {
      let nodeId = isInteger(node) ? node : node.id;
      info(`Saving log for node ${nodeId} with ${log.substring(0, 32)}.`);
      return this.query('INSERT INTO log SET node_id = ?, log = ?', [nodeId, log]);
    }
  };
}
