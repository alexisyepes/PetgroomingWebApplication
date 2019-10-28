module.exports = function(sequelize, DataTypes) {
	var Client = sequelize.define(
		"Client",
		{
			lastName: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1]
			},
			firstName: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1]
			},
			primaryPhoneNumber: {
				type: DataTypes.TEXT,
				allowNull: true,
				len: [1]
			},
			cellphone: {
				type: DataTypes.TEXT,
				allowNull: true,
				len: [1]
			},
			workPhone: {
				type: DataTypes.TEXT,
				allowNull: true,
				len: [1]
			},
			email: {
				type: DataTypes.TEXT,
				allowNull: true,
				len: [1]
			}
		},

		{
			timestamps: false
		}
	);

	Client.associate = function(models) {
		// Associating Clients with Pets
		// When a Client is deleted, also delete any associated Pets
		Client.hasMany(models.Pet, {
			onDelete: "cascade"
		});
	};

	return Client;
};
