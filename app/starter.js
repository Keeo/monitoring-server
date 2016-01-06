import persistenceStarter from './persistence/starter';
import hapiStarter from './hapi/starter';
import { info, error } from 'winston';

export default function starter(options) {
  process.on('unhandledRejection', reason => {
    error('Possibly unhandled rejection reason:\n', reason);
    error(reason.stack);
    process.exit(1);
  });

  info('==========================================================================');
  info(`Server starting at ${new Date()}`);
  return persistenceStarter(options.mysql).then(persistence => {
    return hapiStarter(persistence, options.hapi).then(() => {
      info(`Server started at ${new Date()}`);
    });
  });
}
