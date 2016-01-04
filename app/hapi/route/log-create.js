import { info, error } from 'winston';

export default function(persistence) {
  return {
    method: 'POST',
    path: '/api/log/',
    /*config: {
      auth: 'node'
    },*/
    handler(request, reply) {
      // faked node
      let node = request.auth.credentials;
      node = {name: 'karel', id: 1};
      let log = request.payload.log;
      info(`Saving log from node ${node.name} with message '${log.message.substring(0, 16)}'.`, log);
      persistence.saveLog(node.id, log.severity, log.message, log.context, log.created).then(() => {
        reply();
      }, err => {
        error(err);
        reply(err);
      });
    }
  };
}
