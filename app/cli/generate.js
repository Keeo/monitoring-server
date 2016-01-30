import { info, error } from 'winston';
import generator from '../generator/generators';
import persistence from './persistence';
import faker from 'faker';

export default class Generator {
  generate(argv) {
    const task = argv._[0];
    switch (task) {
      case 'user':
        this._generateUser(argv.user, argv.password);
        break;
      case 'logs':
        this._generateLogs(argv.node, argv.count);
        break;
      default:
        error(`Unknown task: ${task}`);
    }
  }

  _generateLogs(node, count = 100) {
    if (!Number.isInteger(node)) {
      throw `--node must be id of node, got: ${node}.`;
    }
    const severities = ['info', 'debug', 'warn', 'error'];
    persistence().then(persistence => {
      const logModel = persistence.getModel('log');
      const promises = [];
      for (let i = 0; i < count; ++i) {
        promises.push(logModel.create({
          node: node,
          severity: severities[Math.floor(Math.random() * severities.length)],
          message: faker.hacker.phrase(),
          context: faker.lorem.sentences(),
          clientCreatedAt: faker.date.recent()
        }));
      }
      Promise.all(promises).then(() => {
        info(`Generated ${count} logs for node ${node}.`);
      });
    });
  }

  _generateUser(email, password) {
    const salt = generator.crypto.getSalt();
    const hash = generator.crypto.getHash(password, salt);
    persistence().then(persistence => {
      persistence.getModel('user').getModel('user').create({
        email: email,
        salt: salt,
        password: hash
      }).then(user => {
        info(`New user generated with email: ${user.email}.`);
      }, err => {
        error(err);
      });
    });
  }
}
