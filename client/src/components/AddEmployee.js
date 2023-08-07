import React, { useState, Component } from 'react'
import './form.css'
import axios from 'axios';



export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      NIC: '',
      name: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      contactNo: '',
      type: '',
      salary: '',
      password: '',
    }
  }


  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { NIC, name, address, dateOfBirth, gender, contactNo, type, salary, password } = this.state;

    const data = {
      NIC: NIC,
      name: name,
      address: address,
      dateOfBirth: dateOfBirth,
      gender: gender,
      contactNo: contactNo,
      type: type,
      salary: salary,
      password: password,

    }
    console.log(data);

    axios.post("/AddEmployee/post", data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        var id = res.data.success._id
        window.location.href = `/EmployeeList`;

        this.setState(
          {
            NIC: "",
            name: "",
            address: "",
            dateOfBirth: "",
            gender: "",
            contactNo: "",
            type: '',
            salary: '',
            password: ''
          }
        )
      }
    })

  }

  render() {
    return (
      <div className='container'>
        <a href="/EmployeeList"><button className='backBtn'>Employee List</button></a>

        <form className="create" onSubmit={this.onSubmit}>
          <h3>Add New Employee</h3>

          <label>NIC: </label>
          <input
            type="text"
            name="NIC"
            value={this.state.NIC}
            onChange={this.handleChange}
            required
            minlength="10" 
            maxlength="12"

          />

          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
            required
          />

          <label>Date of Birth: </label>
          <input
            type="date"
            name="dateOfBirth"
            value={this.state.dateOfBirth}
            onChange={this.handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />

          <label>Gender: </label>
          <select name="gender" value={this.state.gender} onChange={this.handleChange} required>
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Phone: </label>
          <input
            type="tel"
            name="contactNo"
            value={this.state.contactNo}
            onChange={this.handleChange}
            maxlength="10"
            required
            pattern="\d{10}"
          />

          <label>Type: </label>
          <select name="type" value={this.state.type} onChange={this.handleChange} required>
            <option value="">--Select Type--</option>
            <option value="Store Staff">Store Staff</option>
            <option value="Delivery Staff">Delivery Staff</option>
          </select>

          <label>Salary (Rs.): </label>
          <input
            type="number"
            name="salary"
            value={this.state.salary}
            onChange={this.handleChange}
            required
            min="30000"
          />

          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            minLength="8"
          />

          <center>
            <button className="formBtn" type="submit">
              Add Employee
            </button>
          </center>
        </form>
      </div>
    )
  }

}

