import { error } from 'winston';
import Joi from 'joi';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {id: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/nodes/{id}',
    config: {
      auth: 'user',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer()
        }
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                name: Joi.string().required(),
                hash: Joi.string().required(),
                user: Joi.string().required()
              }).label('node')
            }
          }
        }
      }
    },
    handler(request, reply) {
      persistence.getModel('node').findById(request.params.id).then(node => {
        reply({node: node.get({plain: true})});
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
