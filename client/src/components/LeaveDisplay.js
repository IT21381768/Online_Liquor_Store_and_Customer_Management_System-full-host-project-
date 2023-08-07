import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./leave.css"

function withParams(Component) {
  return props => <Component params={useParams()} />
}

class LeaveDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      leaves: [],
      NIC: '',
      leaveDate: '',
      reason: '',
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/leave/post/${id}`).then((res) => {
      console.log(res.data.leave);
      if (res.data.success) {
        this.setState({
          leaves: res.data.leave
        });
        console.log(this.state.leaves);
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
    const { NIC, leaveDate, reason } = this.state;
    let data = { ...this.state.leaves };  
    data.NIC = NIC.length !== 0 ? NIC : data.NIC;
    data.leaveDate = leaveDate.length !== 0 ? leaveDate : data.leaveDate;
    data.reason = reason.length !== 0 ? reason : data.reason;

    axios.put(`/leave/post/${id}`, data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        alert("Updated Successfully");
        var id = res.data.success._id;
        this.setState({
          NIC: "",
          leaveDate: "",
          reason: ""
        })
      }
    })
  }

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/leave/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };

  render() {
    const { _id, NIC, leaveDate, reason } = this.state.leaves;
    return (
      <div className="container-1">
        <h2>Contact</h2>
        <form>
          <label>NIC: </label>
          <input
            type="text"
            name="NIC"
            value={this.state.NIC}
            onChange={this.handleChange}
            placeholder={NIC}
          />

          <label>Date: </label>
          <input
            type="date"
            name="leaveDate"
            value={this.state.leaveDate}
            onChange={this.handleChange}
            placeholder={leaveDate}
            min={new Date().toISOString().split("T")[0]}
          />

          <label>Reason: </label>
          <input
            type="text"
            name="reason"
            value={this.state.reason}
            onChange={this.handleChange}
            placeholder={reason}
          />

          <button className="btn btn-danger" type="button" style={{ marginTop: '15px' }} onClick={() => this.onDelete(_id)}>
            <i className="fas fa-trash-alt"></i> Delete
          </button>
          <br />
          <button className="btn btn-primary" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
            <i className="fas fa-edit"></i> Edit

          </button>



        </form>


      </div>





    )
  }
}



export default withParams(LeaveDisplay);






