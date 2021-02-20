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

    complete: {
      type: DataTypes.BOOLEAN,

      defaultValue: false,
    },
  });
  return Billboard;
};
