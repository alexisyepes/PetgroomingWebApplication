import React, { Component } from "react";
import "./SideDrawer.css";

class sideDrawer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employeeUsername: "",
			authorized: false,
			isAdmin: ""
		};
	}
	async componentDidMount() {
		window.scrollTo(0, 0);
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			this.setState({
				authorized: false,
				employeeUsername: ""
			});
		} else {
			try {
				const employeeUsername = localStorage.getItem("USERNAME");
				const isAdmin = localStorage.getItem("JOBTYPE");
				this.setState({
					isAdmin,
					employeeUsername,
					authorized: true
				});
				// console.log(this.state.employeeUsername);
			} catch (error) {
				console.error(error);
			}
		}
	}

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		localStorage.removeItem("USERNAME");
		localStorage.removeItem("JOBTYPE");

		window.location.href = "/";
	}

	render() {
		let drawerClasses = ["side-drawer"];
		if (this.props.show) {
			drawerClasses = "side-drawer open";
		}
		const authorized = this.state.authorized;

		if (!authorized) {
			return (
				<nav className={drawerClasses}>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About Us</a>
						</li>
						<li>
							<a href="/services">Services</a>
						</li>
						<li>
							<a href="/gallery">Gallery</a>
						</li>
						<li>
							<a href="/contact">Contact</a>
						</li>
						<li>
							<a href="/auth/login">Admin</a>
						</li>
					</ul>
				</nav>
			);
		} else {
			return (
				<nav className={drawerClasses}>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/contact">Contact</a>
						</li>
						<li className="usernameLoggedinHomeSidebar">
							Logged in as {this.state.employeeUsername}
						</li>
						<li>
							<a className="controlPanelSidebar" href="/auth/employees_profile">
								Staff Control Panel
							</a>
						</li>
						<li>
							{this.state.isAdmin === "admin" ? (
								<button className="adminPanelBtnSidebar">
									<a className="adminBtnSidebar" href="/auth/admin">
										Admin Panel
									</a>
								</button>
							) : (
								<div></div>
							)}
						</li>
						<button className="logoutBtnSidebar" onClick={this.handleLogOut}>
							Logout
						</button>
					</ul>
				</nav>
			);
		}
	}
}

export default sideDrawer;
