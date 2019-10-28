// import React, { Component } from "react";
import React from "react";
import API from "../../../utils/API";
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

let optionsAdmin = [
	{
		value: "app",
		label: "Book an Appointment (DOG)"
	},
	{
		value: "bigDog",
		label: "Book an Appointment (BIG DOG)"
	},
	{
		value: "cat",
		label: "Book an Appointment (CAT)"
	},
	{
		value: "schedule",
		label: "Modify your working Schedule"
	}
];

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarAdmin extends React.Component {
	constructor(props) {
		super(props);

		//Replaced by arrow functions :)
		// this.onSubmit = this.onSubmitModal.bind(this);
		// this.onSubmit = this.onSubmitModalToEdit.bind(this);
		// this.onChange = this.onChangeModal.bind(this);

		this.state = {
			modal: false,
			modalToEditEvent: false,
			slotEvent: "",
			title: "",
			appointment: "",
			appointmentEdit: "",
			editTitle: "",
			editStart: "",
			editEnd: "",
			eventToEdit: "",
			cal_eventsAdmin: [
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
	}

	// Modal Functions ************************************

	//Toggle for modal form to add Appointments to calendar
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	//Toggle to edit appointments on calendar
	toggleToEdit = () => {
		this.setState({
			modalToEditEvent: !this.state.modalToEditEvent
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
		if (event.appointment === "schedule") {
			style.backgroundColor = "red";
			style.color = "white";
		}
		if (event.appointment === "cat") {
			style.backgroundColor = "#009999";
		}
		if (event.appointment === "bigDog") {
			style.backgroundColor = "navy";
		}
		return {
			style
		};
	};

	render() {
		const { cal_eventsAdmin } = this.state;
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
											options={optionsAdmin}
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

					{/* <div className="col-md-12">
						<div className="container">
							<div className="row"> */}
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
							defaultView="day"
							views={["month", "week", "day", "agenda"]}
							defaultDate={new Date()}
							localizer={localizer}
							min={new Date(2019, 10, 0, 9, 30, 0)}
							max={new Date(2019, 10, 0, 12, 0, 0)}
							onSelectEvent={this.handleEventGetter}
						/>
					</div>
					{/* Admin's Calendar Ends*/}
				</div>
			</div>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

export default CalendarAdmin;
