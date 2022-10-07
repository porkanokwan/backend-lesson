module.exports = (sequelize, DataTypes) => {
  const Suppiler = sequelize.define(
    "Supplier",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Suppiler.associate = (models) => {
    // พอมันเห็นความสัมพันธ์แบบนี้มันจะไปสร้าง col supplierId ใน Product ให้อัตโนมัติ
    Suppiler.hasMany(models.Product, {
      foreignKey: {
        name: "supplierId",
        // สามารถกำหนด constraint ของ col นี้ได้
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Suppiler;
};
