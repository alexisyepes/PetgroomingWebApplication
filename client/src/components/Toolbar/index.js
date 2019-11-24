import React, { Component } from "react";
import "../SideDrawer/DrawerToggleButton";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./style.css";

class toolbar extends Component {
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
		const authorized = this.state.authorized;

		if (!authorized) {
			return (
				<header className="toolbar">
					<nav className="toolbar__navigation">
						<div />
						<div className="toolbar__toggle-button">
							<DrawerToggleButton click={this.props.drawerClickHandler} />
						</div>
						<div className="toolbar__logo">
							<a href="/">
								<i className="fas fa-home homeIcon"></i> Amazing Pet Grooming{" "}
								<i className="fas fa-paw pawIconToolBar"></i>
							</a>
						</div>
						<div className="spacer" />
						<div className="toolbar_navigation-items">
							<ul>
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
						</div>
					</nav>
				</header>
			);
		} else {
			return (
				<header className="toolbar">
					<nav className="toolbar__navigation">
						<div />
						<div className="toolbar__toggle-button">
							<DrawerToggleButton click={this.props.drawerClickHandler} />
						</div>
						<div className="toolbar__logo">
							<a href="/">
								<i className="fas fa-home homeIcon"></i> Amazing Pet Grooming{" "}
								<i className="fas fa-paw pawIconToolBar"></i>
							</a>
						</div>
						<div className="spacer" />
						<div className="toolbar_navigation-items">
							<ul>
								<li className="usernameLoggedinHome">
									Logged in as {this.state.employeeUsername}
								</li>
								<button className="logoutBtnNavBar" onClick={this.handleLogOut}>
									Logout
								</button>
								<li>
									<a
										className="controlPanelNavbar"
										href="/auth/employees_profile"
									>
										Staff Control Panel
									</a>
								</li>
								<li>
									{this.state.isAdmin === "admin" ? (
										<button className="adminPanelBtnNavbar">
											<a className="adminBtnNavbar" href="/auth/admin">
												Admin Panel
											</a>
										</button>
									) : (
										<div></div>
									)}
								</li>
							</ul>
						</div>
					</nav>
				</header>
			);
		}
	}
}

export default toolbar;
