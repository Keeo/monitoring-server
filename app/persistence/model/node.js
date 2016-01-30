import Sequelize from 'sequelize';
import generators from '../../generator/generators';

/**
 * @param {Sequelize} sequelize
 * @param {Model} user
 * @returns {Model}
 */
export default function(sequelize, user) {
  return sequelize.define('node', {
    hash: {
      type: Sequelize.CHAR(128),
      unique: true,
      allowNull: false,
      defaultValue: () => generators.crypto.getToken()
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: () => generators.name.getName()
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: 'id'
      }
    }
  });
}
