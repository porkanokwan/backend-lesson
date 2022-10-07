module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      budget: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Department.associate = (models) => {
    Department.hasMany(models.Employee, {
      foreignKey: {
        name: "departmentId",
        //   ความสัมพันธ์เป็นแบบ mandatory เลยต้องห้ามเป็น Null
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Department;
};
