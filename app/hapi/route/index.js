export default function() {
  return {
    method: 'GET',
    path: '/api/',
    handler(request, reply) {
      reply({api: 'hello!'});
    }
  };
}
