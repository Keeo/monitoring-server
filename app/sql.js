import { info, error } from 'winston';
import { Persistence } from './persistence/persistence';

let persistence = new Persistence();
persistence.connect();
persistence.loadModels();
persistence.sync(true).then(() => {
  persistence.loadFixtures().then(() => {
    persistence.getModel('log').create({
      node: 1,
      severity: 'info',
      message: 'messssss'
    }).then(() => {
      info("yey");
    }, err => {
      error(err);
    });
  });
});

