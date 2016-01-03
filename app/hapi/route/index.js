export default function(persistence) {
  return {
    method: 'GET',
    path: '/api',
    handler(request, reply) {
      persistence.createNode().then(createdNode => {
        persistence.getNodeFromHash(createdNode.hash).then(node => {
          reply({api: 'hello!', id: node.id});
        }, err => {
          reply({api: 'hello!', err: err});
        });
      });
    }
  };
}
