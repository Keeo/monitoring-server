import { error, info } from 'winston';

export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/node/',
    handler(request, reply) {
      persistence.createNode().then(createdNode => {
        reply(createdNode);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
