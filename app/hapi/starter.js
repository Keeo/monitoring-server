import server from './server';
import { info } from 'winston';

export default function(persistence, options) {
  return server(persistence, options).then(serverInstance => {
    serverInstance.start(() => {
      info('Hapi server started.');
      return serverInstance;
    });
  }).catch(err => {
    console.log(err);
  });
}
