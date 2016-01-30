import { error } from 'winston';
import Joi from 'joi';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, config: {validate: {params: {id: *}}}, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/users/{id}',
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
                email: Joi.string().email(),
                hash: Joi.string()
              }).label('user')
            }
          }
        }
      }
    },
    handler(request, reply) {
      persistence.getModel('user').findById(request.params.id).then(user => {
        reply({user: user.get({plain: true})});
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
