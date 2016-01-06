import { error } from 'winston';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/node/',
    handler(request, reply) {
      persistence.getNodes().then(nodes => {
        reply(nodes);
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
