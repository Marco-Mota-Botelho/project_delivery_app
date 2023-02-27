module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false
    },
    delivery_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    delivery_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'sales'
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, { foreignKey: 'user_id', as: 'buyer' });
    Sales.belongsTo(models.Users, { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sales;
};
