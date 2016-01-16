import { error } from 'winston';

export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/node/',
    config: {
      auth: 'user'
    },
    handler(request, reply) {
      persistence.getModel('node').create({
        user: request.auth.credentials.id
      }).then(node => {
        reply(node.get({plain: true}));
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
