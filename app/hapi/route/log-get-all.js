import { error } from 'winston';
import Joi from 'joi';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/log/{node}/{limit?}',
    config: {
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

      persistence.getLogs(node, limit).then(logs => {
        reply(logs);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
