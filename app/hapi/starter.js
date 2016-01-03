import server from './server';
import RSVP from 'rsvp';
import { info } from 'winston';

export default function(persistence, options) {
  return new RSVP.Promise(resolve => {
    let serverInstance = server(persistence, options);
    serverInstance.start(() => {
      info('Hapi server started.');
      return resolve(serverInstance);
    });
  });
}
