import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import axios from "axios";
import moment from "moment";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	Label,
	Button,
	Form,
	FormGroup,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	Table
} from "reactstrap";
import "./style.css";

class index extends Component {
	constructor(props) {
		super(props);

		this.deletePet = this.deletePet.bind(this);
		this.onSubmitPetForm = this.onSubmitPetForm.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.updatePet = this.updatePet.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			client: null,
			pets: null,
			PetId: null,
			commentId: null,
			allPets: null,
			isLoading: true,
			error: false,
			modalComments: false,
			modalForAddingPets: false,
			modalForEdittingPets: false,
			comments: [],
			date: "",
			commentToAdd: "",
			petName: null,
			breed: null,
			type: null,
			petNameToEdit: null,
			petBreedToEdit: null,
			petTypeToEdit: null,
			fullPetName: null,
			commentToEditComment: [],
			commentToEditDate: [],
			startDate: new Date(),
			clientSearchByPhone: null,
			clientSearchValuePhone: null,
			modalToSearchClientByPhone: false,
			modalToSeeFormAndEditComments: false
		};
	}

	getAllPets = () => {
		API.getPets()
			.then(res => {
				if (res.data.status === "error") {
					throw new Error(res.data.message);
				}
				this.setState({ allPets: res.data });
			})
			.catch(err => console.log(err));
	};

	async componentDidMount() {
		window.scrollTo(0, 0);
		let accessString = localStorage.getItem("JWT");
		if (accessString === null) {
			this.setState({
				isLoading: false,
				error: true
			});
		}
		let id = this.props.match.params.id;
		// console.log(this.props);
		await axios
			.get("/auth/api/clients/" + id, {
				headers: { Authorization: `JWT ${accessString}` }
			})
			.then(res => {
				this.setState({
					isLoading: false,
					error: false,
					client: res.data,
					pets: res.data.Pets
				});
				console.log(res.data);
			})
			.catch(error => console.log(error));
	}

	toggleModal = () => {
		this.setState({
			modalComments: !this.state.modalComments
		});
	};
	toggleModalToSearchClientByPhone = () => {
		this.setState({
			modalToSearchClientByPhone: !this.state.modalToSearchClientByPhone
		});
	};

	toggleModalForAddingPets = () => {
		this.setState({
			modalForAddingPets: !this.state.modalForAddingPets
		});
	};

	toggleModalForEdittingPets = () => {
		if (this.state.modalForEdittingPets) {
			this.setState({
				PetId: "",
				petNameToEdit: "",
				petBreedToEdit: "",
				petTypeToEdit: ""
			});
		}
		this.setState({
			modalForEdittingPets: !this.state.modalForEdittingPets
		});
	};

	toggleModalToSeeCommentsForm = () => {
		this.setState({
			modalToSeeFormAndEditComments: !this.state.modalToSeeFormAndEditComments
		});
	};

	getPetIdForUpdateFunc = ({ currentTarget }) => {
		this.toggleModalForEdittingPets();
		const id = currentTarget.value;
		API.getPet(id)
			.then(res => {
				this.setState({
					PetId: res.data.id,
					petNameToEdit: res.data.name,
					petBreedToEdit: res.data.breed,
					petTypeToEdit: res.data.type
				});
				console.log(res.data);
			})
			.catch(error => console.log(error));
	};

	getPetId = ({ currentTarget }) => {
		this.toggleModal();
		const id = currentTarget.value;
		API.getPet(id)
			.then(res => {
				this.setState({
					comments: res.data.Comments,
					PetId: res.data.id,
					fullPetName: res.data.name
				});
				console.log(res.data.name);
			})
			.catch(error => console.log(error));
	};

	handleChangeDate = date => {
		this.setState({
			startDate: date
		});
	};

	onChangeModal = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onChangeModalEdit = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onChangeCommentToEdit = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onChange(e) {
		this.setState({
			client: {
				...this.state.client,
				[e.target.name]: e.target.value
			}
		});
	}

	async onSubmit(e) {
		e.preventDefault();

		let obj = {
			id: this.state.client.id,
			lastName: this.state.client.lastName.replace(/^./, str =>
				str.toUpperCase()
			),
			firstName: this.state.client.firstName.replace(/^./, str =>
				str.toUpperCase()
			),
			primaryPhoneNumber: this.state.client.primaryPhoneNumber,
			cellphone: this.state.client.cellphone,
			workPhone: this.state.client.workPhone,
			email: this.state.client.email
		};

		let id = this.state.client.id;

		await API.updateClient(id, obj)

			.then(alert(`Client ${obj.firstName} ${obj.lastName} has been updated`))
			.then(res => console.log(res))
			.catch(error => console.log(error));

		// window.location.href = "/auth/admin";
		this.props.history.push("/auth/employees_profile");
	}

	//Add a Pet to Client
	async onSubmitPetForm(e) {
		e.preventDefault();

		let obj = {
			name: this.state.petName.replace(/^./, str => str.toUpperCase()),
			breed: this.state.breed.replace(/^./, str => str.toUpperCase()),
			type: this.state.type.replace(/^./, str => str.toUpperCase())
		};

		let ClientId = this.state.client.id;

		await API.addPet(ClientId, obj)

			.then(res => console.log(res))
			.catch(error => console.log(error));

		// window.location.href = "/auth/admin";
		window.location.href = "/auth/api/clients/" + ClientId;
	}

	handleAddCommentSubmit = e => {
		e.preventDefault();
		let petId = this.state.PetId;
		console.log(petId);
		let clientId = this.state.client.id;

		let commentObj = {
			date: this.state.date,
			comment: this.state.commentToAdd
		};

		if (!commentObj) {
			return;
		}

		API.addComment(petId, commentObj)
			.then(res => console.log(res))
			.catch(error => console.log(error));
		window.location.href = "/auth/api/clients/" + clientId;
	};

	async updatePet(e) {
		e.preventDefault();

		let petObj = {
			name: this.state.petNameToEdit.replace(/^./, str => str.toUpperCase()),
			breed: this.state.petBreedToEdit.replace(/^./, str => str.toUpperCase()),
			type: this.state.petTypeToEdit.replace(/^./, str => str.toUpperCase())
		};
		let ClientId = this.state.client.id;
		let id = this.state.PetId;
		await API.updatePet(id, petObj)
			.then(res => console.log(res))
			.catch(error => console.log(error));
		window.location.href = "/auth/api/clients/" + ClientId;
	}

	updateComment(e) {
		e.preventDefault();
		let commentObj = {
			date: this.state.commentToEditDate,
			comment: this.state.commentToEditComment
		};
		let ClientId = this.state.client.id;
		let id = this.state.commentId;

		console.log(commentObj);

		API.updateComment(id, commentObj)
			.then(res => console.log(res))
			.catch(error => console.log(error));
		window.location.href = "/auth/api/clients/" + ClientId;
	}

	deleteComment = ({ currentTarget }) => {
		let clientId = this.state.client.id;
		console.log("here");
		let id = currentTarget.value;
		if (
			window.confirm(
				`Are you sure you wish to delete this comment permanently?`
			)
		) {
			API.deleteComment(id)
				.then(res => console.log(res))
				.catch(err => console.log(err));
			window.location.href = "/auth/api/clients/" + clientId;
		}
	};

	async deletePet({ currentTarget }) {
		let clientId = this.state.client.id;
		let id = currentTarget.value;
		if (
			window.confirm(`Are you sure you wish to delete this Pet permanently?`)
		) {
			await API.deletePet(id)
				.then(res => console.log(res))
				.catch(err => console.log(err));
			window.location.href = "/auth/api/clients/" + clientId;
		}
	}

	openModalToEdditComment = ({ currentTarget }) => {
		this.toggleModalToSeeCommentsForm();
		if (this.state.modalToSeeFormAndEditComments) {
			this.setState({
				commentToEditDate: "",
				commentToEditComment: "",
				commentId: ""
			});
		}
		const id = currentTarget.value;
		API.getOneComment(id)
			.then(res => {
				this.setState({
					commentToEditDate: res.data.date,
					commentToEditComment: res.data.comment,
					commentId: res.data.id
				});
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

		if (this.state.client === null) return null;
		if (this.state.pets === null) return null;
		if (this.state.pets.Comments === null) return null;

		const comments = this.state.comments;
		const commentsList = comments.length ? (
			comments.map(comment => {
				return (
					<div key={comment.id} className="container">
						<div>
							<Table className="tableSearchResultsComments">
								<tbody>
									<tr>
										<td className="tableCellsCommentsDate">{comment.date}</td>

										<td className="tableCellsCommentsComment">
											{comment.comment}
										</td>

										<td className="tableCellsCommentsButtons">
											<Button
												className="updateComment-btnSubmit"
												value={comment.id}
												onClick={this.openModalToEdditComment}
											>
												Update
											</Button>
											<Button
												className="deleteComment-btnSubmit"
												width="15%"
												value={comment.id}
												onClick={this.deleteComment}
											>
												Delete
											</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>

						<div className="col-lg-10">
							<Modal
								className="modal-xl"
								isOpen={this.state.modalToSeeFormAndEditComments}
								toggle={this.toggleModalToSeeCommentsForm}
							>
								<ModalHeader toggle={this.toggleModalToSeeCommentsForm}>
									<div>
										<h4 className="petNameCommentsForm">
											Pet Name: " {this.state.fullPetName} "
										</h4>
									</div>
								</ModalHeader>
								<ModalBody>
									<div>
										<h3 className="notesHistoryTitle">Notes History</h3>
									</div>
									<Form
										className="addCommentForm"
										onSubmit={this.updateComment}
									>
										<FormGroup>
											<div className="row">
												<div className="col-md-3">
													<Label>Date Format: YYYY/MM/DD</Label>
													<Input
														onChange={this.onChangeCommentToEdit}
														type="text"
														id="commentToEditDate"
														defaultValue={comment.date}
													></Input>
												</div>
												<div className="col-md-9">
													<Label>Comments</Label>
													<Input
														placeholder="Enter Notes"
														onChange={this.onChangeCommentToEdit}
														type="text"
														id="commentToEditComment"
														defaultValue={comment.comment}
													></Input>
												</div>
											</div>
											<Button
												block
												value={comment.id}
												className="addCommentBtn"
												color="warning"
											>
												Update Comment
											</Button>
										</FormGroup>
									</Form>
								</ModalBody>
							</Modal>
						</div>

						<hr style={{ background: "black" }}></hr>
					</div>
				);
			})
		) : (
			<div>No comments for this pet yet</div>
		);

		const pets = this.state.pets;
		const petsList =
			pets.length > 0 ? (
				pets.map(pet => {
					return (
						<div key={pet.id}>
							<div className="card-body">
								<div className="card-body">
									<h2>Pet Info</h2>
									<h4>
										Pet Name:{" "}
										<span>
											<b>{pet.name}</b>
										</span>
									</h4>
									<h4>
										Breed:{" "}
										<span>
											<b>{pet.breed}</b>
										</span>
									</h4>
									<h4>
										Type:{" "}
										<span>
											<b>{pet.type}</b>
										</span>
									</h4>

									<Button
										value={pet.id}
										onClick={this.getPetId}
										className="petCommentBtn"
										color="warning"
									>
										Comments
									</Button>
									<Button
										className="petUpdateBtn"
										color="info"
										value={pet.id}
										onClick={this.getPetIdForUpdateFunc}
									>
										Update Pet
									</Button>
									<Button
										className="petDeleteBtn"
										color="danger"
										value={pet.id}
										onClick={this.deletePet}
									>
										Delete
									</Button>
								</div>
								<div className="col-lg-10">
									<Modal
										value={pet.id}
										className="modal-xl"
										isOpen={this.state.modalComments}
										toggle={this.toggleModal}
									>
										<ModalHeader toggle={this.toggleModal}>
											<div>
												<h4 className="petNameCommentsForm">
													Pet Name: " {this.state.fullPetName} "
												</h4>
											</div>
										</ModalHeader>
										<ModalBody>
											<div>
												<h3 className="notesHistoryTitle">Notes History</h3>
											</div>
											<div>{commentsList}</div>
											<Form
												className="addCommentForm"
												onSubmit={this.handleAddCommentSubmit}
											>
												<FormGroup>
													<h2 className="titleComments">Add a comment</h2>

													<div className="row">
														<div className="col-md-3">
															<Label>Date Format: YYYY/MM/DD</Label>
															<Input
																onChange={this.onChangeModal}
																type="text"
																name="date"
																defaultValue={
																	moment(new Date()).format("YYYY/MM") + "/day"
																}
															></Input>
														</div>
														<div className="col-md-9">
															<Label>Comments</Label>
															<Input
																placeholder="Enter Notes"
																onChange={this.onChangeModal}
																type="text"
																name="commentToAdd"
																value={this.state.commentToAdd}
															></Input>
														</div>
													</div>
													<Button
														block
														value={pet.id}
														className="addCommentBtn"
														color="warning"
													>
														Add Comment
													</Button>
												</FormGroup>
											</Form>
										</ModalBody>
									</Modal>
								</div>
								{/* Modal for editting pets */}
								<div>
									<Modal
										className="col-sm-6"
										isOpen={this.state.modalForEdittingPets}
										toggle={this.toggleModalForEdittingPets}
									>
										<ModalHeader toggle={this.toggleModalForEdittingPets}>
											<div>
												<h4>Client Number: {this.state.client.id}</h4>
											</div>
										</ModalHeader>
										<ModalBody>
											<Form onSubmit={this.updatePet}>
												<FormGroup>
													<h2 className="titleComments">Edit Pet</h2>
													<Label>Name</Label>
													<Input
														id="petNameToEdit"
														onChange={this.onChangeModalEdit}
														type="text"
														name="petName"
														defaultValue={this.state.petNameToEdit}
													></Input>
													<Label>Breed</Label>
													<Input
														id="petBreedToEdit"
														onChange={this.onChangeModalEdit}
														type="text"
														name="breed"
														defaultValue={this.state.petBreedToEdit}
													></Input>
													<Label>Type</Label>
													<Input
														id="petTypeToEdit"
														onChange={this.onChangeModalEdit}
														type="text"
														name="type"
														defaultValue={this.state.petTypeToEdit}
													></Input>
													<Button
														value={pet.id}
														className="petEditBtn"
														color="warning"
													>
														Submit Changes
													</Button>
												</FormGroup>
											</Form>
										</ModalBody>
									</Modal>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="col">
					<h2 className="noPetsYetTitle">No Pets for this client yet</h2>
					<Button
						className="petAddBtn"
						onClick={this.toggleModalForAddingPets}
						color="warning"
					>
						ADD PETS
					</Button>{" "}
				</div>
			);

		const client = this.state.client ? (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div
							className="client"
							style={{
								marginBottom: "100px",
								background: "rgba(255,255,255,0.5)",
								border: "1px solid navy"
							}}
						>
							<Form onSubmit={this.onSubmit} style={{ padding: "50px" }}>
								<Button className="goBackToControlPanelBtn">
									<Link
										className="goBackToControlPanelLink"
										to={"/auth/employees_profile"}
									>
										<i className="fas fa-arrow-alt-circle-left"></i> Back to
										Control Panel
									</Link>
								</Button>
								<h3
									className="updateClientTitleForm"
									style={{ paddingTop: "10px", textAlign: "center" }}
								>
									<b>Update Client Number: {this.state.client.id}</b>
								</h3>
								<p>* Fields required</p>
								<hr></hr>
								<FormGroup>
									<div className="form-group">
										<Label>* Last Name: </Label>
										<Input
											type="text"
											name="lastName"
											className="form-control"
											defaultValue={this.state.client.lastName}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<Label>* First Name: </Label>
										<Input
											type="text"
											name="firstName"
											className="form-control"
											defaultValue={this.state.client.firstName}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<Label>* Primary Phone: </Label>
										<Input
											type="text"
											name="primaryPhoneNumber"
											className="form-control"
											defaultValue={this.state.client.primaryPhoneNumber}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<Label>Cell: </Label>
										<Input
											type="text"
											name="cellphone"
											className="form-control"
											defaultValue={this.state.client.cellphone}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<Label>Work Phone: </Label>
										<Input
											type="text"
											name="workPhone"
											className="form-control"
											defaultValue={this.state.client.workPhone}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group">
										<Label>Email: </Label>
										<Input
											type="email"
											name="email"
											className="emailInptClientForm"
											defaultValue={this.state.client.email}
											onChange={this.onChange}
										/>
									</div>

									<br />
									<div className="form-group">
										<input
											style={{
												fontSize: "25px",
												background: "navy",
												border: "2px solid white"
											}}
											type="submit"
											value="Submit Changes"
											className="btn btn-primary"
										/>
										<Button
											className="petAddBtn"
											onClick={this.toggleModalForAddingPets}
											color="warning"
										>
											ADD PETS
										</Button>
									</div>
								</FormGroup>
							</Form>
						</div>
					</div>

					<div className="col-md-6">
						<h1 className="petsListTitle">Pets List</h1>
						{petsList}
					</div>

					<div className="col-sm-6">
						<Modal
							isOpen={this.state.modalForAddingPets}
							toggle={this.toggleModalForAddingPets}
						>
							<ModalHeader toggle={this.toggleModalForAddingPets}>
								<div>
									<h4>Add a Pet</h4>
								</div>
							</ModalHeader>
							<ModalBody>
								<Form>
									<FormGroup>
										<h2 className="titlePets">Add Pet information</h2>

										<Label>Name</Label>
										<Input
											onChange={this.onChangeModal}
											type="text"
											name="petName"
											defaultValue={this.state.petName}
										></Input>
										<Label defaultValue="">Breed</Label>
										<Input
											onChange={this.onChangeModal}
											type="text"
											name="breed"
											defaultValue={this.state.breed}
										></Input>
										<Label>Type</Label>
										<Input
											onChange={this.onChangeModal}
											type="text"
											name="type"
											defaultValue={this.state.type}
										></Input>
										<Button
											onClick={this.onSubmitPetForm}
											className="petUpdateBtn"
											color="warning"
											// onClick={this.handleEditCommentSubmit}
										>
											Add Pet
										</Button>
									</FormGroup>
								</Form>
							</ModalBody>
						</Modal>
					</div>
				</div>
			</div>
		) : (
			<div
				className="center"
				style={{
					marginLeft: "10%",
					fontSize: "30px",
					height: "100vh"
				}}
			>
				...Loading Client
			</div>
		);

		return <div className="container">{client}</div>;
	}
}

export default index;
