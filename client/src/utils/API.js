import axios from "axios";

export default {
	getUser: id => {
		return axios.get("/auth/signup/" + id);
	},
	addUser: newUser => {
		return axios.post("/auth/signup", newUser);
	},
	logginUser: newUser => {
		return axios.post("/auth/signup", newUser);
	},

	addEmployee: newEmployee => {
		return axios.post("/auth/employees/signup", newEmployee);
	},
	getEmployees: () => {
		return axios.get("/auth/employees");
	},
	getEmployee: id => {
		return axios.get("/auth/employees/" + id);
	},
	updateEmployee: (id, data) => {
		return axios.put("/auth/employees/" + id, data);
	},
	deleteEmployee: id => {
		return axios.delete("/auth/employees/" + id);
	},
	getClients: async () => {
		return await axios.get("/api/clients");
	},

	addClient: newClient => {
		return axios.post("/api/clients", newClient);
	},

	getClient: id => {
		return axios.get("/auth/api/clients/" + id);
	},

	getClientByLastName: lastName => {
		return axios.get("/api/clients/lastName/" + lastName);
	},

	getClientByFirstName: firstName => {
		return axios.get("/api/clients/firstName/" + firstName);
	},

	getClientByPhone: phone => {
		return axios.get("/api/clients/primaryPhoneNumber/" + phone);
	},

	updateClient: (id, data) => {
		return axios.put("/api/clients/" + id, data);
	},

	deleteClient: id => {
		return axios.delete("/api/clients/" + id);
	},

	//************Calendars**************************************

	//Admin's********************************
	addAppointmentAdmin: newAppointment => {
		return axios.post("/schedule/calendar_admin", newAppointment);
	},

	getAppointmentsAdmin: () => {
		return axios.get("/schedule/calendar_admin");
	},

	getAppointmentAdmin: id => {
		return axios.get("/schedule/calendar_admin/" + id);
	},

	updateAppointmentAdmin: (id, data) => {
		return axios.put("/schedule/calendar_admin/" + id, data);
	},

	deleteCalendarAdminEvent: id => {
		return axios.delete("/schedule/calendar_admin/" + id);
	},
	//Admin's*********************************

	//Emp1's************
	addAppointmentEmp1: newAppointment => {
		return axios.post("/schedule/calendar_emp1", newAppointment);
	},

	getAppointmentsEmp1: () => {
		return axios.get("/schedule/calendar_emp1");
	},

	getAppointmentEmp1: id => {
		return axios.get("/schedule/calendar_emp1/" + id);
	},

	updateAppointmentEmp1: (id, data) => {
		return axios.put("/schedule/calendar_emp1/" + id, data);
	},

	deleteCalendarEmp1Event: id => {
		return axios.delete("/schedule/calendar_emp1/" + id);
	},
	//Emp1's************

	//Emp2's************
	addAppointmentEmp2: newAppointment => {
		return axios.post("/schedule/calendar_emp2", newAppointment);
	},

	getAppointmentsEmp2: () => {
		return axios.get("/schedule/calendar_emp2");
	},

	getAppointmentEmp2: id => {
		return axios.get("/schedule/calendar_emp2/" + id);
	},

	updateAppointmentEmp2: (id, data) => {
		return axios.put("/schedule/calendar_emp2/" + id, data);
	},

	deleteCalendarEmp2Event: id => {
		return axios.delete("/schedule/calendar_emp2/" + id);
	},

	//Pets
	addPet: (ClientId, newPet) => {
		return axios.post("/api/pets/" + ClientId, newPet);
	},
	updatePet: (id, data) => {
		return axios.put("/api/pets/" + id, data);
	},

	getPets: async () => {
		return await axios.get("/api/pets");
	},

	getPet: id => {
		return axios.get("/auth/api/pets/" + id);
	},

	getPetByName: name => {
		return axios.get("/api/pets/name/" + name);
	},

	deletePet: id => {
		return axios.delete("/api/pets/" + id);
	},

	//Comments
	getOneComment: id => {
		return axios.get("/api/comments/" + id);
	},

	addComment: (PetId, newComment) => {
		return axios.post("/api/comments/" + PetId, newComment);
	},

	deleteComment: id => {
		return axios.delete("/api/comments/" + id);
	},

	updateComment: (id, data) => {
		return axios.put("/api/comments/" + id, data);
	}
};
