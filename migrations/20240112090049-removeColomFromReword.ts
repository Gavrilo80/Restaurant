'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("rewards", "pizza")
    await queryInterface.removeColumn("rewards", "meal")
    await queryInterface.renameColumn("rewards", "drink", "reward")

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("rewards", "pizza", {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn("rewards", "meal", {
      type: Sequelize.STRING
    })
    await queryInterface.renameColumn("rewards", "reward", "drink")
  }
};
