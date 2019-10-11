import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import axios from 'axios';


class index extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            client: null,
            isLoading: true,
            error: false
        }
    }

    async componentDidMount() {
        let accessString = localStorage.getItem('JWT');
        if (accessString === null) {
            this.setState({
                isLoading: false,
                error: true
            });
        }
        let id = this.props.match.params.id
        await axios
            .get('/auth/api/clients/' + id, {
                headers: { Authorization: `JWT ${accessString}` }
            })
            .then(res => {
                this.setState({
                    isLoading: false,
                    error: false,
                    client: res.data
                })
            })
            .catch(error => console.log(error))
    }


    onChange(e) {
        this.setState({
            client: {
                ...this.state.client,
                [e.target.name]: e.target.value
            }
        });
    }


    onSubmit(e) {
        e.preventDefault();

        let obj = {
            id: this.state.client.id,
            lastName: this.state.client.lastName.toLowerCase(),
            firstName: this.state.client.firstName.toLowerCase(),
            phone: this.state.client.phone.toLowerCase(),
            petName: this.state.client.petName.toLowerCase(),
            breed: this.state.client.breed.toLowerCase(),
            notes: this.state.client.notes.toLowerCase()
        };

        let id = this.state.client.id

        API.updateClient(id, obj)

            .then(alert(`Client ${obj.firstName} ${obj.lastName} has been updated`))
            .then(res => console.log(res))
            .catch(error => console.log(error))

        // window.location.href = "/auth/admin";
        this.props.history.push('/auth/employees_profile');
    }

    render() {

        const client = this.state.client ? (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="client" style={{ marginBottom: "100px", background: "rgba(255,255,255,0.5)", border: "1px solid navy" }}>

                            <form onSubmit={this.onSubmit} style={{ padding: "50px" }}>
                                <h3 style={{ paddingTop: "10px", textAlign: "center" }}><b>Update Client</b></h3>
                                <button style={{ marginLeft: "50%", background: "#0F2027", color: "white" }}>
                                    <Link style={{ fontSize: "25px", color: "white" }} to={'/auth/employees_profile'}><i className="fas fa-arrow-alt-circle-left"></i> Back</Link>
                                </button>
                                <p style={{ marginLeft: "0px" }}>* Fields required</p>
                                <hr></hr>
                                <div className="form-group">
                                    <label>* Last Name: </label>
                                    <input type="text"
                                        name="lastName"
                                        className="form-control"
                                        defaultValue={this.state.client.lastName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* First Name: </label>
                                    <input type="text"
                                        name="firstName"
                                        className="form-control"
                                        defaultValue={this.state.client.firstName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Phone: </label>
                                    <input type="text"
                                        name="phone"
                                        className="form-control"
                                        defaultValue={this.state.client.phone}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Pet Name: </label>
                                    <input type="text"
                                        name="petName"
                                        className="form-control"
                                        defaultValue={this.state.client.petName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Breed: </label>
                                    <input type="text"
                                        name="breed"
                                        className="form-control"
                                        defaultValue={this.state.client.breed}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Notes: </label>
                                    <input type="text"
                                        name="notes"
                                        className="form-control"
                                        defaultValue={this.state.client.notes}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <br />
                                <div className="form-group">
                                    <input style={{ fontSize: "25px", background: "navy", border: "2px solid white" }} type="submit" value="Update Client"
                                        className="btn btn-primary" />
                                    <button style={{ marginLeft: "30px", background: "#0F2027", color: "white" }}>
                                        <Link style={{ fontSize: "25px", color: "white" }} to={'/auth/employees_profile'}><i className="fas fa-arrow-alt-circle-left"></i> Back</Link>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
                <div className="center">Loading Client</div>
            )

        return (


            <div className="container">
                {client}
            </div>
        )
    }
}

export default index;