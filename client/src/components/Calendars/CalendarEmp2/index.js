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

let options = [
	{
		value: "bath",
		label: "Book an Appointment (BATH)"
	},
	{
		value: "app",
		label: "Book an Appointment (SMALL DOG)"
	},
	{
		value: "mediumDog",
		label: "Book an Appointment (MEDIUM DOG)"
	},
	{
		value: "bigDog",
		label: "Book an Appointment (LARGE DOG)"
	},
	{
		value: "schedule",
		label: "Modify your working Schedule"
	}
];

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarEmp2 extends React.Component {
	constructor(props) {
		super(props);

		//Replaced by arrow functions :)
		// this.onSubmit = this.onSubmitModal.bind(this);
		// this.onSubmit = this.onSubmitModalToEdit.bind(this);
		// this.onChange = this.onChangeModal.bind(this);
		this.handleDeleteEventEmp2 = this.handleDeleteEventEmp2.bind(this);
		this.onSubmitModalToEditEmp2 = this.onSubmitModalToEditEmp2.bind(this);

		this.state = {
			modalEmp2: false,
			modalToEditEventEmp2: false,
			slotEventEmp2: "",
			title: "",
			appointmentEmp2: "",
			appointmentEditEmp2: "",
			editTitleEmp2: "",
			editStartEmp2: "",
			editEndEmp2: "",
			eventToEditEmp2: "",
			cal_eventsEmp2: [
				//State is updated via componentDidMount
			]
		};
	}

	componentDidMount() {
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

	toggleEmp2 = () => {
		this.setState({
			modalEmp2: !this.state.modalEmp2
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

	async onSubmitModalToEditEmp2(e) {
		e.preventDefault();

		// console.log(this.state.eventToEdit);

		let obj = {
			id: this.state.eventToEditEmp2.id,
			title: this.state.editTitleEmp2,
			start: this.state.editStartEmp2,
			end: this.state.editEndEmp2,
			appointment: this.state.appointmentEditEmp2
		};
		// console.log(obj);
		console.log(this.state.eventToEditEmp2.id);

		let id = this.state.eventToEditEmp2.id;

		await API.updateAppointmentEmp2(id, obj)

			.then(res => console.log(res))
			.catch(error => console.log(error));

		window.location.href = "/auth/employees_profile";
		// this.props.history.push("/auth/employees_profile");
	}

	async handleDeleteEventEmp2(id) {
		if (
			window.confirm(`Are you sure you wish to delete this Event permanently?`)
		) {
			await API.deleteCalendarEmp2Event(id)
				.then(res => this.getAppointmentsCalendarEmp2())
				.catch(err => console.log(err));
			window.location.href = "/auth/employees_profile";
			// this.props.history.push("/auth/employees_profile");
		}
	}

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

	//Function to define styling on Calendar's Emp1's events
	eventStyleGetterEmp2 = (event, start, end, isSelected) => {
		// console.log(event);

		// var backgroundColor = "#" + event.hexColor;
		var style = {
			backgroundColor: "rgb(51, 156, 255)",
			borderRadius: "5px",
			opacity: 0.8,
			fontSize: "16px",
			color: "white",
			border: "1px solid blue",
			display: "block",
			paddingLeft: "12px",
			paddingRight: "12px",
			textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
		};
		if (event.appointment === "schedule") {
			style.backgroundColor = "red";
			style.color = "white";
		}
		if (event.appointment === "bigDog") {
			style.backgroundColor = "rgb(0, 26, 51)";
		}
		if (event.appointment === "mediumDog") {
			style.backgroundColor = "#0056b3";
			style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		}
		if (event.appointment === "bath") {
			style.backgroundColor = "rgb(0, 255, 255)";
		}
		return {
			style
		};
	};

	render() {
		const { cal_eventsEmp2 } = this.state;
		const appointment = this.state.appointment;

		let components = {};

		return (
			<div className="container">
				<div className="row">
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

										<Button color="info" style={{ marginTop: "1rem" }} block>
											Submit Event
										</Button>
									</FormGroup>
								</Form>
							</ModalBody>
						</Modal>
					</div>
					{/* Modal to add event to calendar ends here */}

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
							defaultView="day"
							views={["month", "day"]}
							defaultDate={new Date()}
							localizer={localizer}
							min={new Date(2019, 10, 0, 7, 0, 0)}
							max={new Date(2019, 10, 0, 19, 0, 0)}
							onSelectEvent={this.handleEventGetterEmp2}
						/>
					</div>
					{/* Employee #2 calendar Ends*/}
				</div>
			</div>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

export default CalendarEmp2;
