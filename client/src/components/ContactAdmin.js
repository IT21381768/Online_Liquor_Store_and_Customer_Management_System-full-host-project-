// import React, { Component } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from "react-router-dom";
// function withParams(Component) {
//     return props => <Component params={
//         useParams()
//     } />
// }

// class ContactAdmin extends Component {

//     constructor(props) {
//         super(props);

//         this.status = "";

//         this.state = {
//             id: props.params.id,
//             posts: []
//         };

//     }

//     componentDidMount() {
//         this.retrievePosts();

//     }

//     retrievePosts() {
//         axios.get("/contactAdmin/posts").then(res => {
//             if (res.data.success) {
//                 this.setState({ posts: res.data.existingPosts });
//                 console.log(this.state.posts)
//             }
//         });
//     }


//     // edit
//     handleChange = (e) => {
//         const { name, value } = e.target;
    
//         this.setState({
//             ...this.state,
//             [name]: value
//         });
        
//         // update the note field in the state with the new value
//         this.setState({
//             note: value
//         });
//     }
    

//     onSave = (id) => {


//         let data = this.state.posts.filter((post) => post._id === id)[0];
//         data.note = this.note;


//         axios.put(`/contactAdmin/post/${id}`, data).then((res) => {
//             if (res.data.success) {
//                 console.log(res.data.success._id);
//                 alert("Updated Successfully");
//                 var id = res.data.success._id


//                 this.setState({
//                     name: "",
//                     email: "",
//                     message: "",
//                     note:"",
//                 })
//             }
//         })
//     }

//     onDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this?")) {
//             axios.delete(`/contact/post/${id}`).then((res) => {
//                 alert("Delete Successfully");
//                 this.retrievePosts();
//             });
//         }
//     };


 

//     render() {
//         return (
//             <div>
//             <div className='mt-5'>
//                 <div className="container">
//                     <div className="add_btn mt-2 mb-2">
//                     </div>
//                     <div className="table-responsive">
//                         <table class="table" >
//                             <thead>
//                                 <tr className="table-dark" >
//                                     <th scope="col"></th>
//                                     <th scope="col">Name</th>
//                                     <th scope="col">Email</th>
//                                     <th scope="col">Message</th>
//                                     <th scope="col">Note</th>
//                                     <th></th>
//                                     <th></th>

//                                 </tr>
//                             </thead>
//                             <tbody> {
//                                 this.state.posts.map((posts, index) => (
//                                     <tr key={index}>

//                                         <th scope="row">
//                                             {
//                                                 index + 1
//                                             }</th>

//                                         <td> {
//                                             posts.name
//                                         }</td>


//                                         <td>{
//                                             posts.email
//                                         }</td>


//                                         <td>{
//                                             posts.message
//                                         }</td>
                                        
//                                         <input type="text" class="form-control"
//                                             value={
//                                                 this.state.note
//                                             }
//                                             onChange={
//                                                 this.handleChange
//                                             }
//                                             id="formGroupExampleInput"
//                                             placeholder={
//                                                 posts.note
//                                             } />


                                        


//                                         <td onClick={
//                                             () => this.onDelete(posts._id)
//                                         }>
//                                             <a className="btn btn-danger">
//                                                 <i className="fas fa-trash-alt"></i>
//                                             </a>
//                                         </td>


//                                         <td onClick={
//                                             () => this.onSave(posts._id)
//                                         }>
//                                             <a className="btn btn-success">
//                                                 <i className="fas fa-edit"></i>
//                                             </a>
//                                         </td>
//                                     </tr>
//                                 ))
//                             } </tbody>


//                         </table>


                        
//                     </div>
//                 </div>
//             </div>
//             </div>
//         )
//     }
// }

// export default withParams(ContactAdmin);




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

        this.note = "";

        this.state = {
            id: props.params.id,
            posts: [],
            searchKey: "",
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/contactAdmin/posts").then(res => {
            if (res.data.success) {
                this.setState({ posts: res.data.existingPosts });
                console.log(this.state.posts)
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
        this.note = value;
    }

    onSave = (id) => {
    let data = this.state.posts.filter((post) => post._id === id)[0];
    data.note = this.note;

    axios.put(`/contactAdmin/post/${id}`, data).then((res) => {
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
                    message: ""
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


    //delete
    // onDelete = (id) => {
    //     if (window.confirm("Are you sure you want to delete this?")) {
    //         axios.delete(`/contactAdmin/post/${id}`).then((res) => {
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
                axios.delete(`/contactAdmin/post/${id}`).then((res) => {
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
        this.filterData(this.state.posts, searchKey);
    };

    filterData(posts, searchkey) {
        const result = posts.filter((post) =>
            post.name.toLowerCase().includes(searchkey.toLowerCase())
        );
        this.setState({ posts: result });
    }

    resetSearch = () => {
        this.setState({ searchKey: "" }, () => {
            this.retrievePosts();
        });
    };

    render() {
        const { searchKey } = this.state;
        const filteredDelivery = this.state.posts.filter((posts) =>
        posts.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        return (
            <div>
                <div className='mt-5'>
                    <div className="container">
                    <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                        <a href="/printContactPreview"><button className='backBtn'>Save as PDF</button></a>
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
                                        <th scope="col">Email</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Notes</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.posts.map((posts, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{posts.name}</td>
                                            <td>{posts.email}</td>
                                            <td>{posts.message}</td>
                                            <td>
                                                <input type="text" class="form-control"
                                                    value={
                                                        this.state.note
                                                    }
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                    id="formGroupExampleInput"
                                                    placeholder={
                                                        posts.note
                                                    } /></td>


                                            <td onClick={
                                                () => this.onDelete(posts._id)
                                            }>
                                                <a className="btn btn-danger">
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>


                                            <td onClick={
                                                () => this.onSave(posts._id)
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
            </div>
        )
    }
}

export default withParams(AdminDelivery);