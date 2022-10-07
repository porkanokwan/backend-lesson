module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      discount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: { name: "orderId", allowNull: false },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: { name: "productId", allowNull: false },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return OrderItem;
};
