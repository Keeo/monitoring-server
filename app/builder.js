import persistenceBuilder from './persistence/builder';
import hapiBuilder from './hapi/builder';
import { info, error } from 'winston';

/**
 * @param {*} options
 * @returns {Promise.<Server>}
 */
export default function builder(options) {
  process.on('unhandledRejection', reason => {
    error('Possibly unhandled rejection reason:\n', reason);
    error(reason.stack);
    process.exit(1);
  });

  info('==========================================================================');
  info(`Server starting at ${new Date()}`);
  return persistenceBuilder(options.persistence).then(persistence => {
    return hapiBuilder(persistence, options.hapi).then(server => {
      info(`Server started at ${new Date()}`);
      return server;
    });
  });
}
