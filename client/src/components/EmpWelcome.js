import React, { Component } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Leave from './Leave';


function withParams(Component) {
  return (props) => <Component params={useParams()} {...props} />;
}

class EmpWelcome extends Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      searchKey: '',
    };
  }

  componentDidMount() {
    const loggedInNIC = sessionStorage.getItem('loggedInNIC');
    if (loggedInNIC) {
      this.retrieveEmployees(loggedInNIC);
    } else {
      console.log('error');
    }
  }

  retrieveEmployees(loggedInNIC) {
    axios
      .get(`/EmpWelcome/posts`)
      .then((res) => {
        if (res.data.success) {
          const filteredEmployees = res.data.existingPosts.filter(
            (employee) => employee.NIC === loggedInNIC
          );
          this.setState({ employees: filteredEmployees });
          console.log(this.state.employees);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSearchKeyChange = (event) => {
    this.setState({ searchKey: event.target.value });
  };

  resetSearch = () => {
    this.setState({ searchKey: '' });
  };

  onDelete = (id) => {
    axios
      .delete(`/EmployeeList/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.retrieveEmployees(sessionStorage.getItem('loggedInNIC'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { searchKey, employees } = this.state;
    const loggedInNIC = sessionStorage.getItem('loggedInNIC');

    return (
      <div className="mt-5">
        <div className="container">
            <div className="table-responsive">
              <table className="table" id="EmployeeTable">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">No.</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Type</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{employee.NIC}</td>
                      <td>{employee.name}</td>
                      <td>{employee.address}</td>
                      <td>{employee.dateOfBirth.substring(0,10)}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.contactNo}</td>
                  <td>{employee.type}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.password}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
                 
          
        </div>
      </div>
      <Leave loggedInNIC={sessionStorage.getItem('loggedInNIC')} />
    </div>
    
    );
  }
}

export default withParams(EmpWelcome);

  