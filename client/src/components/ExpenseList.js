
import React, {Component} from 'react';
import axios from 'axios';
import {useParams, useLocation} from "react-router-dom";
import Swal from 'sweetalert2';
function withParams(Component) {
    return props => <Component params={
        useParams()
    }/>
}

class ExpenseList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            financeEx: [],
            searchKey: ""
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddExpense/posts").then(res => {
            if (res.data.success) {
                this.setState({financeEx: res.data.existingPosts});
                console.log(this.state.financeEx)
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

    // onSave = (id) => {


    //     let data = this.state.posts.filter((post) => post._id === id)[0];
    //     data.status = this.status;


    //     axios.put(`/post/${id}`, data).then((res) => {
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

//    onDelete = (id) => {
//   if (window.confirm("Are you sure you want to delete this?")) {
//     axios.delete(`/AddExpense/post/${id}`).then((res) => {
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
            axios.delete(`/AddExpense/post/${id}`).then((res) => {
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
    this.filterData(this.state.financeEx, searchKey);
};

filterData(posts, searchkey) {
    const result = posts.filter((post) =>
        post.date.toLowerCase().includes(searchkey.toLowerCase())
    );
    this.setState({ financeEx: result });
}

resetSearch = () => {
    this.setState({ searchKey: "" }, () => {
        this.retrievePosts();
    });
}


    render() {

        const { searchKey } = this.state;
        const filteredExpense = this.state.financeEx.filter((financeEx) =>
            financeEx.date.toLowerCase().includes(searchKey.toLowerCase())
        );

        const totalPrice = this.state.financeEx.reduce((total, item) => total + item.amount, 0);
        return (
           
            <div className='mt-5'>
          <div className="container">
                <div className="add_btn mt-2 mb-2">
                <a href="/pieChart"><button className='backBtn'> Chart</button></a>
                <a href="/Addexpense"><button className='backBtn'>Add Expense</button></a>
                <a href="/PrintPreviewExpense"><button className='backBtn'>Print Preview</button></a>

                <div className="row">
                <div className="col-sm-4">
              <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-body1">
                  <h5 className="card-title" style={{ textAlign: 'center' }}>Total Price</h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>LKR {totalPrice}</p>
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
                     <table class="table" >
                         <thead>
                            <tr className="table-dark" >
                            <th scope="col" >Report ID</th>
                                 <th scope="col" >Date</th>
                                <th scope="col">Category</th>
                                <th scope="col" >Remarks</th>
                                <th scope="col" >Amount(LKR)</th>
                                 <th scope="col" >Status</th>
                                 <th scope="col" ></th>
                                 <th scope="col" >Action</th>
                             </tr>
                         </thead>
                         <tbody> {
                            this.state.financeEx.map((financeEx, index) => (
                                <tr key={index}>

                                    <th scope="row">
                                        {
                                        index + 1
                                    }</th>

                                    <td> {
                                        financeEx.date.substring(0, 10)
                                    }</td>

                                    <td>{
                                        financeEx.category
                                    }</td>

                                    <td>{
                                        financeEx.remarks
                                    }</td>

                                    <td>{
                                        financeEx.amount
                                    }</td>

                                    <td>{
                                        financeEx.status
                                    }</td>



                                    <td onClick={
                                        () => this.onDelete(financeEx._id)
                                    }>
                                        <a className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                    <td>
                                    <a href={`/EditExpense/${financeEx._id}`} className="btn btn-success">
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

export default withParams(ExpenseList);