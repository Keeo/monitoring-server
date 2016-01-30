import { error } from 'winston';
import generators from '../../generator/generators';

export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/nodes',
    config: {
      auth: 'user'
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
