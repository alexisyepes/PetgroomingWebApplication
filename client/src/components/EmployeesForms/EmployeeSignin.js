import React, { Component } from "react";
import axios from "axios";
import "./Signin.css";

class EmployeeSigninForm extends Component {
	state = {
		email: "",
		password: "",
		errorMessage: "",
		loggedIn: false,
		showError: false,
		showNullError: false
	};

	handleChange = e => {
		this.setState({
			[e.target.className]: e.target.value
		});
	};
	handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = this.state;
		if (email === "" || password === "") {
			this.setState({
				showError: false,
				showNullError: true,
				loggedIn: false
			});
		} else {
			try {
				const response = await axios.post("/auth/employees/login", {
					email,
					password
				});
				localStorage.setItem("JWT", response.data.token);
				localStorage.setItem("USERNAME", response.data.employeeInfo.firstName);
				// console.log(response);
				// this.props.history.push("/auth/employees_profile");
				window.location.href = "/auth/employees_profile";

				this.setState({
					loggedIn: true,
					showError: false,
					showNullError: false
				});
			} catch (error) {
				console.error(error.response);
				this.setState({
					errorMessage: error.response.data.message
				});
				// console.log(error)
			}
		}
	};

	render() {
		return (
			<div
				className="col-md-6"
				style={{
					border: "1px solid white",
					background: "black",
					opacity: "0.9",
					color: "white",
					marginBottom: "30px"
				}}
			>
				<form
					className="white"
					onSubmit={this.handleSubmit.bind(this)}
					style={{ marginBottom: "50px" }}
				>
					<img
						alt="logo"
						src="/images/logo_300.png"
						className="center"
						style={{
							width: "30%",
							marginTop: "7px",
							marginLeft: "35%",
							marginRight: "35%"
						}}
					></img>
					<h2
						className="grey-text text-darken-3"
						style={{ textAlign: "center", marginTop: "15px" }}
					>
						<i className="fas fa-lock"></i> - Employees Sign In{" "}
					</h2>
					<hr style={{ background: "white" }}></hr>
					<div className="input-field">
						<label htmlFor="empEmail">* Email</label>
						<input
							className="email"
							type="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="empPassword">* Password</label>
						<input
							className="password"
							type="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
					<div className="">
						<button
							style={{ marginTop: "15px" }}
							className="btn-primary btn-block"
						>
							Login
						</button>
					</div>
				</form>
				<h4
					style={{
						textAlign: "center",
						color: "yellow",
						paddingBottom: "10px"
					}}
				>
					{this.state.errorMessage}
				</h4>
			</div>
		);
	}
}

export default EmployeeSigninForm;
