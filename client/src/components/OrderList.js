import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}

class OrderList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            order: [],
            searchKey: "",
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddOrder/posts").then(res => {
            if (res.data.success) {
                this.setState({ order: res.data.existingPosts });
                console.log(this.state.order)
            }
        });
    }


    // // edit
    // handleChange = (e) => {
    //     const { name, value } = e.target;

    //     this.setState({
    //         ...this.state,
    //         [name]: value
    //     });
    //     this.status = value;
    // }

    // onSave = (id) => {
    //     let data = this.state.order.filter((post) => post._id === id)[0];
    //     data.status = this.status;

    //     axios.put(`/AddOrder/post/${id}`, data).then((res) => {
    //         if (res.data.success) {
    //             console.log(res.data.success._id);
    //             alert("Updated Successfully");
    //             var id = res.data.success._id

    //             this.setState({
    //                 snname: "",
    //                 sname: "",
    //                 date: "",
    //                 email: "",
    //                 pname: "",
    //                 quantity: "",
    //                 unitprice: "",

    //             })
    //         }
    //     })
    // }


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
        let data = this.state.order.filter((post) => post._id === id)[0];
        data.status = this.status;

        axios.put(`/AddOrder/post/${id}`, data).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    title: 'Updated Successfully!',
                    text: 'Your changes have been saved.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.setState({
                        snname: "",
                        sname: "",
                        date: "",
                        email: "",
                        pname: "",
                        quantity: "",
                        unitprice: "",

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
                axios.delete(`/AddOrder/post/${id}`).then((res) => {
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


    //search part
    handleSearchKeyChange = (e) => {
        const searchKey = e.currentTarget.value;
        this.setState({ searchKey });
        this.filterData(this.state.order, searchKey);
    };

    filterData(posts, searchkey) {
        const result = posts.filter((post) =>
            post.snname.toLowerCase().includes(searchkey.toLowerCase())
        );
        this.setState({ order: result });
    }

    resetSearch = () => {
        this.setState({ searchKey: "" }, () => {
            this.retrievePosts();
        });
    };


    render() {
        const { searchKey } = this.state;
        const filteredOrder = this.state.order.filter((order) =>
            order.snname.toLowerCase().includes(searchKey.toLowerCase())
        );
        const totalQuantity = this.state.order.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = this.state.order.reduce((total, item) => total + item.quantity * item.unitprice, 0);
       


        return (


            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
                        <a href="/AddOrder"><button className='backBtn'>Add Order Detail</button></a>
                        <a href="/PrintPreviewOrder"><button className='backBtn'>Save as PDF</button></a>
                      

                        <div className="row">
                            <div className="col-sm-4">
                                <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="card-body1">
                                        <h5 className="card-title">Total Quantity</h5>
                                        <p className="card-text">{totalQuantity}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card2" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="card-body2">
                                        <h5 className="card-title" style={{ textAlign: 'center' }}>Total Price</h5>
                                        <p className="card-text" style={{ textAlign: 'center' }}>LKR : {totalPrice}</p>
                                        {/* <p> <b> Total Orders: {this.state.order.length}</b></p> */}
                                    </div>
                                </div>
                            </div>
                        </div>



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
                        <p> <b> Total Orders: {this.state.order.length}</b></p>

                        <table class="table" >
                            <thead>
                                <tr className="table-dark" >
                                    <th scope="col" ></th>
                                    <th scope="col" >Supplier Company Name</th>
                                    <th scope="col">Supplier Name</th>
                                    <th scope="col" >Date</th>
                                    <th scope="col" >Product Name</th>
                                    <th scope="col" >Quantity</th>
                                    <th scope="col" >Unit Price(LKR)</th>
                                    <th scope="col" >Total Price(LKR)</th>
                                    <th scope="col" >Status</th>
                                    <th scope="col" ></th>
                                    <th scope="col" >Action</th>
                                    <th scope="col" ></th>





                                </tr>
                            </thead>
                            <tbody> {
                                this.state.order.map((order, index) => (
                                    <tr key={index}>

                                        <th scope="row">
                                            {
                                                index + 1
                                            }</th>

                                        <td> {
                                            order.snname
                                        }</td>

                                        <td>{
                                            order.sname
                                        }</td>

                                        <td>{
                                            order.date.substring(0, 10)
                                        }</td>


                                        <td>{
                                            order.pname
                                        }</td>

                                        <td>{
                                            order.quantity
                                        }</td>

                                        <td>{
                                            order.unitprice
                                        }</td>

                                        <td>{
                                            order.quantity * order.unitprice
                                        }</td>

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
                                                    order.status
                                                } /></td>



                                        <td onClick={
                                            () => this.onDelete(order._id)
                                        }>
                                            <a className="btn btn-danger">
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>

                                        <td onClick={
                                            () => this.onSave(order._id)
                                        }>
                                            <a className="btn btn-success">
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

export default withParams(OrderList);