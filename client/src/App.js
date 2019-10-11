import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import EmployeesProfile from "./pages/EmployeesProfile";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import EditClients from "./components/EditClients";
import EditEmployees from "./components/EditEmployees";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NoMatch from "./pages/NoMatch/index";
import Staff from "./pages/Staff";

// import "./cssReset.css";
import "./App.css";

class App extends Component {
	state = {
		sideDrawerOpen: false
	};

	drawerToggleClickHandler = () => {
		this.setState(prevState => {
			return { sideDrawerOpen: !prevState.sideDrawerOpen };
		});
	};

	backdropClickHandler = () => {
		this.setState({ sideDrawerOpen: false });
	};

	render() {
		let backdrop;

		if (this.state.sideDrawerOpen) {
			backdrop = <Backdrop click={this.backdropClickHandler} />;
		}
		return (
			<div>
				<Router>
					<div style={{ height: "100%" }}>
						<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
						<SideDrawer show={this.state.sideDrawerOpen} />
						{backdrop}
						<main style={{ marginTop: "64px" }}>
							<br></br>
						</main>
					</div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/auth/api/clients/:id" component={EditClients} />
						<Route exact path="/auth/employees/:id" component={EditEmployees} />
						<Route exact path="/about" component={About} />
						<Route exact path="/services" component={Services} />
						<Route exact path="/gallery" component={Gallery} />
						<Route exact path="/contact" component={Contact} />
						<Route exact path="/auth/admin" component={Staff} />
						<Route
							exact
							path="/auth/employees_profile"
							component={EmployeesProfile}
						/>
						<Route exact path="/auth/login" component={SignIn} />
						<Route exact path="/auth/signup" component={SignUp} />
						<Route exact path="/auth/logout" component={SignIn} />
						<Route component={NoMatch} />
					</Switch>
				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
