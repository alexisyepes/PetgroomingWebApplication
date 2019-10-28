// import React, { Component } from "react";
// import { Button } from "reactstrap";
// import API from "../../utils/API";
// import "./style.css";

// class index extends Component {
// 	state = {
// 		tuesday: [],
// 		wednesday: [],
// 		thursday: [],
// 		friday: [],
// 		saturday: []
// 	};

// 	componentDidMount() {
// 		this.getWaitListSaturdayAllEvents();
// 		this.getWaitListFridayAllEvents();
// 		this.getWaitListThursdayAllEvents();
// 		this.getWaitListWednesdayAllEvents();
// 		this.getWaitListTuesdayAllEvents();
// 	}

// 	handleChange = e => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		});
// 	};

// 	//Tuesday Wait List
// 	getWaitListTuesdayAllEvents = () => {
// 		API.getWaitListTuesdayAll()
// 			.then(res => {
// 				if (res.data.status === "error") {
// 					throw new Error(res.data.message);
// 				}
// 				this.setState({ tuesday: res.data });
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	handleFormSubmitWaitListTuesday = e => {
// 		e.preventDefault();
// 		if (!this.state.tuesday) {
// 			return;
// 		}
// 		API.addWaitListTuesday({
// 			waitListDetails: this.state.tuesday
// 		})
// 			.then(
// 				this.setState({
// 					tuesday: ""
// 				})
// 			)
// 			.then(res => this.getWaitListTuesdayAllEvents())
// 			.catch(err => console.log(err));
// 	};

// 	//Wednesday Wait List
// 	getWaitListWednesdayAllEvents = () => {
// 		API.getWaitListWednesdayAll()
// 			.then(res => {
// 				if (res.data.status === "error") {
// 					throw new Error(res.data.message);
// 				}
// 				this.setState({ wednesday: res.data });
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	handleFormSubmitWaitListWednesday = e => {
// 		e.preventDefault();
// 		if (!this.state.wednesday) {
// 			return;
// 		}
// 		API.addWaitListWednesday({
// 			waitListDetails: this.state.wednesday
// 		})
// 			.then(res => console.log(res))
// 			.then(
// 				this.setState({
// 					wednesday: ""
// 				})
// 			)
// 			.then(res => this.getWaitListWednesdayAllEvents())
// 			.catch(err => console.log(err));
// 	};

// 	//Thursday Wait List
// 	getWaitListThursdayAllEvents = () => {
// 		API.getWaitListThursdayAll()
// 			.then(res => {
// 				if (res.data.status === "error") {
// 					throw new Error(res.data.message);
// 				}
// 				this.setState({ thursday: res.data });
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	handleFormSubmitWaitListThursday = e => {
// 		e.preventDefault();
// 		if (!this.state.thursday) {
// 			return;
// 		}
// 		API.addWaitListThursday({
// 			waitListDetails: this.state.thursday
// 		})
// 			.then(
// 				this.setState({
// 					thursday: ""
// 				})
// 			)
// 			.then(res => this.getWaitListThursdayAllEvents())
// 			.catch(err => console.log(err));
// 	};

// 	//Friday Wait List
// 	getWaitListFridayAllEvents = () => {
// 		API.getWaitListFridayAll()
// 			.then(res => {
// 				if (res.data.status === "error") {
// 					throw new Error(res.data.message);
// 				}
// 				this.setState({ friday: res.data });
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	handleFormSubmitWaitListFriday = e => {
// 		e.preventDefault();
// 		if (!this.state.friday) {
// 			return;
// 		}
// 		API.addWaitListFriday({
// 			waitListDetails: this.state.friday
// 		})
// 			.then(
// 				this.setState({
// 					friday: ""
// 				})
// 			)
// 			.then(res => this.getWaitListFridayAllEvents())
// 			.catch(err => console.log(err));
// 	};

// 	//Saturday Wait List
// 	getWaitListSaturdayAllEvents = () => {
// 		API.getWaitListSaturdayAll()
// 			.then(res => {
// 				if (res.data.status === "error") {
// 					throw new Error(res.data.message);
// 				}
// 				this.setState({ saturday: res.data });
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	handleFormSubmitWaitListSaturday = e => {
// 		e.preventDefault();
// 		if (!this.state.saturday) {
// 			return;
// 		}
// 		API.addWaitListSaturday({
// 			waitListDetails: this.state.saturday
// 		})
// 			.then(
// 				this.setState({
// 					saturday: ""
// 				})
// 			)
// 			.then(res => this.getWaitListSaturdayAllEvents())
// 			.catch(err => console.log(err));
// 	};

// 	render() {
// 		const tuesday = this.state.tuesday;
// 		const tuesdayList = tuesday.length ? (
// 			tuesday.map(tuesday => {
// 				return (
// 					<div key={tuesday.id}>
// 						<div>
// 							<ul>
// 								<li>{tuesday.waitListDetails}</li>
// 							</ul>
// 						</div>
// 					</div>
// 				);
// 			})
// 		) : (
// 			<div>No events on waiting list</div>
// 		);

// 		const wednesday = this.state.wednesday;
// 		const wednesdayList = wednesday.length ? (
// 			wednesday.map(wednesday => {
// 				return (
// 					<div key={wednesday.id}>
// 						<div>
// 							<ul>
// 								<li>{wednesday.waitListDetails}</li>
// 							</ul>
// 						</div>
// 					</div>
// 				);
// 			})
// 		) : (
// 			<div>No events on waiting list</div>
// 		);

// 		const thursday = this.state.thursday;
// 		const thursdayList = thursday.length ? (
// 			thursday.map(thursday => {
// 				return (
// 					<div key={thursday.id}>
// 						<div>
// 							<ul>
// 								<li>{thursday.waitListDetails}</li>
// 							</ul>
// 						</div>
// 					</div>
// 				);
// 			})
// 		) : (
// 			<div>No events on waiting list</div>
// 		);

// 		const friday = this.state.friday;
// 		const fridayList = friday.length ? (
// 			friday.map(friday => {
// 				return (
// 					<div key={friday.id}>
// 						<div>
// 							<ul>
// 								<li>{friday.waitListDetails}</li>
// 							</ul>
// 						</div>
// 					</div>
// 				);
// 			})
// 		) : (
// 			<div>No events on waiting list</div>
// 		);

// 		const saturday = this.state.saturday;
// 		const saturdayList = saturday.length ? (
// 			saturday.map(saturday => {
// 				return (
// 					<div key={saturday.id}>
// 						<div>
// 							<ul>
// 								<li>{saturday.waitListDetails}</li>
// 							</ul>
// 						</div>
// 					</div>
// 				);
// 			})
// 		) : (
// 			<div>No events on waiting list</div>
// 		);

// 		// const wednesday = this.state.wednesday;
// 		// const thursday = this.state.thursday;
// 		// const friday = this.state.friday;
// 		// const saturday = this.state.saturday;

// 		return (
// 			// <div className="container">
// 			<div className="row">
// 				<div className="col-md-12">
// 					<div style={{ padding: "25px" }} className="waitingListContainer">
// 						<hr style={{ background: "black" }}></hr>
// 						<h1 className="waitingListTitle">Add Details to Wait List</h1>
// 						<div>
// 							<form
// 								className="form-group"
// 								onSubmit={this.handleFormSubmitWaitListSaturday}
// 								style={{ marginBottom: "50px" }}
// 							>
// 								<div className="input-field">
// 									<label htmlFor="saturday">Appointment Details:</label>
// 									<input
// 										placeholder="Enter appointment for Wait List here and select the day below"
// 										style={{ margin: "0px 15px 15px 0px " }}
// 										className="form-control"
// 										type="text"
// 										id="saturday"
// 										defaultValue=""
// 										onChange={this.handleChange}
// 									/>
// 								</div>

// 								<Button
// 									className="weekDaysButtons"
// 									color="dark"
// 									onClick={this.handleFormSubmitWaitListTuesday}
// 								>
// 									Tuesday
// 								</Button>
// 								<Button
// 									className="weekDaysButtons"
// 									color="dark"
// 									onClick={this.handleFormSubmitWaitListWednesday}
// 								>
// 									Wednesday
// 								</Button>
// 								<Button
// 									className="weekDaysButtons"
// 									color="dark"
// 									onClick={this.handleFormSubmitWaitListThusrday}
// 								>
// 									Thursday
// 								</Button>
// 								<Button
// 									className="weekDaysButtons"
// 									color="info"
// 									onClick={this.handleFormSubmitWaitListFriday}
// 								>
// 									Friday
// 								</Button>
// 								<Button
// 									className="weekDaysButtons"
// 									color="info"
// 									onClick={this.handleFormSubmitWaitListSaturday}
// 								>
// 									Saturday
// 								</Button>
// 								{/* <Button className="weekDaysButtons" color="dark">
// 									Sunday
// 								</Button> */}
// 							</form>
// 							<hr style={{ background: "black" }}></hr>
// 						</div>
// 						<h1 className="waitingListTitle">Current Wait List</h1>
// 						<ul>
// 							<h3>Tuesday</h3>
// 							<li>{tuesdayList}</li>
// 						</ul>
// 						<ul>
// 							<h3>Wednesday</h3>
// 							<li>{wednesdayList}</li>
// 						</ul>
// 						<ul>
// 							<h3>Thursday</h3>
// 							<li>{thursdayList}</li>
// 						</ul>
// 						<ul>
// 							<h3>Friday</h3>
// 							<li>{fridayList}</li>
// 						</ul>
// 						<ul>
// 							<h3>Saturday</h3>
// 							<li>{saturdayList}</li>
// 						</ul>

// 						{/* <ReactTable
// 							style={{
// 								border: "1px solid white",
// 								background: "white",
// 								marginBottom: "110px"
// 							}}
// 							columns={columns}
// 							data={tuesday}
// 							defaultPageSize={8}
// 							noDataText={"No clients on the waiting List"}
// 						></ReactTable> */}
// 					</div>
// 				</div>
// 			</div>
// 			// </div>
// 		);
// 	}
// }

// export default index;
