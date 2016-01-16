import { info, error } from 'winston';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/log/',
    /*config: {
      auth: 'node'
    },*/
    handler(request, reply) {
      // faked node
      let node = request.auth.credentials;
      node = {name: 'karel', id: 1};
      let log = request.payload.log;
      info(`Saving log from node ${node.name} with message '${log.message.substring(0, 16)}'.`, log);
      persistence.getModel('log').create({
        node: node.id,
        severity: log.severity,
        message: log.message,
        context: log.context,
        clientCreatedAt: log.created
      }).then(({dataValues}) => {
        reply(dataValues);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
