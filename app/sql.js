import { Persistence } from './persistence/persistence';
let persistence = new Persistence();
persistence.connect();
persistence.loadModels();
persistence.sync(true).then(() => {
  persistence.loadFixtures().then(() => {
    console.log("fixtures loaded");
  });
});

