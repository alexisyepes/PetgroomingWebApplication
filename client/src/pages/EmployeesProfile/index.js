import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import API from "../../utils/API";
import ReactTable from "react-table";
import CalendarAdmin from "../../components/Calendars/CalendarAdmin";
import CalendarEmp1 from "../../components/Calendars/CalendarEmp1";
import CalendarEmp2 from "../../components/Calendars/CalendarEmp2";
import CalendarInstructions from "../../components/Calendars/CalendarInstructions";

import {
	Table,
	Button,
	Form,
	FormGroup,
	Input,
	Modal,
	ModalHeader,
	ModalBody
} from "reactstrap";
import "./style.css";
// import WaitingList from "../../components/WaitingList";
import "./style.css";

class Profile extends Component {
	state = {
		clients: [],
		lastName: "",
		firstName: "",
		primaryPhoneNumber: "",
		cellphone: "",
		workPhone: "",
		email: "",
		employee: "",
		isLoading: true,
		error: false,
		toggleAddAppointmentForm: false,
		toggleSearchClientByPhoneForm: false,
		clientSearchInputByPhone: "",
		clientSearchValuePhone: [],
		modalToShowResultsByPhone: false,
		petNameSearchInput: "",
		petNameSearchResults: [],
		lastNameSearchInput: "",
		lastNameSearchResults: [],
		firstNameSearchInput: "",
		firstNameSearchResults: []
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

	toggleFormToSearchByPhone = () => {
		if (this.state.toggleSearchClientByPhoneForm === false) {
			this.setState({
				firstNameSearchResults: [],
				lastNameSearchResults: [],
				petNameSearchResults: [],
				clientSearchValuePhone: [],
				firstNameSearchInput: "",
				lastNameSearchInput: "",
				petNameSearchInput: "",
				clientSearchInputByPhone: ""
			});
		}
		this.setState({
			toggleSearchClientByPhoneForm: !this.state.toggleSearchClientByPhoneForm
		});
	};

	toggleModalResults = () => {
		this.setState({
			modalToShowResultsByPhone: !this.state.modalToShowResultsByPhone
		});
	};

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/auth/login";
	}

	//edit client form submit
	handleFormSubmit = e => {
		e.preventDefault();
		if (!this.state.lastName || !this.state.firstName) {
			return;
		}
		API.addClient({
			lastName: this.state.lastName.replace(/^./, str => str.toUpperCase()),
			firstName: this.state.firstName.replace(/^./, str => str.toUpperCase()),
			primaryPhoneNumber: this.state.primaryPhoneNumber,
			cellphone: this.state.cellphone,
			workPhone: this.state.workPhone,
			email: this.state.email
		})
			.then(res => {
				console.log(res);
			})
			.then(
				this.setState({
					email: "",
					cellphone: "",
					workPhone: "",
					lastName: "",
					firstName: "",
					primaryPhoneNumber: ""
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

	onChangeSearchForm = e => {
		this.setState({
			[e.target.name]: e.target.value
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

	searchClientByPhone = e => {
		e.preventDefault();
		this.toggleModalResults();

		let phone = this.state.clientSearchInputByPhone;

		if (!this.state.clientSearchInputByPhone) {
			this.setState({
				clientSearchInputByPhone: ""
			});
			return;
		}

		API.getClientByPhone(phone)

			.then(res => {
				if (res.data) {
					this.setState(
						{
							clientSearchValuePhone: res.data
						},
						() => console.log(res.data)
					);
				} else {
					this.setState({
						modalToShowResultsByPhone: false
					});
					alert("Phone number does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	searchPetByName = e => {
		// this.toggleModalResults();
		e.preventDefault();
		let name = this.state.petNameSearchInput;

		if (!this.state.petNameSearchInput) {
			return;
		}

		API.getPetByName(name)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							petNameSearchResults: res.data
						},
						() => console.log(res.data)
					);
				} else if (res.data === null) {
					alert("Pet name does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	searchByLastName = e => {
		// this.toggleModalResults();
		e.preventDefault();
		let lastName = this.state.lastNameSearchInput;

		if (!this.state.lastNameSearchInput) {
			return;
		}

		API.getClientByLastName(lastName)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							lastNameSearchResults: res.data
						},
						() => console.log(res.data)
					);
				} else if (res.data.length === 0) {
					alert("Last name does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	searchByFirstName = e => {
		// this.toggleModalResults();
		e.preventDefault();
		let firstName = this.state.firstNameSearchInput;

		if (!this.state.firstNameSearchInput) {
			return;
		}

		API.getClientByFirstName(firstName)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							firstNameSearchResults: res.data
						},
						() => console.log(res.data)
					);
				} else if (res.data.length === 0) {
					alert("First name does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	render() {
		const { isLoading, error } = this.state;
		if (error) {
			return (
				<div
					style={{
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh"
					}}
				>
					...Problem fetching user data. Please login again
					<span role="img" aria-label="Face With Rolling Eyes Emoji">
						🙄
					</span>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div
					style={{
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh"
					}}
				>
					Loading Amazing Pet Grooming Data...
				</div>
			);
		}

		//Search Results by Phone to show on a Modal//////////////////////////////////////////////

		const clientSearchValuePhone = this.state.clientSearchValuePhone;
		const clientSearchValuePhoneResults = clientSearchValuePhone.length ? (
			clientSearchValuePhone.map(result => {
				return (
					<div key={result.id} className="row">
						<div className="col">
							<Table className="tableSearchResults">
								<tbody>
									<tr>
										<td className="tableHeadings">
											Client #:
											<span className="searchResultsByPetNameSpan">
												{result.id}
											</span>
										</td>
										<td className="tableHeadings">
											First Name:
											<span className="searchResultsByPetNameSpan">
												{result.firstName}
											</span>
										</td>
										<td className="tableHeadings">
											Last Name:
											<span className="searchResultsByPetNameSpan">
												{result.lastName}
											</span>{" "}
										</td>
										<td className="tableHeadings">
											Primary Phone #:
											<span className="searchResultsByPetNameSpan">
												{result.primaryPhoneNumber}
											</span>{" "}
										</td>
										<td>
											<Link
												style={{
													border: "1px solid white",
													display: "block"
												}}
												className="btn btn-warning"
												to={"api/clients/" + result.id}
											>
												More Info...
											</Link>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				);
			})
		) : (
			<div></div>
		);

		//Search Results by First Name//////////////////////////////////////////////

		const firstNameSearchResults = this.state.firstNameSearchResults;
		const searchResultsFirstNameList = firstNameSearchResults.length ? (
			firstNameSearchResults.map(result => {
				return (
					<div key={result.id} className="row">
						<div className="col">
							<Table className="tableSearchResults">
								<tbody>
									<tr>
										<td className="tableHeadings">
											Client #:
											<span className="searchResultsByPetNameSpan">
												{result.id}
											</span>
										</td>
										<td className="tableHeadings">
											First Name:
											<span className="searchResultsByPetNameSpan">
												{result.firstName}
											</span>
										</td>
										<td className="tableHeadings">
											Last Name:
											<span className="searchResultsByPetNameSpan">
												{result.lastName}
											</span>{" "}
										</td>
										<td className="tableHeadings">
											Primary Phone #:
											<span className="searchResultsByPetNameSpan">
												{result.primaryPhoneNumber}
											</span>{" "}
										</td>
										<td>
											<Link
												style={{
													border: "1px solid white",
													display: "block"
												}}
												className="btn btn-warning"
												to={"api/clients/" + result.id}
											>
												More Info...
											</Link>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				);
			})
		) : (
			<div></div>
		);

		//Search Results by Last Name//////////////////////////////////////////////

		const lastNameSearchResults = this.state.lastNameSearchResults;
		const searchResultsLastNameList = lastNameSearchResults.length ? (
			lastNameSearchResults.map(result => {
				return (
					<div key={result.id} className="row">
						<div className="col">
							<Table className="tableSearchResults">
								<tbody>
									<tr>
										<td className="tableHeadings">
											Client #:
											<span className="searchResultsByPetNameSpan">
												{result.id}
											</span>
										</td>
										<td className="tableHeadings">
											First Name:
											<span className="searchResultsByPetNameSpan">
												{result.firstName}
											</span>
										</td>
										<td className="tableHeadings">
											Last Name:
											<span className="searchResultsByPetNameSpan">
												{result.lastName}
											</span>{" "}
										</td>
										<td className="tableHeadings">
											Primary Phone #:
											<span className="searchResultsByPetNameSpan">
												{result.primaryPhoneNumber}
											</span>{" "}
										</td>
										<td>
											<Link
												style={{
													border: "1px solid white",
													display: "block"
												}}
												className="btn btn-warning"
												to={"api/clients/" + result.id}
											>
												More Info...
											</Link>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				);
			})
		) : (
			<div></div>
		);

		//Search Results by Pet Name//////////////////////////////////////////////

		const searchResultsByPetName = this.state.petNameSearchResults;
		const searchResultsPetNameList = searchResultsByPetName.length ? (
			searchResultsByPetName.map(petName => {
				return (
					<div key={petName.id} className="row">
						<div className="col">
							<Table className="tableSearchResults">
								<tbody>
									<tr>
										<td className="tableHeadings">
											Client #:
											<span className="searchResultsByPetNameSpan">
												{petName.ClientId}
											</span>
										</td>
										<td className="tableHeadings">
											Pet Name:
											<span className="searchResultsByPetNameSpan">
												{petName.name}
											</span>
										</td>
										<td className="tableHeadings">
											Breed:
											<span className="searchResultsByPetNameSpan">
												{petName.breed}
											</span>{" "}
										</td>
										<td className="tableHeadings">
											Type:
											<span className="searchResultsByPetNameSpan">
												{petName.type}
											</span>{" "}
										</td>
										<td>
											<Link
												style={{
													border: "1px solid white",
													display: "block"
												}}
												className="btn btn-warning"
												to={"api/clients/" + petName.ClientId}
											>
												More Info...
											</Link>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				);
			})
		) : (
			<div></div>
		);

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
				Header: "PRIMARY PHONE",
				accessor: "primaryPhoneNumber",
				filterable: true,
				width: 150,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "CELLPHONE",
				accessor: "cellphone",
				filterable: true,
				width: 150,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "WORK PHONE",
				accessor: "workPhone",
				filterable: true,
				width: 200,
				style: {
					textAlign: "left"
				}
			},
			{
				Header: "Email",
				accessor: "email",
				sortable: false,
				filterable: true,
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
							style={{ width: "90px" }}
							className="btn btn-info"
							to={"api/clients/" + props.original.id}
						>
							More Info
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
						<h1 className="controlPanelHeading">
							Welcome to the Staff's Control Panel
						</h1>
						<h1 className="controlPanelHeadingMobile">Control Panel</h1>

						<hr style={{ borderTop: "1px solid black", height: "0" }}></hr>

						<div className="row justify-content-center">
							{/* Logout Btn */}
							<Button
								className="buttonsControlPanel"
								color="warning"
								style={{
									color: "navy",
									border: "solid 2px navy",
									marginBottom: "15px",
									marginLeft: "5px"
								}}
								onClick={this.handleLogOut}
							>
								Logout
							</Button>

							{/* Add Clients Btn */}
							<Button
								className="buttonsControlPanel"
								style={{
									background: "rgb(230, 240, 255)",
									marginLeft: "5px",
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
								className="buttonsControlPanel"
								style={{
									background: "rgb(230, 240, 200)",
									marginLeft: "5px",
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

							{/* Search client by phone Btn */}
							<Button
								className="buttonsControlPanelManageEmployees"
								style={{
									fontSize: "20px",
									background: "rgba(153, 204, 0)",
									marginBottom: "15px",
									color: "black",
									border: "2px solid black",
									textShadow:
										"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
								}}
								onClick={this.toggleFormToSearchByPhone}
							>
								Search Clients <i className="fas fa-chevron-circle-down"></i>
							</Button>

							{/* See Paola's Calendar Btn */}
							<Button
								className="buttonsControlPanelCalendars"
								style={{
									// position: "absolute",
									// position: "-webkit-sticky",
									position: "sticky",
									top: "20px",

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
								<a style={{ color: "black" }} href="#AdminCalendar">
									See Paola's Calendar
								</a>
								<i className="fas fa-chevron-circle-down"></i>
							</Button>

							{/* See Claudia's Calendar Btn */}

							<Button
								className="buttonsControlPanelCalendars"
								style={{
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
								<a style={{ color: "black" }} href="#Emp1Calendar">
									See Claudia's Calendar
								</a>
								<i className="fas fa-chevron-circle-down"></i>
							</Button>

							{/* See Diana's Calendar Btn */}

							<Button
								className="buttonsControlPanelCalendars"
								style={{
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
								<a style={{ color: "black" }} href="#Emp2Calendar">
									See Diana's Calendar
								</a>
								<i className="fas fa-chevron-circle-down"></i>
							</Button>
						</div>
						{this.state.toggleSearchClientByPhoneForm ? (
							<div className="container searchBoxContainer">
								<div className="row ">
									<div className="col searchForm">
										<FormGroup>
											<Form onSubmit={this.searchClientByPhone}>
												<h4 className="searchBoxTitles">Phone</h4>
												<Input
													onChange={this.onChangeSearchForm}
													name="clientSearchInputByPhone"
													placeholder="Enter phone Number"
													value={this.state.clientSearchInputByPhone}
												></Input>
												<Button className="searchButtons">
													Search By Phone
												</Button>
											</Form>
										</FormGroup>
									</div>
									<div className="col searchForm">
										<FormGroup>
											<Form onSubmit={this.searchPetByName}>
												<h4 className="searchBoxTitles">Pet Name</h4>
												<Input
													onChange={this.onChangeSearchForm}
													name="petNameSearchInput"
													placeholder="Enter Pet Name"
													value={this.state.petNameSearchInput}
												></Input>
												<Button className="searchButtons">
													Search By Pet Name
												</Button>
											</Form>
										</FormGroup>
									</div>
									<div className="col searchForm">
										<FormGroup>
											<Form onSubmit={this.searchByLastName}>
												<h4 className="searchBoxTitles">Last Name</h4>
												<Input
													onChange={this.onChangeSearchForm}
													name="lastNameSearchInput"
													placeholder="Enter Last Name"
													value={this.state.lastNameSearchInput}
												></Input>
												<Button className="searchButtons">
													Search By Last Name
												</Button>
											</Form>
										</FormGroup>
									</div>
									<div className="col searchForm">
										<FormGroup>
											<Form onSubmit={this.searchByFirstName}>
												<h4 className="searchBoxTitles">First Name</h4>
												<Input
													onChange={this.onChangeSearchForm}
													name="firstNameSearchInput"
													placeholder="Enter First Name"
													value={this.state.firstNameSearchInput}
												></Input>
												<Button className="searchButtons">
													Search By First Name
												</Button>
											</Form>
										</FormGroup>
									</div>
								</div>
							</div>
						) : null}
					</div>

					<div className="col-md-12">{searchResultsFirstNameList}</div>
					<div className="col-md-12">{searchResultsLastNameList}</div>
					<div className="col-md-12">{searchResultsPetNameList}</div>
					<div className="col-md-12">
						<Modal
							className="modal-xl"
							isOpen={this.state.modalToShowResultsByPhone}
							toggle={this.toggleModalResults}
						>
							<ModalHeader toggle={this.toggleModalResults}>
								<div>
									<h4>Search Results</h4>
								</div>
							</ModalHeader>
							<ModalBody>{clientSearchValuePhoneResults}</ModalBody>
						</Modal>
					</div>
					<CalendarInstructions />
					<div id="AdminCalendar" className="col-md-4">
						<CalendarAdmin style={{ width: "33%" }} />
					</div>
					<div id="Emp1Calendar" className="col-md-4">
						<CalendarEmp1 style={{ width: "33%" }} />
					</div>
					<div id="Emp2Calendar" className="col-md-4">
						<CalendarEmp2 style={{ width: "33%" }} />
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
									<label htmlFor="phone">* Primary Phone</label>
									<input
										className="form-control"
										type="text"
										id="primaryPhoneNumber"
										value={this.state.primaryPhoneNumber}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="cellphone">* Cell</label>
									<input
										className="form-control"
										type="text"
										id="cellphone"
										value={this.state.cellphone}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="workPhone">* Work Phone</label>
									<input
										className="form-control"
										type="text"
										id="workPhone"
										value={this.state.workPhone}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="email">Email</label>
									<input
										className="form-control"
										type="text"
										id="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</div>
								<div className="input-field">
									<button
										style={{ marginTop: "30px" }}
										className="btn-primary lighten-1 z-depth-0"
										// onClick={this.handleFormSubmit}
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
					defaultSorted={[
						{
							id: "id",
							desc: true
						}
					]}
				></ReactTable>
			</div>
		);
	}
}

export default Profile;
