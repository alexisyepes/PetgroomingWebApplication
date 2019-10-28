import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
// import axios from "axios";
import EmployeeSignupForm from "../../components/EmployeesForms/EmployeeSignup";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./style.css";

class AdminComp extends Component {
	_isMounted = false;

	state = {
		clients: [],
		employees: [],
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
				// const response = await axios.get("/auth/admin", {
				// 	headers: { Authorization: `JWT ${accessString}` }
				// });
				this.getAllEmployees();
				this.getAllClients();
				this.setState({
					// username: response.data.username,
					// email: response.data.email,
					// password: response.data.password,
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
		// this.getAllEmployees();
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

	//Modal Functions/////////////////////////////////

	onSubmitModal = e => {
		e.preventDefault();
		if (!this.state.clientSearch || isNaN(this.state.clientSearch)) {
			return;
		}

		this.getSingleClient(); //fix this function...Pending
		this.toggle();
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	toggle2 = () => {
		this.setState({
			modal2: !this.state.modal2
		});
	};

	toggle3 = () => {
		this.setState({
			modal3: !this.state.modal3
		});
	};

	onSubmitModal2 = e => {
		e.preventDefault();
		if (!this.state.clientSearch2) {
			return;
		}

		this.getSingleClientByName();
		this.toggle2();
	};

	onSubmitModal3 = e => {
		e.preventDefault();
		if (!this.state.clientSearch3) {
			return;
		}

		this.getSingleClientByPhone();
		this.toggle3();
	};

	onChangeModal = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	//End of Modal functions////////////////////////////////////

	//Client functions//////////////////////////////////////////

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

	getSingleClient = () => {
		//fix this function to search by ID...pending
		let clientSearchValue = this.state.clientSearch;

		API.getClient(clientSearchValue)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							clientSearch: res.data
						},
						() => console.log(this.state.clientSearch)
					);
				} else {
					this.setState({
						modal: false
					});
					alert("Client ID number does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	getSingleClientByName = () => {
		let clientSearchValue2 = this.state.clientSearch2;

		API.getClientByName(clientSearchValue2)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							clientSearch2: res.data
						},
						() => console.log(this.state.clientSearch2)
					);
				} else {
					this.setState({
						modal2: false
					});
					alert("Client name does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
	};

	getSingleClientByPhone = () => {
		let clientSearchValue3 = this.state.clientSearch3;

		API.getClientByPhone(clientSearchValue3)
			.then(res => {
				if (res.data) {
					this.setState(
						{
							clientSearch3: res.data
						},
						() => console.log(this.state.clientSearch3)
					);
				} else {
					this.setState({
						modal3: false
					});
					alert("Phone number does not exist, please try again");
				}
			})
			.catch(error => console.log(error));
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
				.then(res => this.getAllClients())
				.catch(err => console.log(err));
			// window.location.href = "/auth/admin";
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
			// .then(alert("New Client added to list!"))
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
	//Client functions end //////////////////////////////////////////

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
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<hr style={{ background: "white" }}></hr>
						<h1 className="welcomeAdminMessage">
							<b>Welcome to the Admin Panel</b>
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

						<hr style={{ background: "white" }}></hr>
					</div>
				</div>
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
		);
	}
}

export default AdminComp;
