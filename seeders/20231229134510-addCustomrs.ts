'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
module.exports = {
  async up(queryInterface, Sequelize) {
    const userPass = await bcrypt.hash('opasnaLozinka', 10);

    function generateRandomSevenDigitNumber() {
      return crypto.randomInt(1000000, 9999999);
    }

    let users = [];
    for (let index = 0; index < 125; index++) {
      users.push({
        username: `Customer${index + 1}`,
        password: userPass,
        email: `customer${index + 1}@test.com`,
        phone: generateRandomSevenDigitNumber(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('customers', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
