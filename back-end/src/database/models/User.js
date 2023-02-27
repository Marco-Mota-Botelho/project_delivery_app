'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoincrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  // users.associate = (models) => {
  //   users.hasMany(models.BlogPost, {
  //       as: 'BlogPosts',
  //       foreignKey: 'userId', 
  //   })
  // };
  return users;
};
