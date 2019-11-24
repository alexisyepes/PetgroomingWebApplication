import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeSignupForm from "../../components/EmployeesForms/EmployeeSignup";
import { Button, Form } from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./style.css";

class AdminComp extends Component {
	_isMounted = false;

	state = {
		clients: [],
		employees: [],
		username: "",
		lastName: "",
		firstName: "",
		primaryPhoneNumber: "",
		cellphone: "",
		workPhone: "",
		emailClient: "",
		modal: false,
		modal2: false,
		modal3: false,
		clientSearch: "",
		clientSearch2: "",
		clientSearch3: "",
		toggleAddClientForm: false,
		toggleEmployeeForm: false,
		isLoading: true,
		error: false
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
				const response = await axios.get("/auth/admin", {
					headers: { Authorization: `JWT ${accessString}` }
				});
				const adminUsername = localStorage.getItem("USERNAME");
				this.getAllEmployees();
				this.getAllClients();
				this.setState({
					username: adminUsername,
					email: response.data.email,
					password: response.data.password,
					isLoading: false,
					error: false
				});
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

	//Employee Functions /////////////////////////////

	toggleEmployeeFormFunction = () => {
		this.setState({
			toggleEmployeeForm: !this.state.toggleEmployeeForm
		});
	};

	toggleAddClientForm = () => {
		this.setState({
			toggleAddClientForm: !this.state.toggleAddClientForm
		});
	};

	handleDeleteEmployee = id => {
		API.deleteEmployee(id)
			.then(
				alert(
					"Employee with Id number: " + id + " has been successfully deleted!"
				)
			)
			.then(res => this.getAllEmployees())
			.catch(err => console.log(err));
	};

	getAllEmployees = () => {
		API.getEmployees()
			.then(res => {
				// if (res.data.status === "error") {
				//     throw new Error(res.data.message);
				// }
				this.setState({ employees: res.data });
			})
			.catch(err => console.log(err));
	};

	//Employee Functions End /////////////////////////////

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

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
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
				.then(() => this.getAllClients())
				.catch(err => console.log(err));
			this.props.history.push("/auth/admin");
		}
	};

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
			email: this.state.emailClient
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
			.then(window.scrollTo(0, 1000))
			.catch(err => console.log(err));
	};

	render() {
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
			return (
				<div
					style={{
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh"
					}}
				>
					Loading User Data...
				</div>
			);
		}

		const employees = this.state.employees;
		const employeesList = employees.length ? (
			employees.map(employee => {
				return (
					<div key={employee.id}>
						<div className="employee-list">
							<table
								style={{
									width: "60%",
									tableLayout: "fixed",
									border: "1px",
									background: "white"
								}}
							>
								<tbody>
									<tr>
										<td style={{ width: "50px", textAlign: "center" }}>
											{employee.id}
										</td>
										<td style={{ width: "150px", textAlign: "center" }}>
											{employee.firstName}
										</td>
										<td style={{ width: "150px", textAlign: "center" }}>
											{employee.lastName}
										</td>
										<td style={{ width: "200px", textAlign: "center" }}>
											{employee.email}
										</td>
										<td>
											<button
												style={{
													background: "red",
													color: "white",
													width: "70px"
												}}
												className="btn btn-warning"
												onClick={e => {
													if (
														window.confirm(
															`Are you sure you wish to delete ${employee.firstName} ${employee.lastName} permanently?`
														)
													)
														this.handleDeleteEmployee(employee.id);
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				);
			})
		) : (
			<div>No Employees in database</div>
		);

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
			<div className="container adminPageContainer">
				<div className="row">
					<div className="col-md-12">
						<hr style={{ background: "white" }}></hr>
						<h1 className="welcomeAdminMessage">
							<b>Welcome to the Admin Panel {this.state.username}</b>
						</h1>

						<Button
							className="buttonsControlPanel"
							color="warning"
							style={{
								fontSize: "20px",
								color: "navy",
								border: "solid 1px navy",
								marginBottom: "15px",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
							onClick={this.handleLogOut}
						>
							Logout
						</Button>
						<Link to="/auth/employees_profile">
							<Button
								className="buttonsControlPanel"
								style={{
									fontSize: "20px",
									background: "rgb(0, 255, 255)",
									marginLeft: "15px",
									marginBottom: "15px",
									color: "black",
									textShadow:
										"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
								}}
							>
								Control Panel
							</Button>
						</Link>
						<Button
							className="buttonsControlPanelManageEmployees"
							style={{
								fontSize: "20px",
								background: "rgba(153, 204, 0)",
								marginBottom: "15px",
								color: "black",
								textShadow:
									"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"
							}}
							onClick={this.toggleEmployeeFormFunction}
						>
							Manage Employees <i className="fas fa-chevron-circle-down"></i>
						</Button>

						<Button
							className="buttonsControlPanelManageEmployees"
							style={{
								border: "1px solid white",
								fontSize: "20px",
								background: "rgb(0, 0, 153)",
								marginBottom: "15px",
								color: "white",
								textShadow:
									"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
							}}
							onClick={this.toggleAddClientForm}
						>
							Add Clients <i className="fas fa-chevron-circle-down"></i>
						</Button>

						{this.state.toggleEmployeeForm ? (
							<div
								className="container"
								style={{ background: "white", paddingTop: "20px" }}
							>
								<div className="row">
									<div className="col-md-5">
										<EmployeeSignupForm />
									</div>
									<div className="col-md-7">
										<h1 style={{ textAlign: "center", color: "navy" }}>
											List of Employees
										</h1>
										{employeesList}
									</div>
								</div>
							</div>
						) : null}

						{/* Toggle Add client form */}
						{this.state.toggleAddClientForm ? (
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
										<Form
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

											<p>* Fields required</p>
											<hr
												style={{ background: "grey", marginTop: "30px" }}
											></hr>
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
												<label htmlFor="phone">Primary Phone</label>
												<input
													className="form-control"
													type="text"
													id="primaryPhoneNumber"
													value={this.state.primaryPhoneNumber}
													onChange={this.handleChange}
												/>
											</div>
											<div className="input-field">
												<label htmlFor="cellphone">Cell</label>
												<input
													className="form-control"
													type="text"
													id="cellphone"
													value={this.state.cellphone}
													onChange={this.handleChange}
												/>
											</div>
											<div className="input-field">
												<label htmlFor="workPhone">Work Phone</label>
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
												>
													Add Client
												</button>
											</div>
										</Form>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
				<div className="row">
					<div
						className="col-md-12"
						style={{
							border: "1px solid white",
							background: "#161515",
							color: "white",
							marginBottom: "30px"
						}}
					></div>
					<div className="row">
						<div className="col-md-12">
							<div
								style={{
									background: "white",
									color: "black",
									border: "solid 1px blue",
									paddingTop: "12px",
									marginBottom: "100px"
								}}
							>
								<h2 style={{ textAlign: "center" }}>
									<b>Clients List</b>
								</h2>
								<hr style={{ background: "blue" }}></hr>
								<ReactTable
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminComp;
