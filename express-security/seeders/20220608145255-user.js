const bcrypt = require("bcryptjs");
("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "John Doe",
          email: "john@gmail.com",
          password: bcrypt.hashSync("123456", 12),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "Jacky",
          email: "jacky@gmail.com",
          password: bcrypt.hashSync("456789", 12),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "Bison",
          email: "bison@gmail.com",
          password: bcrypt.hashSync("qwerty", 12),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
