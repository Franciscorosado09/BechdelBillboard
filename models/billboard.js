module.exports = (sequelize, DataTypes) => {
  const Billboard = sequelize.define('Billboard', {
    title: {
      type: DataTypes.STRING,
      
      //not working - get error message
      allowNull: false,
      
      validate: {
        len: [1, 25],
      },
    },
    
    post: {
      type: DataTypes.STRING,
      
      //not working - get error message
      allowNull: false,
      
      validate: {
        len: [1, 500],
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    }

    //npm multer??
    // icon: {
    //   type: DataTypes.STRING,
      
    //   allowNull: false,
      
    //   validate: {
    //     len: [1, 200],
    //   },
    // },

    
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



  //posts linked to user in user.
  Billboard.associate = (models) => {
    Billboard.belongsTo(models.User, {
       foreignKey: "userId",
        allowNull: false,
    })
  }


  // // //links to movies - pulls in movies for posts
  // Billboard.associate = (models) => {
  //   Billboard.hasMany(models.Movies, {
  //     foreignKey: 'billboardMovie',
  //   allowNull: false
  //   })
  // }

 

  return Billboard;
};
