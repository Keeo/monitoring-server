import { error } from 'winston';
import generators from '../../generator/generators';
import Joi from 'joi';

export default function(persistence) {
  return {
    method: 'POST',
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
      const nodeModel = persistence.getModel('node');
      nodeModel.findAll({raw: true, attributes: ['name']}).then(takenNames => {
        nodeModel.create({
          user: request.auth.credentials.id,
          name: generators.name.getName(takenNames.map(n => n.name))
        }).then(node => {
          reply({node: node.get({plain: true})});
        }, err => {
          error(err);
          reply(err);
        });
      });
    }
  };
}
