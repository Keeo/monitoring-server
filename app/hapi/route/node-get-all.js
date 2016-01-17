import { error } from 'winston';

export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/nodes',
    config: {
      auth: 'user'
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
