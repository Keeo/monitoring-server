import { error } from 'winston';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/node/',
    config: {
      auth: 'user'
    },
    handler(request, reply) {
      persistence.getModel('node').findAll({raw: true}).then(nodes => {
        reply(nodes);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
