import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EmployeeSigninForm from "../components/EmployeesForms/EmployeeSignin";
import axios from "axios";
import "./Signin.css";

class SignIn extends Component {
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
			[e.target.id]: e.target.value
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
				const response = await axios.post("/auth/login", {
					email,
					password
				});
				localStorage.setItem("JWT", response.data.token);
				// this.props.history.push("/auth/admin");
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
		if (this.state.loggedIn === true) {
			return <Redirect to={{ pathname: "/auth/admin" }} />;
		}

		return (
			<div className="container signinPage">
				<div className="row">
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
								<i className="fas fa-lock"></i> - Admin Sign In{" "}
							</h2>
							<hr style={{ background: "white" }}></hr>
							<div className="input-field">
								<label htmlFor="email">* Email</label>
								<input
									style={{ float: "right" }}
									type="email"
									id="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">* Password</label>
								<input
									style={{ float: "right", marginBottom: "15px" }}
									type="password"
									id="password"
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
					<EmployeeSigninForm />
				</div>
				<div class="push"></div>
			</div>
		);
	}
}

export default SignIn;
