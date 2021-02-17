module.exports = (sequelize, DataTypes) => {
  const Billboard = sequelize.define('Billboard', {
    text: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 500],
      },
    },
    icon: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 200],
      },
    },
    report: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 500],

      },
    },

    complete: {
      type: DataTypes.BOOLEAN,

      defaultValue: false,
    },
  });
  return Billboard;
};
