module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }, {
        tableName: 'categories',
        underscored: true,
        timestamps: false,
    });

    Category.associate = ({ User }) => {
        Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      };
    return Category;
  };
  
 