import React, { Component } from 'react';
import API from '../utils/API';
import { Link } from 'react-router-dom';


class SignUp extends Component {
    state = {
        username: '',
        email: '',
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
       
        if (!this.state.username || !this.state.email || !this.state.password || !this.state.password2 || !this.state.jobType
        ) {
            return;
        }
        if (this.state.password !== this.state.password2) {
            console.log("Passwords don't match!")
            return
        } else if (this.state.password.length < 6) {
            alert("Password must be at least 6 characters long!")
            return
        }

        API.addUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            jobType: this.state.jobType,
            
        })
            // .then(alert("You can login now!"))
            // .then(this.setState({ username: "", email: "", password: "", password2: "", jobType: "" }))
            .then(res => console.log(res))
            .catch(error => console.log(error));
        window.location.href = "/auth/login";

    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 bg-dark" style={{ border: '1px solid white', color: 'white', marginBottom: "30px" }}>

                        <Link style={{ fontSize: "25px", color: "white" }} to={'/admin'}><button style={{ marginLeft: "50%", background: "#0F2027", color: "white" }}><i className="fas fa-arrow-alt-circle-left"></i> Admin Panel </button></Link>

                        <form className="white" onSubmit={this.handleSubmit.bind(this)} style={{ marginBottom: "50px" }}>
                            <h2 className="grey-text text-darken-3" style={{ textAlign: "center", marginTop: "15px" }}>Add a new Admin</h2>
                            <hr style={{ background: "white" }}></hr>
                            <div className="input-field">
                                <label htmlFor="username">* Username</label>
                                <input className="form-control" style={{ float: "right" }} type="text" id='username' value={this.state.username} onChange={this.handleChange} />
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
                                <label htmlFor="job">* Job Type</label>
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

export default SignUp;
