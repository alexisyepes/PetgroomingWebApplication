module.exports = function(sequelize, DataTypes) {
	var Pet = sequelize.define(
		"Pet",
		{
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1]
			},
			breed: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1]
			},
			type: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			timestamps: false
		}
	);

	Pet.associate = function(models) {
		Pet.belongsTo(models.Client);
		Pet.hasMany(models.Comment, {
			onDelete: "cascade"
		});
	};

	return Pet;
};
