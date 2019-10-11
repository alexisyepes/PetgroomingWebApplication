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
            employee: null,
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
            .get('/auth/employees/' + id, {
                headers: { Authorization: `JWT ${accessString}` }
            })
            .then(res => {
                this.setState({
                    isLoading: false,
                    error: false,
                    employee: res.data
                })
            })
            .catch(error => console.log(error))
    }


    onChange(e) {
        this.setState({
            employee: {
                ...this.state.employee,
                [e.target.name]: e.target.value
            }
        });
    }


    onSubmit(e) {
        e.preventDefault();

        let obj = {
            id: this.state.employee.id,
            firstName: this.state.employee.firstName.toLowerCase(),
            lastName: this.state.employee.lastName.toLowerCase(),
            email: this.state.employee.email.toLowerCase(),
            password: this.state.employee.password,
            jobType: this.state.employee.jobType.toLowerCase()
        };

        let id = this.state.employee.id

        API.updateEmployee(id, obj)

            .then(alert(`Employee ${obj.firstName} ${obj.lastName} has been updated`))
            .then(res => console.log(res))
            .catch(error => console.log(error))

        window.location.href = "/auth/admin";
        // this.props.history.push('/admin');
    }

    render() {

        const employee = this.state.employee ? (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="employee" style={{ marginBottom: "100px", background: "rgba(255,255,255,0.5)", border: "1px solid navy" }}>

                            <form onSubmit={this.onSubmit} style={{ padding: "50px" }}>
                                <h3 style={{ paddingTop: "10px", textAlign: "center" }}><b>Update Employee</b></h3>
                                <button style={{ marginLeft: "50%", background: "#0F2027", color: "white" }}>
                                    <Link style={{ fontSize: "25px", color: "white" }} to={'/auth/admin'}><i className="fas fa-arrow-alt-circle-left"></i> Admin Panel</Link>
                                </button>
                                <p style={{ marginLeft: "0px" }}>* Fields required</p>
                                <hr></hr>
                                <div className="form-group">
                                    <label>* First Name: </label>
                                    <input type="text"
                                        name="firstName"
                                        className="form-control"
                                        defaultValue={this.state.employee.firstName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Last Name: </label>
                                    <input type="text"
                                        name="lastName"
                                        className="form-control"
                                        defaultValue={this.state.employee.lastName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Email: </label>
                                    <input type="email"
                                        name="email"
                                        className="form-control"
                                        defaultValue={this.state.employee.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Password: </label>
                                    <input type="text"
                                        name="password"
                                        className="form-control"
                                        defaultValue={this.state.employee.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>* Job Type (Bather, Groomer, Other): </label>
                                    <input type="text"
                                        name="jobType"
                                        className="form-control"
                                        defaultValue={this.state.employee.jobType}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <br />
                                <div className="form-group">
                                    <input style={{ fontSize: "25px", background: "navy", border: "2px solid white" }} type="submit" value="Update Employee"
                                        className="btn btn-primary" />
                                    <button style={{ marginLeft: "30px", background: "#0F2027", color: "white" }}>
                                        <Link style={{ fontSize: "25px", color: "white" }} to={'/auth/admin'}><i className="fas fa-arrow-alt-circle-left"></i> Admin Panel</Link>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
                <div className="center">Loading Employee</div>
            )

        return (


            <div className="container">
                {employee}
            </div>
        )
    }
}

export default index;