import Sequelize from 'sequelize';
import S from 'string';
import SequelizeFixtures from 'sequelize-fixtures';
import merge from '../utils/merge';

import user from './model/user';
import node from './model/node';
import log from './model/log';

export default class Persistence {

  /**
   * @param options
   */
  constructor(options = {}) {
    this.options = merge({
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'monitoring',
      port: '3306',
      dialect: 'mysql',
      storage: undefined,
      logging: true
    }, options);
  }

  /**
   * Creates and configures Sequelize.
   */
  connect() {
    this.sequelize = new Sequelize(this.options.database, this.options.username, this.options.password, {
      host: this.options.host,
      port: this.options.port,
      dialect: this.options.dialect,
      storage: this.options.storage,
      logging: this.options.logging,
      define: {
        freezeTableName: true
      }
    });
  }

  /**
   * Closes connection and catches error.
   */
  close() {
    try {
      this.sequelize.close();
    } catch (err) {
      err(err);
    }
  }

  /**
   * Load models
   */
  loadModels() {
    if (this.models !== undefined) {
      throw 'Models cannot be redefined in runtime.';
    }
    this.models = {};
    this.models.User = user(this.sequelize);
    this.models.Node = node(this.sequelize, this.models.User);
    this.models.Log = log(this.sequelize, this.models.Node);
  }

  /**
   * Test connection by doing 'SELECT 1+1'
   * @returns {Promise}
   */
  testConnection() {
    return this.sequelize.authenticate();
  }

  /**
   * Synchronizes database with models.
   * @param {boolean} force true for override database
   * @returns {Promise}
   */
  sync(force = false) {
    return this.sequelize.sync({force: force});
  }

  /**
   * Loads fixtures into database.
   * @returns {Promise}
   */
  loadFixtures() {
    let options = {
      log: () => {
      }
    };
    return SequelizeFixtures.loadFile(__dirname + '/../../fixtures/test-data.json', this.models, options);
  }

  /**
   * Returns model or throws error if model was not found.
   * @param name
   * @returns {Model}
   */
  getModel(name) {
    let capitalizedName = S(name).capitalize().s;
    let model = this.models[capitalizedName];
    if (model) {
      return model;
    } else {
      throw `Model ${capitalizedName} not found.`;
    }
  }
}
