export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/server/',
    handler(request, reply) {
      persistence.getNodeFromKey('b').then(node => {
        reply({api: 'hello!', id: node.id});
      }, err => {
        reply({api: 'hello!', err: err});
      });
    }
  };
}
