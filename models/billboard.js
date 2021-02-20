module.exports = (sequelize, DataTypes) => {
  const Billboard = sequelize.define('Billboard', {
    text: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 500],
      },
    },

    //npm multer??
    icon: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 200],
      },
    },

    //associate to Author - login table

    //asssociate to Rating - movie table

    // report: {
    //   type: DataTypes.STRING,
      
    //   allowNull: false,
      
    //   validate: {
    //     len: [1, 500],

    //   },
    // },

    // complete: {
    //   type: DataTypes.BOOLEAN,

    //   defaultValue: false,
    // },
  });

  //posts linked to author in login.
  Billboard.associate = (models) => {
    Billboard.belongsTo(models.User, {
      onDelete: 'cascade',
    })
  }

  //links to movies - pulls in movies for posts
  Billboard.associate = (models) => {
    Billboard.hasMany(models.Movies, {
      onDelete: 'cascade',
    })
  }

  return Billboard;
};
