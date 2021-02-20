module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {

        title: DataTypes.STRING,
        year: DataTypes.STRING,
        director: DataTypes.STRING,
        genre: DataTypes.STRING,
        description: DataTypes.STRING,
        rating: DataTypes.STRING,
        favorites: {type: DataTypes.BOOLEAN, defaultValue: false } // True = Favorite

    });

    
    //blog posts - assiocate movies with blog posts
    Movies.associate = (models) => {

        Movies.belongsTo(models.Billboard,{ 
          foreignKey: {
            allowNull: false,
          },
        });
      };

      //Favorites - joining movies to user page for displaying.
      Movies.associate = (models) => {

        Movies.belongsTo(models.User, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return Movies;
};