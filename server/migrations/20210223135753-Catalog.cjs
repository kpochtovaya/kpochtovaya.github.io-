module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Catalog', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.STRING
      },
      link: {
        type: Sequelize.DataTypes.STRING
      },
      className: {
        type: Sequelize.DataTypes.STRING,
      },
      imgAlt: {
        type: Sequelize.DataTypes.STRING
      },
      imgTitle: {
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Catalog');
  }
};