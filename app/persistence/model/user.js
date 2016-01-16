import Sequelize from 'sequelize';

/**
 * @param {Sequelize} sequelize
 * @returns {Model}
 */
export default function(sequelize) {
  return sequelize.define('user', {
    email: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR(128),
      allowNull: false
    },
    hash: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      unique: true
    }
  });
}
