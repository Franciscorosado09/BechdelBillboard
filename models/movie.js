

module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {

        title: DataTypes.STRING,
        director: DataTypes.STRING,
        year: DataTypes.STRING,
        genre: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        favorites: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        //rating: DataTypes.STRING,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });

    

    
    // // //blog posts - assiocate movies with blog posts
    Movies.associate = (models) => {
      //switch to hasmany?
        Movies.belongsTo(models.Billboard,{ 
          foreignKey: {
            allowNull: false,
          },
        });
    }

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