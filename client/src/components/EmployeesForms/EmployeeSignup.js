import React, { Component } from 'react';
import API from '../../utils/API';

class EmployeeSignUpForm extends Component {
    state = {
        empFirstName: '',
        empLastName: '',
        password: '',
        password2: '',
        jobType: '',
        errorMsg: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.empFirstName || !this.state.empLastName || !this.state.email || !this.state.password || !this.state.password2
        ) {
            return;
        }
        if (this.state.password !== this.state.password2) {
            console.log("Passwords don't match!!!")
            return
        } else if (this.state.password.length < 6) {
            alert("Password must be at least 6 characters long!")
            return
        }

        API.addEmployee({
            firstName: this.state.empFirstName,
            lastName: this.state.empLastName,
            email: this.state.email,
            password: this.state.password,
            jobType: this.state.jobType
        })
            // .then(alert("Your employee can login now!"))
            .then(this.setState({ firstName: "", lastName: "", email: "", password: "", password2: "", jobType: "" }))
            .then(res => console.log(res))
            .catch(error => console.log(error));
            window.location.href = "/auth/admin";

    };
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{ border: '1px solid white', background: "#161515", color: 'white', marginBottom: "30px" }}>

                        <form className="white" onSubmit={this.handleSubmit.bind(this)} style={{ marginBottom: "50px" }}>
                            <h2 className="grey-text text-darken-3" style={{ textAlign: "center", marginTop: "15px" }}>Add a new employee</h2>
                            <hr style={{ background: "white" }}></hr>
                            <div className="input-field">
                                <label htmlFor="employeeFirstName">* First Name</label>
                                <input className="form-control" style={{ float: "right" }} type="text" id='empFirstName' value={this.state.empFirstName} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="lastName">* Last Name</label>
                                <input className="form-control" style={{ float: "right" }} type="text" id='empLastName' value={this.state.empLastName} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email">* Email</label>
                                <input className="form-control" style={{ float: "right" }} type="email" id='email' value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">* Password</label>
                                <input className="form-control" style={{ float: "right", marginBottom: "15px" }} type="password" id='password' value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">* Confirm Password</label>
                                <input className="form-control" style={{ float: "right", marginBottom: "15px" }} type="password" id='password2' value={this.state.password2} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="jobType">* Job Type (groomer, bather)</label>
                                <input className="form-control" style={{ float: "right", marginBottom: "15px" }} type="text" id='jobType' value={this.state.jobType} onChange={this.handleChange} />
                            </div>
                            <div className="" >
                                <button style={{ marginTop: "15px" }} className="btn-primary btn-block"
                                >Create Account for employee</button>
                            </div>
                        </form>
                        {/* <div>{clientInfoSearched}</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeSignUpForm;