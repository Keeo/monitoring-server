import { error } from 'winston';
import Joi from 'joi';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/node/{id}',
    config: {
      validate: {
        params: {
          id: Joi.number().integer()
        }
      }
    },
    handler(request, reply) {
      persistence.getNodeFromId(request.params.id).then(node => {
        reply(node);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
