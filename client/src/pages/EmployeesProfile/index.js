import axios from "axios";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import MainCalendar from "../../components/Calendar";
import API from "../../utils/API";
import ReactTable from "react-table";
import CalendarInstructions from "../../components/CalendarInstructions";

class Profile extends Component {
	state = {
		clients: [],
		lastName: "",
		firstName: "",
		phone: "",
		petName: "",
		breed: "",
		notes: "",
		employee: "",
		isLoading: true,
		error: false,
		toggleAddAppointmentForm: false
	};

	async componentDidMount() {
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			this.setState({
				isLoading: false,
				error: true
			});
		} else {
			try {
				const response = await axios.get("/auth/employees_profile", {
					headers: { Authorization: `JWT ${accessString}` }
				});
				this.getAllClients();
				this.setState({
					employee: response.data,
					isLoading: false,
					error: false
				});
				console.log(response);
			} catch (error) {
				console.error(error.response);
				this.setState({
					error: true
				});
			}
		}
	}

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/auth/login";
	}

	handleFormSubmit = e => {
		e.preventDefault();
		if (
			!this.state.lastName ||
			!this.state.firstName ||
			!this.state.phone ||
			!this.state.petName ||
			!this.state.breed ||
			!this.state.notes
		) {
			return;
		}
		API.addClient({
			lastName: this.state.lastName.toLowerCase(),
			firstName: this.state.firstName.toLowerCase(),
			phone: this.state.phone.toLowerCase(),
			petName: this.state.petName.toLowerCase(),
			breed: this.state.breed.toLowerCase(),
			notes: this.state.notes.toLowerCase()
		})
			.then(alert("New Client added to list!"))
			.then(
				this.setState({
					petName: "",
					breed: "",
					notes: "",
					lastName: "",
					firstName: "",
					phone: ""
				})
			)
			.then(res => this.getAllClients())
			.catch(err => console.log(err));
	};

	handleDeleteClient = id => {
		if (
			window.confirm(`Are you sure you wish to delete this client permanently?`)
		) {
			API.deleteClient(id)
				.then(
					alert(
						"Client with Id number: " + id + " has been successfully deleted!"
					)
				)
				.then(res => this.getAllClients())
				.catch(err => console.log(err));
			// window.location.href = "/auth/admin";
			this.props.history.push("/auth/employees_profile");
		}
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	getAllClients = () => {
		API.getClients()
			.then(res => {
				if (res.data.status === "error") {
					throw new Error(res.data.message);
				}
				this.setState({ clients: res.data });
			})
			.catch(err => console.log(err));
	};

	render() {
		// const cal_events = [];
		const { isLoading, error } = this.state;
		if (error) {
			return (
				<div style={{ marginLeft: "10%", fontSize: "30px", height: "100vh" }}>
					...Problem fetching user data. Please login again
					<span role="img" aria-label="Face With Rolling Eyes Emoji">
						🙄
					</span>
				</div>
			);
		}
		if (isLoading) {
			return <div>Loading User Data...</div>;
		}

		//clients Rendering

		const clients = this.state.clients;

		const columns = [
			{
				Header: "ID",
				accessor: "id",
				filterable: true,
				style: {
					textAlign: "center"
				}
			},
			{
				Header: "LAST NAME",
				accessor: "lastName",
				filterable: true,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "FIRST NAME",
				accessor: "firstName",
				filterable: true,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "PHONE",
				accessor: "phone",
				filterable: true,
				width: 150,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "PET NAME",
				accessor: "petName",
				filterable: true,
				width: 150,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "BREED",
				accessor: "breed",
				filterable: true,
				width: 200,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "NOTES",
				accessor: "notes",
				sortable: false,
				filterable: false,
				style: {
					textAlign: "justify"
				}
			},
			{
				Header: "ACTIONS",
				Cell: props => {
					return (
						<button
							className="btn btn-danger"
							onClick={() => {
								// console.log("props", props)
								this.handleDeleteClient(props.original.id);
							}}
						>
							Delete
						</button>
					);
				},
				sortable: false,
				filterable: false
			},
			{
				Header: "",
				Cell: props => {
					return (
						<Link
							style={{ width: "70px" }}
							className="btn btn-info"
							to={"api/clients/" + props.original.id}
						>
							Edit
						</Link>
					);
				},
				sortable: false,
				filterable: false
			}
		];

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12">
						<hr style={{ borderTop: "1px solid black", height: "0" }}></hr>
						<h1
							style={{
								textAlign: "center",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
								marginBottom: "20px",
								fontSize: "50px"
							}}
						>
							Welcome to Amazing Pet Grooming Control Panel
						</h1>
						<hr style={{ borderTop: "1px solid black", height: "0" }}></hr>

						{/* Logout Btn */}
						<Button
							color="warning"
							style={{
								fontSize: "20px",
								color: "navy",
								border: "solid 2px navy",
								marginBottom: "15px"
							}}
							onClick={this.handleLogOut}
						>
							Logout
						</Button>

						{/* Add Clients Btn */}
						<Button
							style={{
								fontSize: "20px",
								background: "rgb(230, 240, 255)",
								marginLeft: "15px",
								marginBottom: "15px",
								border: "2px solid black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
						>
							<a style={{ color: "black" }} href="#addClient">
								Add Clients
							</a>
						</Button>

						{/* See Clients List Btn */}
						<Button
							style={{
								fontSize: "20px",
								background: "rgb(230, 240, 200)",
								marginLeft: "15px",
								marginBottom: "15px",
								border: "2px solid black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
						>
							<a style={{ color: "black" }} href="#clientsList">
								See Clients List
							</a>
						</Button>

						{/* See Paola's Calendar Btn */}
						<Button
							style={{
								// position: "absolute",
								// position: "-webkit-sticky",
								position: "sticky",
								top: "20px",
								fontSize: "18px",
								background: "white",
								marginLeft: "5px",
								marginBottom: "15px",
								border: "2px solid black",
								color: "black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
							onClick={this.toggleAddAppointmentFunction}
						>
							<a style={{ color: "black" }} href="#mainCalendar">
								See Admin's Calendar
							</a>
							<i className="fas fa-chevron-circle-down"></i>
						</Button>

						{/* See Claudia's Calendar Btn */}

						<Button
							style={{
								fontSize: "18px",
								background: "#99ccff",
								marginLeft: "5px",
								marginBottom: "15px",
								border: "2px solid black",
								color: "black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
							onClick={this.toggleAddAppointmentFunction}
						>
							<a style={{ color: "black" }} href="#mainCalendar">
								See Emp 1's Calendar
							</a>
							<i className="fas fa-chevron-circle-down"></i>
						</Button>

						{/* See Diana's Calendar Btn */}

						<Button
							style={{
								fontSize: "18px",
								background: "#ffccff",
								marginLeft: "5px",
								marginBottom: "15px",
								border: "2px solid black",
								color: "black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
							onClick={this.toggleAddAppointmentFunction}
						>
							<a style={{ color: "black" }} href="#mainCalendar">
								See Emp 1's Calendar
							</a>
							<i className="fas fa-chevron-circle-down"></i>
						</Button>
					</div>
					<CalendarInstructions />
					<div id="mainCalendar">
						<MainCalendar />
					</div>
				</div>
				<div id="addClient"></div>
				<div className="container">
					<div
						className="row justify-content-around"
						style={{
							background: "white",
							border: "10px solid #0A3055",
							marginTop: "20px"
						}}
					>
						<div
							className="col-md-7"
							style={{
								border: "10px double #0A3055",
								background: "#cce6ff",
								color: "black",
								marginBottom: "30px",
								marginTop: "60px"
							}}
						>
							<form
								className="form-group"
								onSubmit={this.handleFormSubmit.bind(this)}
								style={{ marginBottom: "50px" }}
							>
								<h2
									className="grey-text text-darken-3"
									style={{ textAlign: "center", marginTop: "15px" }}
								>
									Add a New Client
								</h2>
								<Button
									style={{
										fontSize: "20px",
										background: "rgb(51, 51, 204)",
										marginLeft: "15px",
										marginBottom: "15px",
										border: "1px solid black",
										float: "right"
									}}
								>
									<a style={{ color: "white" }} href="#clientsList">
										See Clients List
									</a>
								</Button>
								<ScrollUpButton
									StopPosition={0}
									ShowAtPosition={10}
									EasingType="easeOutCubic"
									AnimationDuration={500}
									ContainerClassName="ScrollUpButton__Container"
									TransitionClassName="ScrollUpButton__Toggled"
									style={{ marginBottom: "200px", marginRight: "6%" }}
									ToggledStyle={{}}
								/>
								<p>* Fields required</p>
								<hr style={{ background: "grey", marginTop: "30px" }}></hr>
								<div className="input-field">
									<label htmlFor="lastName">* Last Name</label>
									<input
										className="form-control"
										type="text"
										id="lastName"
										value={this.state.lastName}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="firstName">* First Name</label>
									<input
										className="form-control"
										type="text"
										id="firstName"
										value={this.state.firstName}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="phone">* Phone</label>
									<input
										className="form-control"
										type="text"
										id="phone"
										value={this.state.phone}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="petName">* Pet Name</label>
									<input
										className="form-control"
										type="text"
										id="petName"
										value={this.state.petName}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="breed">* Breed</label>
									<input
										className="form-control"
										type="text"
										id="breed"
										value={this.state.breed}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="notes">Notes</label>
									<input
										className="form-control"
										type="text"
										id="notes"
										value={this.state.notes}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<button
										style={{ marginTop: "30px" }}
										className="btn-primary lighten-1 z-depth-0"
										onClick={this.handleFormSubmit}
									>
										Add Client
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<h1
					id="clientsList"
					style={{
						textAlign: "center",
						marginTop: "30px",
						color: "black",
						textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
					}}
				>
					Clients List
				</h1>
				<ReactTable
					style={{
						border: "1px solid white",
						background: "white",
						marginBottom: "110px"
					}}
					columns={columns}
					data={clients}
					defaultPageSize={8}
					noDataText={"No records found with your search"}
				></ReactTable>
			</div>
		);
	}
}

export default Profile;
