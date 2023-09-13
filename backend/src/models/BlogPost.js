module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
        userId: DataTypes.INTEGER, 


    }, {
        tableName: 'blog_posts',
        underscored: true,
        timestamps: false,

    });

    BlogPost.associate = ({ User }) => {
        BlogPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      };
  
    return BlogPost;
  };
  
 