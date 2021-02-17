module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('login', {
        text: {
            username: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    len: [1, 15],

                },

            },

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
            }

        },
        complete: {
            type: DataTypes.BOOLEAN,
 
            defaultValue: false,
        },

    });
    return Login;
};