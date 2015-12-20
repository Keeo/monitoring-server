export default {
  method: 'GET',
  path: '/api',
  handler(request, reply) {
    reply({api: 'hello!'});
  }
};
