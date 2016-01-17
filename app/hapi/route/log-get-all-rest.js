import { error } from 'winston';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {node: *, limit: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/logs',
    config: {
      auth: 'user'
    },
    handler(request, reply) {
      const node = request.query.node;
      const limit = request.query.limit ? request.query.limit : 50;
      const offset = request.query.offset ? request.query.offset : 0;
      persistence.getModel('log').findAll({offset: offset, limit: limit, raw: true, where: {node: node}}).then(logs => {
        reply({logs: logs});
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
