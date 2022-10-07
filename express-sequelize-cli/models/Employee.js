module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: DataTypes.STRING,
      salary: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
      foreignKey: {
        name: "departmentId",
        //   ความสัมพันธ์เป็นแบบ mandatory เลยต้องห้ามเป็น Null
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    // Employee มีความสัมพันธ์กับ Order ด้วย
    Employee.hasMany(models.Order, {
      // ความสัมพันธ์เป็นแบบ Optional กัน เลยให้เป็น Null ได้
      foreignKey: "employeeId",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Employee;
};
