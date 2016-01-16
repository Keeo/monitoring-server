import Sequelize from 'sequelize';

export default function(sequelize, user) {
  return sequelize.define('node', {
    hash: {
      type: Sequelize.CHAR(128),
      unique: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: null
    },
    user: {
      type: Sequelize.INTEGER,
      references: {
        model: user,
        key: 'id'
      }
    }
  });
}
