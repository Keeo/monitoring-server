export default function(persistence) {
  let route = {
    method: 'GET',
    path: '/api',
    handler(request, reply) {
      reply({api: 'hello!'});
    }
  };
  return route;
}
