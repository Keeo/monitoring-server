import { error } from 'winston';

export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/node/',
    config: {
      auth: 'admin'
    },
    handler(request, reply) {
      persistence.createNode(request.auth.credentials).then(createdNode => {
        reply(createdNode);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
