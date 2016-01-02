import persistenceStarter from './persistence/starter';
import hapiStarter from './hapi/starter';
import { info } from 'winston';

export default function starter(options) {
  info('==========================================================================');
  info(`Server starting at ${new Date()}`);
  return persistenceStarter(options.mysql).then(persistence => {
    return hapiStarter(persistence, options.hapi).then(() => {
      info(`Server started at ${new Date()}`);
    });
  });
}
