const billboard = require("./billboard");

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

    Movies.associate = (models) => {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Movies.belongsToMany(models.Billboard,{ 
          foreignKey: {
            allowNull: false,
          },
        });
      };


      Movies.associate = (models) => {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Movies.belongsTo(models.Login, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return Movies;
};