module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    url_image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    tableName: 'products'
  });

  return Product;
};
