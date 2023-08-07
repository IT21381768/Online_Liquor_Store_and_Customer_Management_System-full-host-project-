import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}

class SupplierList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            supplier: [],
            searchKey: "",
        };

    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        axios.get("/AddSupplier/posts").then(res => {
            if (res.data.success) {
                this.setState({ supplier: res.data.existingPosts });
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

    // onDelete = (id) => {
    //     if (window.confirm("Are you sure you want to delete this?")) {
    //         axios.delete(`/AddSupplier/post/${id}`).then((res) => {
    //             alert("Delete Successfully");
    //             this.retrievePosts();

    //         });
    //     }
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
                axios.delete(`/AddSupplier/post/${id}`).then((res) => {
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
        this.filterData(this.state.supplier, searchKey);
    };

    filterData(posts, searchkey) {
        const result = posts.filter((post) =>
            post.snname.toLowerCase().includes(searchkey.toLowerCase())
        );
        this.setState({ supplier: result });
    }

    resetSearch = () => {
        this.setState({ searchKey: "" }, () => {
            this.retrievePosts();
        });
    };

    render() {
        const { searchKey } = this.state;
        const filteredSupplier = this.state.supplier.filter((supplier) =>
            supplier.snname.toLowerCase().includes(searchKey.toLowerCase())
        );

        return (
            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                   
                        <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
                        <a href="/AddSupplier"><button className='backBtn'>Add Supplier</button></a>
                        <a href="/PrintPreviewSupplier"><button className='backBtn'>Save as PDF</button></a>

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

                    <div className="table-responsive"  >
                    <p><b>Total Suppliers: {filteredSupplier.length}</b></p> {/* added count display */}
                   
                        <table class="table" >
                            <thead>
                                <tr className="table-dark" >
                                    <th scope="col" ></th>
                                    <th scope="col" >Supplier Company Name</th>
                                    <th scope="col">Supplier Name</th>
                                    <th scope="col" >Address</th>
                                    <th scope="col" >Email</th>
                                    <th scope="col" >Website</th>
                                    <th scope="col" >Phone</th>
                                    <th scope="col" >Status</th>
                                    <th scope="col" >Action</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody> {
                                this.state.supplier.map((supplier, index) => (
                                    <tr key={index}>

                                        <th scope="row">
                                            {
                                                index + 1
                                            }</th>

                                        <td> {
                                            supplier.snname
                                        }</td>

                                        <td>{
                                            supplier.sname
                                        }</td>

                                        <td>{
                                            supplier.address
                                        }</td>

                                        <td>{
                                            supplier.email
                                        }</td>

                                        <td>{
                                            supplier.website
                                        }</td>

                                        <td>{
                                            supplier.phone
                                        }</td>

                                        <td>{
                                            supplier.status
                                        }</td>



                                        <td onClick={
                                            () => this.onDelete(supplier._id)
                                        }>
                                            <a className="btn btn-danger">
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>

                                        <td>
                                            <a href={`/EditSupplier/${supplier._id}`} className="btn btn-success">
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

export default withParams(SupplierList);