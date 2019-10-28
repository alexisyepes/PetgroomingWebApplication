module.exports = function(sequelize, DataTypes) {
	var CalendarEmp1 = sequelize.define("CalendarEmp1", {
		title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		// allDay: {
		//     type: DataTypes.BOOLEAN,
		//     allowNull: false,
		//     len: [1]
		// },
		start: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		end: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		appointment: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		}
	});

	return CalendarEmp1;
};
