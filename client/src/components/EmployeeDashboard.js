import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./form.css"
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class EditEmployee extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      employee: [],
      NIC: '',
      name: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      contactNo: '',
      type:'',
      salary:'',
      password:''
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/EmployeeList/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          employee: res.data.post
        });
        console.log(this.state.employee);
      }

    });
  }


  //edit 
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.state.id

    const {NIC, name, address, dateOfBirth, gender, contactNo, type, salary, password } = this.state;

    let data =  this.state.employee;  
    data = {
      NIC: NIC.length != 0 ? NIC : data.NIC,
      name: name.length != 0 ? name : data.name,
      address: address.length != 0 ? address : data.address,
      dateOfBirth: dateOfBirth.length != 0 ? dateOfBirth : data.dateOfBirth,
      gender: gender.length != 0 ? gender : data.gender,
      contactNo: contactNo.length != 0 ? contactNo : data.contactNo,
      type: type.length != 0 ? type : data.type,
      salary: salary.length != 0 ?salary : data.salary,
      password: password.length != 0 ? password : data.password,
      
    }


    axios.put(`/EditEmployee/post/${id}`, data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        alert("Updated Successfully");
        var id = res.data.success._id
        window.location.href = `/EmployeeList`;

        this.setState(
          {
            NIC: '',
            name: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            contactNo: '',
            type:'',
            salary:'',
            password:''
          }
        )
      }
    })

  }



  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/EmployeeList/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };


  render() {
    
    const { _id, NIC, name, address, dateOfBirth, gender, contactNo, type, salary, password  } = this.state.employee;
    return (
        <div className='container'>
        <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
        <a href="/EmployeeList"><button className='backBtn'>Employee List</button></a>
        
        <form className="update" onSubmit={this.onSubmit}>
  <h3>Update Employee</h3>

  <label>NIC: </label>
  <input
    type="text"
    name="NIC"
    value={this.state.NIC}
    onChange={this.handleChange}
    placeholder={NIC}
  />

  <label>Name: </label>
  <input
    type="text"
    name="name"
    value={this.state.name}
    onChange={this.handleChange}
    placeholder={name}
  />

  <label>Address: </label>
  <input
    type="text"
    name="address"
    value={this.state.address}
    onChange={this.handleChange}
    placeholder={address}
  />

  <label>Date of Birth: </label>
  <input
    type="date"
    name="dateOfBirth"
    value={this.state.dateOfBirth}
    onChange={this.handleChange}
    placeholder={dateOfBirth}
    max={new Date().toISOString().split("T")[0]}
  />

  <label>Gender: </label>
  <select name="gender" value={this.state.gender} onChange={this.handleChange} placeholder={gender}>
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
    minLength="10"
    placeholder={contactNo}
  />

  <label>Type: </label>
  <select name="type" value={this.state.type} onChange={this.handleChange} placeholder={type}>
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
    min="30000"
    placeholder={salary}
  />

  <label>Password: </label>
  <input
    type="password"
    name="password"
    value={this.state.password}
    onChange={this.handleChange}
    minLength="8"
  />

  <center>
    <button className="formBtn" type="submit">
      Update Employee
    </button>
  </center>
</form>

    </div>


    )
  }
}



export default withParams(EditEmployee);