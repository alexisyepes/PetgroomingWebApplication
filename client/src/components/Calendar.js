// import React, { Component } from "react";
import React from "react";
import API from "../utils/API";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input
} from "reactstrap";

let options = [
	{
		value: "app",
		label: "Book an Appointment"
	},
	{
		value: "schedule",
		label: "Modify your working Schedule"
	}
];

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class MainCalendar extends React.Component {
	constructor(props) {
		super(props);

		//Replaced by arrow functions :)
		// this.onSubmit = this.onSubmitModal.bind(this);
		// this.onSubmit = this.onSubmitModalToEdit.bind(this);
		// this.onChange = this.onChangeModal.bind(this);

		this.state = {
			modal: false,
			modalEmp1: false,
			modalEmp2: false,
			modalToEditEvent: false,
			modalToEditEventEmp1: false,
			modalToEditEventEmp2: false,
			slotEvent: "",
			slotEventEmp1: "",
			slotEventEmp2: "",
			title: "",
			appointment: "",
			appointmentEmp1: "",
			appointmentEmp2: "",
			appointmentEdit: "",
			appointmentEditEmp1: "",
			appointmentEditEmp2: "",
			editTitle: "",
			editTitleEmp1: "",
			editTitleEmp2: "",
			editStart: "",
			editStartEmp1: "",
			editStartEmp2: "",
			editEnd: "",
			editEndEmp1: "",
			editEndEmp2: "",
			eventToEdit: "",
			eventToEditEmp1: "",
			eventToEditEmp2: "",
			cal_eventsAdmin: [
				//State is updated via componentDidMount
			],
			cal_eventsEmp1: [
				//State is updated via componentDidMount
			],
			cal_eventsEmp2: [
				//State is updated via componentDidMount
			]
		};
	}

	componentDidMount() {
		axios
			.get("/schedule/calendar_admin")
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsAdmin: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get("/schedule/calendar_emp1")
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsEmp1: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get("/schedule/calendar_emp2")
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsEmp2: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	// Modal Functions ************************************

	//Toggle for modal form to add Appointments to calendar
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	toggleEmp1 = () => {
		this.setState({
			modalEmp1: !this.state.modalEmp1
		});
	};

	toggleEmp2 = () => {
		this.setState({
			modalEmp2: !this.state.modalEmp2
		});
	};

	//Toggle to edit appointments on calendar
	toggleToEdit = () => {
		this.setState({
			modalToEditEvent: !this.state.modalToEditEvent
		});
	};

	//Toggle to edit appointments on calendar Emp1
	toggleToEditEmp1 = () => {
		this.setState({
			modalToEditEventEmp1: !this.state.modalToEditEventEmp1
		});
	};

	//Toggle to edit appointments on calendar Emp2
	toggleToEditEmp2 = () => {
		this.setState({
			modalToEditEventEmp2: !this.state.modalToEditEventEmp2
		});
	};

	//onChange for modal forms
	onChangeModal = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	//onChange for <Select /> on modal form
	onSelectedChanged = value => {
		this.setState({
			appointment: value
		});
		// console.log(`Option selected:`, value);
	};

	//Submit for adding appointments to calendar (Admin)
	onSubmitModal = e => {
		e.preventDefault();
		// console.log(this.state.appointment);
		let obj = {
			title: this.state.title,
			start: this.state.slotEvent.start,
			end: this.state.slotEvent.end,
			appointment: this.state.appointment.value
		};
		// console.log(obj);

		API.addAppointmentAdmin(obj)

			// .then(data => console.log(data))
			.then(
				this.setState({
					slotEvent: "",
					title: "",
					appointment: "",
					modal: false
				})
			)
			.then(() => this.getAppointmentsCalendarAdmin())
			.catch(error => console.log(error));

		this.state.cal_eventsAdmin.push(obj);
	};

	//Submit for adding appointments to calendar (Emp1)
	onSubmitModalEmp1 = e => {
		e.preventDefault();
		// console.log(this.state.appointment);
		let obj = {
			title: this.state.title,
			start: this.state.slotEventEmp1.start,
			end: this.state.slotEventEmp1.end,
			appointment: this.state.appointment.value
		};
		console.log(obj);

		API.addAppointmentEmp1(obj)

			// .then(data => console.log(data))
			.then(
				this.setState({
					slotEventEmp1: "",
					title: "",
					appointment: "",
					modalEmp1: false
				})
			)
			.then(() => this.getAppointmentsCalendarEmp1())
			.catch(error => console.log(error));

		this.state.cal_eventsEmp1.push(obj);
	};

	//Submit for adding appointments to calendar (Emp2)
	onSubmitModalEmp2 = e => {
		e.preventDefault();
		// console.log(this.state.appointment);
		let obj = {
			title: this.state.title,
			start: this.state.slotEventEmp2.start,
			end: this.state.slotEventEmp2.end,
			appointment: this.state.appointment.value
		};
		console.log(obj);

		API.addAppointmentEmp2(obj)

			// .then(data => console.log(data))
			.then(
				this.setState({
					slotEventEmp2: "",
					title: "",
					appointment: "",
					modalEmp2: false
				})
			)
			.then(() => this.getAppointmentsCalendarEmp2())
			.catch(error => console.log(error));

		this.state.cal_eventsEmp2.push(obj);
	};

	onSubmitModalToEdit = e => {
		e.preventDefault();

		// console.log(this.state.eventToEdit);

		let obj = {
			id: this.state.eventToEdit.id,
			title: this.state.editTitle.toLowerCase(),
			start: this.state.editStart.toLowerCase(),
			end: this.state.editEnd.toLowerCase(),
			appointment: this.state.appointmentEdit.toLowerCase()
		};

		let id = this.state.eventToEdit.id;

		API.updateAppointmentAdmin(id, obj)

			.then(res => console.log(res))
			.catch(error => console.log(error));

		window.location.href = "/auth/employees_profile";
		// this.props.history.push("/auth/employees_profile");
	};

	onSubmitModalToEditEmp1 = e => {
		e.preventDefault();

		// console.log(this.state.eventToEdit);

		let obj = {
			id: this.state.eventToEditEmp1.id,
			title: this.state.editTitleEmp1.toLowerCase(),
			start: this.state.editStartEmp1.toLowerCase(),
			end: this.state.editEndEmp1.toLowerCase(),
			appointment: this.state.appointmentEditEmp1.toLowerCase()
		};
		console.log(this.state.eventToEditEmp1.id);

		let id = this.state.eventToEditEmp1.id;

		API.updateAppointmentEmp1(id, obj)

			.then(res => console.log(res))
			.catch(error => console.log(error));

		window.location.href = "/auth/employees_profile";
		// this.props.history.push("/auth/employees_profile");
	};

	onSubmitModalToEditEmp2 = e => {
		e.preventDefault();

		// console.log(this.state.eventToEdit);

		let obj = {
			id: this.state.eventToEditEmp2.id,
			title: this.state.editTitleEmp2.toLowerCase(),
			start: this.state.editStartEmp2.toLowerCase(),
			end: this.state.editEndEmp2.toLowerCase(),
			appointment: this.state.appointmentEditEmp2.toLowerCase()
		};
		console.log(this.state.eventToEditEmp2.id);

		let id = this.state.eventToEditEmp2.id;

		API.updateAppointmentEmp2(id, obj)

			.then(res => console.log(res))
			.catch(error => console.log(error));

		window.location.href = "/auth/employees_profile";
		// this.props.history.push("/auth/employees_profile");
	};

	handleDeleteEvent = id => {
		if (
			window.confirm(`Are you sure you wish to delete this Event permanently?`)
		) {
			API.deleteCalendarAdminEvent(id)
				.then
				// alert(
				// 	"Event with Id number: " + id + " has been successfully deleted!"
				// )
				()
				.then(res => this.getAppointmentsCalendarAdmin())
				.catch(err => console.log(err));
			window.location.href = "/auth/employees_profile";
			// this.props.history.push("/auth/employees_profile");
		}
	};

	handleDeleteEventEmp1 = id => {
		if (
			window.confirm(`Are you sure you wish to delete this Event permanently?`)
		) {
			API.deleteCalendarEmp1Event(id)
				.then
				// alert(
				// 	"Event with Id number: " + id + " has been successfully deleted!"
				// )
				()
				.then(res => this.getAppointmentsCalendarEmp1())
				.catch(err => console.log(err));
			window.location.href = "/auth/employees_profile";
			// this.props.history.push("/auth/employees_profile");
		}
	};

	handleDeleteEventEmp2 = id => {
		if (
			window.confirm(`Are you sure you wish to delete this Event permanently?`)
		) {
			API.deleteCalendarEmp2Event(id)
				.then(res => this.getAppointmentsCalendarEmp2())
				.catch(err => console.log(err));
			window.location.href = "/auth/employees_profile";
			// this.props.history.push("/auth/employees_profile");
		}
	};

	//Slot event on Calendar opens modal
	handleSelect = slot => {
		let slotEvent = {
			start: this.convertDate(slot.start),
			end: this.convertDate(slot.end)
		};

		this.setState({
			slotEvent
		});
		this.toggle();
	};

	//Slot event on Calendar opens modal Emp1
	handleSelectEmp1 = slot => {
		let slotEventEmp1 = {
			start: this.convertDate(slot.start),
			end: this.convertDate(slot.end)
		};

		this.setState({
			slotEventEmp1
		});
		console.log(this.state.slotEventEmp1);
		this.toggleEmp1();
	};

	//Slot event on Calendar opens modal Emp2
	handleSelectEmp2 = slot => {
		let slotEventEmp2 = {
			start: this.convertDate(slot.start),
			end: this.convertDate(slot.end)
		};

		this.setState({
			slotEventEmp2
		});
		console.log(this.state.slotEventEmp2);
		this.toggleEmp2();
	};

	// Modal Functions End **************************************

	convertDate = date => {
		return moment.utc(date).toDate();
	};

	getAppointmentsCalendarAdmin = () => {
		API.getAppointmentsAdmin()
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsAdmin: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	getAppointmentsCalendarEmp1 = () => {
		API.getAppointmentsEmp1()
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsEmp1: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	getAppointmentsCalendarEmp2 = () => {
		API.getAppointmentsEmp2()
			.then(response => {
				// console.log(response.data);
				let appointments = response.data;

				for (let i = 0; i < appointments.length; i++) {
					appointments[i].start = this.convertDate(appointments[i].start);
					appointments[i].end = this.convertDate(appointments[i].end);
				}
				this.setState({
					cal_eventsEmp2: appointments
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	//Opens up modal with event info to update
	handleEventGetter = event => {
		let id = event.id;
		this.toggleToEdit();
		API.getAppointmentAdmin(id)
			.then(res => {
				this.setState({
					eventToEdit: res.data,
					appointmentEdit: res.data.appointment,
					editTitle: res.data.title,
					editStart: res.data.start,
					editEnd: res.data.end
				});
			})
			.then(
				this.setState({
					eventToEdit: "",
					appointmentEdit: "",
					editTitle: "",
					editStart: "",
					editEnd: ""
				})
			)
			.catch(error => console.log(error));
	};

	//Opens up modal with event info to update Emp1
	handleEventGetterEmp1 = event => {
		let id = event.id;
		this.toggleToEditEmp1();
		API.getAppointmentEmp1(id)
			.then(res => {
				console.log(res);
				this.setState({
					eventToEditEmp1: res.data,
					appointmentEditEmp1: res.data.appointment,
					editTitleEmp1: res.data.title,
					editStartEmp1: res.data.start,
					editEndEmp1: res.data.end
				});
			})
			.then(
				this.setState({
					eventToEditEmp1: "",
					appointmentEditEmp1: "",
					editTitleEmp1: "",
					editStartEmp1: "",
					editEndEmp1: ""
				})
			)
			.catch(error => console.log(error));
	};

	//Opens up modal with event info to update Emp1
	handleEventGetterEmp2 = event => {
		let id = event.id;
		this.toggleToEditEmp2();
		API.getAppointmentEmp2(id)
			.then(res => {
				console.log(res);
				this.setState({
					eventToEditEmp2: res.data,
					appointmentEditEmp2: res.data.appointment,
					editTitleEmp2: res.data.title,
					editStartEmp2: res.data.start,
					editEndEmp2: res.data.end
				});
			})
			.then(
				this.setState({
					eventToEditEmp2: "",
					appointmentEditEmp2: "",
					editTitleEmp2: "",
					editStartEmp2: "",
					editEndEmp2: ""
				})
			)
			.catch(error => console.log(error));
	};

	//Function to define styling on Calendar's Admin's events
	eventStyleGetter = (event, start, end, isSelected) => {
		// console.log(event);

		// var backgroundColor = "#" + event.hexColor;
		var style = {
			backgroundColor: "#0056b3",
			borderRadius: "5px",
			opacity: 0.8,
			fontSize: "16px",
			color: "white",
			border: "1px solid blue",
			display: "block",
			paddingLeft: "12px",
			paddingRight: "12px"
		};
		if (event.appointment !== "app") {
			style.backgroundColor = "red";
			style.color = "white";
		}
		return {
			style
		};
	};

	//Function to define styling on Calendar's Emp1's events
	eventStyleGetterEmp1 = (event, start, end, isSelected) => {
		// console.log(event);

		// var backgroundColor = "#" + event.hexColor;
		var style = {
			backgroundColor: "#0056b3",
			borderRadius: "5px",
			opacity: 0.8,
			color: "white",
			border: "1px solid blue",
			display: "block",
			paddingLeft: "12px",
			paddingRight: "12px"
		};
		if (event.appointment !== "app") {
			style.backgroundColor = "red";
			style.color = "white";
		}
		return {
			style
		};
	};

	//Function to define styling on Calendar's Emp1's events
	eventStyleGetterEmp2 = (event, start, end, isSelected) => {
		// console.log(event);

		// var backgroundColor = "#" + event.hexColor;
		var style = {
			backgroundColor: "#0056b3",
			borderRadius: "5px",
			opacity: 0.8,
			color: "white",
			border: "1px solid blue",
			display: "block",
			paddingLeft: "12px",
			paddingRight: "12px"
		};
		if (event.appointment !== "app") {
			style.backgroundColor = "red";
			style.color = "white";
		}
		return {
			style
		};
	};

	render() {
		const { cal_eventsAdmin } = this.state;
		const { cal_eventsEmp1 } = this.state;
		const { cal_eventsEmp2 } = this.state;
		const appointment = this.state.appointment;

		let components = {};

		return (
			<div className="container">
				<div className="row">
					{/* Modal To add Event to Admin Calendar */}
					<div>
						<Modal isOpen={this.state.modal} toggle={this.toggle}>
							<ModalHeader toggle={this.handleSelect}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModal}>
									<FormGroup>
										<Select
											name="form-field-name"
											value={appointment}
											options={options}
											placeholder="Select one of the following:"
											isSearchable={false}
											onChange={this.onSelectedChanged}
										/>
										<Input
											type="text"
											name="title"
											id="title"
											value={this.state.title}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="start"
											defaultValue={this.state.slotEvent.start}
											id="start"
											placeholder="Start Time"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="end"
											defaultValue={this.state.slotEvent.end}
											id="end"
											placeholder="End Time"
											onChange={this.onChangeModal}
										/>

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to add event to calendar ends here */}

					{/* Modal To add Event to Emp1 Calendar */}
					<div>
						<Modal isOpen={this.state.modalEmp1} toggle={this.toggleEmp1}>
							<ModalHeader toggle={this.handleSelectEmp1}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModalEmp1}>
									<FormGroup>
										<Select
											name="form-field-name"
											value={appointment}
											options={options}
											placeholder="Select one of the following:"
											isSearchable={false}
											onChange={this.onSelectedChanged}
										/>
										<Input
											type="text"
											name="title"
											id="title"
											value={this.state.title}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="start"
											defaultValue={this.state.slotEventEmp1.start}
											id="startEmp1"
											placeholder="Start Time"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="end"
											defaultValue={this.state.slotEventEmp1.end}
											id="end"
											placeholder="End Time"
											onChange={this.onChangeModal}
										/>

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to add event to calendar ends here */}

					{/* Modal To add Event to Emp2 Calendar */}
					<div>
						<Modal isOpen={this.state.modalEmp2} toggle={this.toggleEmp2}>
							<ModalHeader toggle={this.handleSelectEmp2}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModalEmp2}>
									<FormGroup>
										<Select
											name="form-field-name"
											value={appointment}
											options={options}
											placeholder="Select one of the following:"
											isSearchable={false}
											onChange={this.onSelectedChanged}
										/>
										<Input
											type="text"
											name="title"
											id="title"
											value={this.state.title}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="start"
											defaultValue={this.state.slotEventEmp2.start}
											id="startEmp1"
											placeholder="Start Time"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="end"
											defaultValue={this.state.slotEventEmp2.end}
											id="end"
											placeholder="End Time"
											onChange={this.onChangeModal}
										/>

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to add event to calendar ends here */}

					{/* Modal To Edit Events */}
					<div>
						<Modal
							isOpen={this.state.modalToEditEvent}
							toggle={this.toggleToEdit}
						>
							<ModalHeader toggle={this.handleEventGetter}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModalToEdit}>
									<FormGroup>
										<h6>
											Enter "app" to book an appointment or "schedule" to modify
											your hours
											<i
												style={{ marginLeft: "5px" }}
												className="fa fa-level-down"
												aria-hidden="true"
											></i>
										</h6>
										<Input
											type="text"
											name="appointmentEdit"
											value={this.state.appointmentEdit || ""}
											placeholder='Enter: "app" or "schedule"'
											onChange={this.onChangeModal}
										/>
										<Input
											type="text"
											name="editTitle"
											id="editTitle"
											defaultValue={this.state.eventToEdit.title}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>
										{/* <Input
											className="slotEvent"
											type="text"
											name="editStart"
											defaultValue={this.state.eventToEdit.start}
											id="editStart"
											placeholder="Start Time"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="editEnd"
											defaultValue={this.state.eventToEdit.end}
											id="editEnd"
											placeholder="End Time"
											onChange={this.onChangeModal}
										/> */}

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
								<Button
									onClick={() => {
										this.handleDeleteEvent(this.state.eventToEdit.id);
									}}
									color="danger"
									style={{ marginTop: "1rem" }}
									block
								>
									Delete Event
								</Button>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to edit events ends here */}

					{/* Modal To Edit Events Emp1 */}
					<div>
						<Modal
							isOpen={this.state.modalToEditEventEmp1}
							toggle={this.toggleToEditEmp1}
						>
							<ModalHeader toggle={this.handleEventGetterEmp1}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModalToEditEmp1}>
									<FormGroup>
										<h6>
											Enter "app" to book an appointment or "schedule" to modify
											your hours
											<i
												style={{ marginLeft: "5px" }}
												className="fa fa-level-down"
												aria-hidden="true"
											></i>
										</h6>
										<Input
											type="text"
											name="appointmentEditEmp1"
											value={this.state.appointmentEditEmp1 || ""}
											placeholder='Enter: "app" or "schedule"'
											onChange={this.onChangeModal}
										/>
										<Input
											type="text"
											name="editTitleEmp1"
											id="editTitleEmp1"
											defaultValue={this.state.editTitleEmp1}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>
										{/* <Input
											className="slotEvent"
											type="text"
											name="editStart"
											defaultValue={this.state.eventToEdit.start}
											id="editStart"
											placeholder="Start Time"
											onChange={this.onChangeModal}
										/>
										<Input
											className="slotEvent"
											type="text"
											name="editEnd"
											defaultValue={this.state.eventToEdit.end}
											id="editEnd"
											placeholder="End Time"
											onChange={this.onChangeModal}
										/> */}

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
								<Button
									onClick={() => {
										this.handleDeleteEventEmp1(this.state.eventToEditEmp1.id);
									}}
									color="danger"
									style={{ marginTop: "1rem" }}
									block
								>
									Delete Event
								</Button>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to edit events ends here */}

					{/* Modal To Edit Events Emp2 */}
					<div>
						<Modal
							isOpen={this.state.modalToEditEventEmp2}
							toggle={this.toggleToEditEmp2}
						>
							<ModalHeader toggle={this.handleEventGetterEmp2}>
								Please confirm your event details
							</ModalHeader>
							<ModalBody>
								<Form onSubmit={this.onSubmitModalToEditEmp2}>
									<FormGroup>
										<h6>
											Enter "app" to book an appointment or "schedule" to modify
											your hours
											<i
												style={{ marginLeft: "5px" }}
												className="fa fa-level-down"
												aria-hidden="true"
											></i>
										</h6>
										<Input
											type="text"
											name="appointmentEditEmp2"
											value={this.state.appointmentEditEmp2 || ""}
											placeholder='Enter: "app" or "schedule"'
											onChange={this.onChangeModal}
										/>
										<Input
											type="text"
											name="editTitleEmp2"
											id="editTitleEmp2"
											defaultValue={this.state.editTitleEmp2}
											placeholder="Please enter the event details"
											onChange={this.onChangeModal}
										/>

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
								<Button
									onClick={() => {
										this.handleDeleteEventEmp2(this.state.eventToEditEmp2.id);
									}}
									color="danger"
									style={{ marginTop: "1rem" }}
									block
								>
									Delete Event
								</Button>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to edit events ends here */}

					<div className="col-md-12">
						<div className="container">
							<div className="row">
								{/* Admin's Calendar */}
								<div
									className="col-md-12 "
									style={{
										height: 800,
										marginLeft: "0px",
										background: "rgba(3, 26, 77, 0.952)",
										border: "double 3px white"
									}}
								>
									<h1
										style={{
											textAlign: "center",
											paddingTop: "15px",
											color: "white"
										}}
									>
										Admin
									</h1>
									<hr style={{ background: "white" }}></hr>
									<Calendar
										components={components}
										style={{
											height: "700px",
											marginBottom: "200px",
											background: "white",
											paddingTop: "15px",
											border: "5px solid #D25299"
										}}
										events={cal_eventsAdmin}
										onSelectSlot={this.handleSelect}
										step={15}
										selectable
										eventPropGetter={this.eventStyleGetter}
										timeslots={4}
										defaultView="week"
										views={["month", "week", "day", "agenda"]}
										defaultDate={new Date()}
										localizer={localizer}
										min={new Date(2019, 10, 0, 9, 30, 0)}
										max={new Date(2019, 10, 0, 12, 0, 0)}
										onSelectEvent={this.handleEventGetter}
									/>
								</div>
								{/* Admin's Calendar Ends*/}

								{/* Employee #1 calendar Starts*/}
								<div
									className="col-md-12"
									style={{
										height: 800,
										marginLeft: "0px",
										background: "rgba(3, 26, 77, 0.952)",
										border: "double 3px white"
									}}
								>
									<h1
										style={{
											textAlign: "center",
											paddingTop: "15px",
											color: "white"
										}}
									>
										Employee 1
									</h1>
									<hr style={{ background: "white" }}></hr>
									<Calendar
										components={components}
										style={{
											height: "700px",
											marginBottom: "200px",
											background: "#cce5ff",
											paddingTop: "15px",
											border: "5px solid #D25299"
										}}
										events={cal_eventsEmp1}
										onSelectSlot={this.handleSelectEmp1}
										step={30}
										selectable
										eventPropGetter={this.eventStyleGetterEmp1}
										timeslots={2}
										defaultView="week"
										views={["month", "week", "day", "agenda"]}
										defaultDate={new Date()}
										localizer={localizer}
										min={new Date(2019, 10, 0, 7, 0, 0)}
										max={new Date(2019, 10, 0, 15, 0, 0)}
										onSelectEvent={this.handleEventGetterEmp1}
									/>
								</div>
								{/* Employee #1 calendar Ends*/}

								{/* Employee #2 calendar Starts*/}
								<div
									className="col-md-12"
									style={{
										height: 800,
										marginLeft: "0px",
										background: "rgba(3, 26, 77, 0.952)",
										border: "double 3px white"
									}}
								>
									<h1
										style={{
											textAlign: "center",
											paddingTop: "15px",
											color: "white"
										}}
									>
										Employee 2
									</h1>
									<hr style={{ background: "white" }}></hr>
									<Calendar
										components={components}
										style={{
											height: "700px",
											marginBottom: "200px",
											background: "#ffe6ff",
											paddingTop: "15px",
											border: "5px solid #D25299"
										}}
										events={cal_eventsEmp2}
										onSelectSlot={this.handleSelectEmp2}
										step={30}
										selectable
										eventPropGetter={this.eventStyleGetterEmp2}
										timeslots={2}
										defaultView="week"
										views={["month", "week", "day", "agenda"]}
										defaultDate={new Date()}
										localizer={localizer}
										min={new Date(2019, 10, 0, 7, 0, 0)}
										max={new Date(2019, 10, 0, 15, 0, 0)}
										onSelectEvent={this.handleEventGetterEmp2}
									/>
								</div>
								{/* Employee #2 calendar Ends*/}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MainCalendar;
