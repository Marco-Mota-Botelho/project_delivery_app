module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id',
      },
      primaryKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'sales_products',
    timestamps: false,
    underscored: true,
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(
      models.Product, { 
        through: SaleProduct, 
        foreignKey: 'saleId', 
        otherKey: 'productId', 
        as: 'products' 
    });
    models.Product.belongsToMany(
      models.Sale, { 
        through: SaleProduct, 
        foreignKey: 'productId', 
        otherKey: 'saleId', 
        as: 'sales' 
    });
  };
  return SaleProduct;
}
