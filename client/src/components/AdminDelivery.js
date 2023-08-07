import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}

class AdminDelivery extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            details: [],
            searchKey: "",
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/informationForm/posts").then(res => {
            if (res.data.success) {
                this.setState({ details: res.data.existingPosts });
                console.log(this.state.details)
            }
        });
    }


    
    // edit
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
        this.status = value;
    }

    onSave = (id) => {
    let data = this.state.details.filter((post) => post._id === id)[0];
    data.status = this.status;

    axios.put(`/informationForm/post/${id}`, data).then((res) => {
        if (res.data.success) {
            Swal.fire({
                title: 'Updated Successfully!',
                text: 'Your changes have been saved.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
                this.setState({
                    name: "",
                                    email: "",
                                    message: "",
                                    address: "",
                                    town: "",
                                    phone: ""
                });
            });
        }
    }).catch((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the post. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    });
};
    // handleChange = (e) => {
    //     const { name, value } = e.target;

    //     this.setState({
    //         ...this.state,
    //         [name]: value
    //     });
    //     this.status = value;
    // }

    // onSave = (id) => {
    //     let data = this.state.details.filter((post) => post._id === id)[0];
    //     data.status = this.status;

    //     axios.put(`/informationForm/post/${id}`, data).then((res) => {
    //         if (res.data.success) {
    //             console.log(res.data.success._id);
    //             alert("Updated Successfully");
    //             var id = res.data.success._id

    //             this.setState({
    //                 name: "",
    //                 email: "",
    //                 message: "",
    //                 address: "",
    //                 town: "",
    //                 phone: ""
    //             })
    //         }
    //     })
    // }

    
    // onDelete = (id) => {
    //     if (window.confirm("Are you sure you want to delete this?")) {
    //         axios.delete(`/informationForm/post/${id}`).then((res) => {
    //             alert("Delete Successfully");
    //             this.retrievePosts();
    //         });
    //     }
    // };

//delete
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
                axios.delete(`/informationForm/post/${id}`).then((res) => {
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

    //print
    handlePrint = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#deliveryTable' });
        doc.save('deliveryTable.pdf');
    };

    //search part
    handleSearchKeyChange = (e) => {
        const searchKey = e.currentTarget.value;
        this.setState({ searchKey });
        this.filterData(this.state.details, searchKey);
    };

    filterData(posts, searchkey) {
        const result = posts.filter((post) =>
            post.name.toLowerCase().includes(searchkey.toLowerCase())
        );
        this.setState({ details: result });
    }

    resetSearch = () => {
        this.setState({ searchKey: "" }, () => {
            this.retrievePosts();
        });
    };

    render() {
        const { searchKey } = this.state;
        const filteredDelivery = this.state.details.filter((details) =>
            details.name.toLowerCase().includes(searchKey.toLowerCase())
        );

        
        
        return (
            <div>
                <div className='mt-5'>
                    <div className="container">
                        <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                        <a href="/printPreview"><button className='backBtn'>Save as PDF</button></a>
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
                        <div className="table-responsive">
                            <table className="table" id="deliveryTable">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Town</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Status</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.details.map((details, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{details.name}</td>
                                            <td>{details.address}</td>
                                            <td>{details.email}</td>
                                            <td>{details.phone}</td>
                                            <td>{details.town}</td>
                                            <td>{details.message}</td>
                                            <td>
                                                <input type="text" class="form-control"
                                                    value={
                                                        this.state.status
                                                    }
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                    id="formGroupExampleInput"
                                                    placeholder={
                                                        details.status
                                                    } /></td>
 {/* <td>
  <select
    className="form-control"
    value={this.state.status}
    onChange={this.handleChange}
  >
    <option value="">Select a status</option>
    <option value="active">ORDERED</option>
    <option value="inactive">CONFIRMED</option>
    <option value="pending">PACKING</option>
  </select>
</td>  */}



                                            <td onClick={
                                                () => this.onDelete(details._id)
                                            }>
                                                <a className="btn btn-danger">
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>


                                            <td onClick={
                                                () => this.onSave(details._id)
                                            }>
                                                <a className="btn btn-success">
                                                    <i className="fas fa-edit"></i>
                                                </a>
                                            </td>

                                            <td>
                                                <a className="btn btn-success blue-button" href={`/deliveyStatus/${details._id}`}>
                                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                                </a>
                                            </td>

                                        </tr>
                                    ))
                                    } </tbody>


                            </table>



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withParams(AdminDelivery);