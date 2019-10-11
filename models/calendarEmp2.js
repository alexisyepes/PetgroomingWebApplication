module.exports = function(sequelize, DataTypes) {
	var CalendarEmp2 = sequelize.define("CalendarEmp2", {
		title: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1]
			}
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
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		}
	});

	return CalendarEmp2;
};
