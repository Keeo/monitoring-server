import { info, error } from 'winston';
import Joi from 'joi';

/**
 * @param {Persistence} persistence
 * @returns {{method: string, path: string, handler: (function(*, *))}}
 */
export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/logs',
    config: {
      auth: 'node',
      tags: ['api'],
      validate: {
        payload: {
          log: Joi.object().keys({
            severity: Joi.string().required(),
            message: Joi.string().required(),
            context: Joi.string(),
            created: Joi.string()
          })
        }
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                severity: Joi.string().required(),
                message: Joi.string().required(),
                context: Joi.string(),
                created: Joi.string()
              }).label('log')
            }
          }
        }
      }
    },
    handler(request, reply) {
      let node = request.auth.credentials;
      let log = request.payload.log;
      info(`Saving log from node ${node.name} with message '${log.message.substring(0, 16)}'.`, log);
      persistence.getModel('log').create({
        node: node.id,
        severity: log.severity,
        message: log.message,
        context: log.context,
        clientCreatedAt: log.created
      }).then(log => {
        reply({log: log.get({plain: true})});
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
