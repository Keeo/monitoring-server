import { error } from 'winston';
import Joi from 'joi';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {node: *, limit: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/log/{node}/{limit?}',
    config: {
      auth: 'user',
      validate: {
        params: {
          node: Joi.number().integer(),
          limit: Joi.number().integer()
        }
      }
    },
    handler(request, reply) {
      const node = request.params.node;
      const limit = request.params.limit ? request.params.limit : 50;
      const offset = request.params.offset ? request.params.offset : 0;
      persistence.getModel('log').findAll({offset: offset, limit: limit, raw: true, where: {node: node}}).then(logs => {
        reply(logs);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
