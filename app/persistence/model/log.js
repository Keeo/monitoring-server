import Sequelize from 'sequelize';

export default function(sequelize, node) {
  return sequelize.define('log', {
    severity: {
      type: Sequelize.CHAR(6),
      allowNull: false,
      defaultValue: 'info'
    },
    message: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    context: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    clientCreatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    },
    node: {
      type: Sequelize.INTEGER,
      references: {
        model: node,
        key: 'id'
      }
    }
  });
}
