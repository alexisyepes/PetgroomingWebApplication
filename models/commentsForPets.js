module.exports = function(sequelize, DataTypes) {
	var Comment = sequelize.define(
		"Comment",
		{
			date: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			timestamps: false
		}
	);

	Comment.associate = function(models) {
		Comment.belongsTo(models.Pet);
		onDelete = "CASCADE";
	};

	// Comment.associate = function(models) {
	// 	Comment.belongsTo(models.Client);
	// };

	return Comment;
};
