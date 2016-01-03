export default function(persistence) {
  return {
    method: 'GET',
    path: '/api/',
    handler(request, reply) {
      reply({api: 'hello!'});
    }
  };
}
