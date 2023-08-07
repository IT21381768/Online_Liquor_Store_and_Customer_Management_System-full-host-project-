import React, {Component} from 'react';
import axios from 'axios';
import {useParams, useLocation,Link} from "react-router-dom";
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';
import "jspdf-autotable";
function withParams(Component) {
    return props => <Component params={
        useParams()
    }/>
}

class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            employee: [],
            searchKey: "",
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/EmployeeList/posts").then(res => {
            if (res.data.success) {
                this.setState({employee: res.data.existingPosts});
                console.log(this.state.employee)
            }
        });
    }


    // edit
    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
        this.status = value;
    }


//    onDelete = (id) => {
//   if (window.confirm("Are you sure you want to delete this?")) {
//     axios.delete(`/EmployeeList/post/${id}`).then((res) => {
//       alert("Delete Successfully");
//       this.retrievePosts();
// });
// }
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
            axios.delete(`/EmployeeList/post/${id}`).then((res) => {
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

handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#EmployeeTable' });
    doc.save('EmployeeTable.pdf');
};


//search part
handleSearchKeyChange = (e) => {
    const searchKey = e.currentTarget.value;
    this.setState({ searchKey });
    this.filterData(this.state.employee, searchKey);
};


  handleSearchKeyChange = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.setState({ searchKey }, () => {
      if (searchKey === "") {
        this.retrievePosts();
      } else {
        this.filterData(this.state.employee, searchKey);
      }
    });
  };

  
//search by id
// filterData(posts, searchkey) {
//     const result = posts.filter((post) =>
//         post.NIC.toLowerCase().includes(searchkey.toLowerCase())
//     );
//     this.setState({ employee: result });
// }
filterData(posts, searchKey) {
    const result = posts.filter((post) =>
      Object.values(post).some((value) =>
        value.toString().toLowerCase().includes(searchKey.toLowerCase())
      )
    );
    this.setState({ employee: result });
  }

resetSearch = () => {
    this.setState({ searchKey: "" }, () => {
        this.retrievePosts();
    });
};



    render() {
        // const { searchKey } = this.state;
        // const filteredEmployee = this.state.employee.filter((employee) =>
        //     employee.NIC.toLowerCase().includes(searchKey.toLowerCase())
        // );

        const { searchKey } = this.state;
        const filteredEmployee = this.state.employee.filter((employee) =>
        Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchKey.toLowerCase())
        )
);
        return (
           
            <div className='mt-5'>
          <div className="container">
                <div className="add_btn mt-2 mb-2">
                <a href="/adminDashboard"><button className='backBtn'>Admin Dashboard</button></a>
                <a href="/AddEmployee"><button className='backBtn'>Add Employee</button></a>
                <a href="/LeaveAdmin"><button className='backBtn'>Leave Requests</button></a>
                <a href="/EmployeePreview"><button className='backBtn'>Save as PDF</button></a>
                <form className="form-inline my-2 my-lg-9 ml-auto">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchKey}
                                onChange={this.handleSearchKeyChange}
                            />
                            <button
                                className="btn btn-outline-success my-2 my-sm-0"
                                type="button"
                                onClick={this.resetSearch}
                            >
                                Reset
                            </button>
                        </form>
                </div>
                <div className="table-responsive">
                     <table class="table" id="EmployeeTable">
                         <thead>
                            <tr className="table-dark" >
                            <th scope="col" >No.</th>
                            <th scope="col" >NIC</th>
                                 <th scope="col" >Name</th>
                                <th scope="col">Address</th>
                                <th scope="col" >Date of Birth</th>
                                <th scope="col" >Gender</th>
                                <th scope="col" >Phone</th>
                                 <th scope="col" >Type</th>
                                 <th scope="col" >Salary</th>
                             </tr>
                         </thead>
                         <tbody> {
                            this.state.employee.map((employee, index) => (
                                <tr key={index}>

                                    <th scope="row">
                                        {
                                        index + 1
                                    }</th>

                                    <td> {
                                        employee.NIC
                                    }</td>

                                    <td>{
                                        employee.name
                                    }</td>

                                    <td>{
                                        employee.address
                                    }</td>

                                    <td>{
                                        employee.dateOfBirth.substring(0,10)
                                    }</td>

                                    <td>{
                                        employee.gender
                                    }</td>

                                    <td>{
                                        employee.contactNo
                                    }</td>

                                    <td>{
                                        employee.type
                                    }</td>

                                    <td>{
                                        employee.salary
                                    }</td>




                                    <td onClick={
                                        () => this.onDelete(employee._id)
                                    }>
                                        <a className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>

                                    <td>
                                        <a href={`/EditEmployee/${employee._id}`} className="btn btn-success">
                                        <i className="fas fa-edit"></i>
                                        </a>
                                    </td>


                                </tr>
                            ))
                        } </tbody>

                         
                     </table>
                 </div>
             </div>
         </div>
          
        )
    }
}

export default withParams(EmployeeList);