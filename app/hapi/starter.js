import server from './server';
import RSVP from 'rsvp';
import { info } from 'winston';

export default function(options) {
  return new RSVP.Promise(resolve => {
    let serverInstance = server(options);
    serverInstance.start(() => {
      info('Hapi server started.');
      return resolve(serverInstance);
    });
  });
}
