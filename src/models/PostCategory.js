module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true},

    }, {
        tableName: 'posts_categories',
        underscored: true,
        timestamps: false,

    });

    PostCategory.associate = ({ BlogPost, Category }) => {
      BlogPost.belongsToMany(Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      Category.belongsToMany(BlogPost, {
        as: 'blogPosts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
  
    return PostCategory;
  };
  
 