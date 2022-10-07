module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      address: DataTypes.STRING, // เขียนแบบ shorthand กรณีที่มีแค่ type อันเดียว
    },
    {
      tableName: "customers",
      underscored: true,
    }
  );

  Customer.associate = (models) => {
    Customer.hasMany(models.Order, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Customer;
};

// module.exports = (sequelize, DataTypes) => {
//   const Customer = sequelize.define(
//     "Customer",
//     {
//       name: { type: DataTypes.STRING, allowNull: false },
//       address: DataTypes.STRING, // เขียนแบบ shorthand กรณีที่มีแค่ type อันเดียว
//       phoneNumber: DataTypes.STRING,
//     },
//     {
//       tableName: "cus",
//       timestamps: false,
//       underscored: true, // เป็นการเปลี่ยนจาก camelCase เป็น snack_case
//     }
//   );

//   return Customer;
// };
