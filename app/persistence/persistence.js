import Sequelize from 'sequelize';
import SequelizeFixtures from 'sequelize-fixtures';
import merge from '../utils/merge';

import user from './model/user';
import node from './model/node';
import log from './model/log';

export class Persistence {

  constructor(generators, options = {}) {
    this.generators = generators;
    this.options = merge({
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'monitoring',
      port: '3306',
      dialect: 'mysql'
    }, options);
  }

  connect() {
    this.sequelize = new Sequelize(this.options.database, this.options.username, this.options.password, {
      host: this.options.host,
      port: this.options.port,
      dialect: this.options.dialect,
      define: {
        freezeTableName: true
      }
    });
  }

  loadModels() {
    if (this.models !== undefined) {
      throw 'Models cannot be redefined in runtime.';
    }
    this.models = {};
    this.models.User = user(this.sequelize);
    this.models.Node = node(this.sequelize, this.models.User);
    this.models.Log = log(this.sequelize, this.models.Node);
  }

  sync(force = false) {
    return this.sequelize.sync({force: force});
  }

  loadFixtures() {
    console.log(__dirname + "/../../fixtures/test-data.json");
    return SequelizeFixtures.loadFile(__dirname + '/../../fixtures/test-data.json', this.models);
  }
}
