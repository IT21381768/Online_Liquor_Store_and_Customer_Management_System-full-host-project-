import React, { Component } from 'react';
import './form.css';
import axios from 'axios';
import Swal from 'sweetalert2';


class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Login: [],
      username: '',
      password: '',
      error: ''
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    const data = {
      username: username,
      password: password
    }

    console.log(data);

    axios.post("/addProduct/post", data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        var id = res.data.success._id
        window.location.href = `/adminDashboard`;

        this.setState({
          username: '',
          password: '',
          error: ''
        });
      } else {
        this.setState({ error: 'Invalid username or password.' });
      }
    }).catch((error) => {
      this.setState({ error: 'An error occurred. Please try again later.' });
    });
  }

  render() {
    return (
      <div className="container">
        <form className="create" onSubmit={this.handleSubmit}>
          <h3>Admin Login</h3>

          <label>Username: </label>
          <input
            type="text"
            name="name"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            id="formGroupExampleInput"
            required
          />

          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            id="formGroupExampleInput"
            required
          />

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}

          <center>
            
            <button className="formBtn" type="submit">
              Login
            </button>
          </center>
        </form>
        <center><a href="/EmpLoginPage"><button className="formBtn">Login as Employee</button></a></center>
      </div>
    );
  }
}

export default LoginPage;
