"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Tuan",
        lastName: "Phan",
        email: "tuanktvn2001@gmail.com",
        password: "12345",
        address: "TP HCM",
        gender: "1",
        roleId: "Role",

        positionId: "P0",
        phoneNumber: "0123456789",
        image: "fghfg/hfdhq.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User", null, {});
  },
};
