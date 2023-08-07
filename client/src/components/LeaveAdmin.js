import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function withParams(Component) {
  return (props) => <Component params={useParams()} />;
}

class LeaveAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      leaves: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/leaveAdmin/post").then(res => {
      console.log(res.data);
      if (res.data.success) {
        this.setState({ leaves: res.data.existingPosts });
      }
    });
  }

  // onDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     axios.delete(`/leaveAdmin/post/${id}`).then((res) => {
  //       alert("Delete Successfully");
  //       this.retrievePosts();
  //     });
  //   }
  // };

  onDelete = (id) => {
    Swal.fire({
        title: 'Are you sure you want to delete this?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFB400',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/leaveAdmin/post/${id}`).then((res) => {
                Swal.fire(
                    'Deleted!',
                    'Your post has been deleted.',
                    'success'
                )
                this.retrievePosts();
            });
        }
    });
};

  render() {
    const { leaves } = this.state;
  
    return (
      <div>
        <div className="mt-5">
          <div className="container">
            <a href="/EmployeeList"><button className='backBtn'>Employee List</button></a>
            <div className="add_btn mt-2 mb-2"></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col"></th>
                    <th scope="col">NIC</th>
                    <th scope="col">Requested Leave Date</th>
                    <th scope="col">Reason</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leaves && leaves.length > 0 ? (
                    leaves.map((leave, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{leave.NIC}</td>
                        <td>{leave.leaveDate.substring(0,10)}</td>
                        <td>{leave.reason}</td>
                        <td onClick={() => this.onDelete(leave._id)}>
                          <a className="btn btn-danger">
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No leaves found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

export default withParams(LeaveAdmin);
