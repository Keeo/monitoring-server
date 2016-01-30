import { info, error } from 'winston';
import generator from '../generator/generators';
import persistence from './persistence';

export default class Generator {
  generate(argv) {
    const task = argv._[0];
    switch (task) {
      case 'user':
        this._generateUser(argv.user, argv.password);
        break;
      default:
        error(`Unknown task: ${task}`);
    }
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
