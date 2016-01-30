import { error } from 'winston';
import Joi from 'joi';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/nodes',
    config: {
      auth: 'user',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                nodes: Joi.array().items(
                  Joi.object({
                    name: Joi.string().required(),
                    hash: Joi.string().required(),
                    user: Joi.string().required()
                  })
                )
              }).label('Result')
            }
          }
        }
      }
    },
    handler(request, reply) {
      persistence.getModel('node').findAll({raw: true}).then(nodes => {
        reply({nodes: nodes});
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
