module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define("Client", {
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      petName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      breed: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1]
      }
    });
  
    return Client;
  };
  