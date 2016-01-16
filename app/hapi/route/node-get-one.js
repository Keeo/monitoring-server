import { error } from 'winston';
import Joi from 'joi';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {id: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/node/{id}',
    config: {
      auth: 'user',
      validate: {
        params: {
          id: Joi.number().integer()
        }
      }
    },
    handler(request, reply) {
      persistence.getModel('node').findById(request.params.id).then(node => {
        reply(node.get({plain: true}));
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
