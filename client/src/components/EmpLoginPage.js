import React, { Component } from 'react';
import axios from 'axios';

class EmpLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NIC: '',
      password: '',
      error: ''
    };
  }

  handleNICChange = (event) => {
    this.setState({ NIC: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { NIC, password } = this.state;

    const data = {
      NIC: NIC,
      password: password
    };

    axios.post('EmpLoginPage/login', data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.employee.NIC);
          const loggedInNIC = res.data.employee.NIC;

          sessionStorage.setItem('loggedInNIC', loggedInNIC);

          window.location.href = `/EmpWelcome`;

          this.setState({
            NIC: '',
            password: ''
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.response.data.error });
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h3>Employee Login</h3>

          <label>NIC: </label>
          <input
            type="text"
            name="username"
            value={this.state.NIC}
            onChange={this.handleNICChange}
            required
          />

          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
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
      </div>
    );
  }
}

export default EmpLoginPage;
