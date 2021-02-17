module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {

        title: DataTypes.STRING,
        year: DataTypes.STRING,
        director: DataTypes.STRING,
        genre: DataTypes.STRING,
        description: DataTypes.STRING,

    });
    return Movies;
};