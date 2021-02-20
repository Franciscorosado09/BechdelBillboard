const bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false,

    //     validate: {
    //         len: [1, 15],

    //     },

    // },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });

  //Links blog posts to author (can have many posts)
  User.associate = (models) => {
    User.hasMany(models.Billboard, {
      onDelete: 'cascade',
    })
  }

  User.associate = (models) => {
    User.hasMany(models.Movies, {
      onDelete: 'cascade',
    })
  }

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};

