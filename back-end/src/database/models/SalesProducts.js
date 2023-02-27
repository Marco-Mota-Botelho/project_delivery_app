module.exports = function(sequelize, DataTypes) {
  const SalesProducts = sequelize.define('SalesProducts', {
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sales',
        key: 'id',
      },
      field: 'sale_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      },
      field: 'product_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'sales_products',
    timestamps: false
  });

  SalesProducts.associate = function({models}) {
    SalesProducts.belongsTo(models.Sales, {
      foreignKey: 'sale_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    SalesProducts.belongsTo(models.Products, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return SalesProducts;
};
