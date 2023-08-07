import React, {Component} from 'react';
import axios from 'axios';
import {useParams, useLocation,Link} from "react-router-dom";
import Swal from 'sweetalert2';
function withParams(Component) {
    return props => <Component params={
        useParams()
    }/>
}

class SalesList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            sales: [],
            searchKey:"",
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddSalesD/posts").then(res => {
            if (res.data.success) {
                this.setState({sales: res.data.existingPosts});
                console.log(this.state.sales)
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
//     axios.delete(`/AddSalesD/post/${id}`).then((res) => {
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
            axios.delete(`/AddSalesD/post/${id}`).then((res) => {
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
    this.filterData(this.state.sales, searchKey);
};

filterData(posts, searchkey) {
    const result = posts.filter((post) =>
        post.Category.toLowerCase().includes(searchkey.toLowerCase())
    );
    this.setState({ sales: result });
}

resetSearch = () => {
    this.setState({ searchKey: "" }, () => {
        this.retrievePosts();
    });
};


    render() {
        const { searchKey } = this.state;
        const filteredSales = this.state.sales.filter((sales) =>
            sales.Category.toLowerCase().includes(searchKey.toLowerCase())
        );

        const totalQuantity = this.state.sales.reduce((total, item) => total + item.Quantity, 0);
        const totalPrice = this.state.sales.reduce((total, item) => total + item.TPrice, 0);
        const TargetQuantity = this.state.sales.reduce((total, item) => total + item.TQuantity, 0);
    
        return (
           
            <div className='mt-5'>
          <div className="container">
                <div className="add_btn mt-2 mb-2">
                <a href="/adminDashboard"><button className='backBtn'>Dashboard</button></a>
                <a href="/AddSalesD"><button className='backBtn'>Add Sales Details</button></a>
                <a href="/PrintPreviewSales"><button className='backBtn'>Print</button><i class="fa-sharp fa-light fa-file-chart-pie"></i></a>

                <div className="row">
            <div className="col-sm-4">
              <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-body1">
                  <h5 className="card-title" style={{ textAlign: 'center' }}>Target Quantity</h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>{TargetQuantity}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-body1">
                  <h5 className="card-title" style={{ textAlign: 'center' }}>Total Quantity</h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>{totalQuantity}</p>
                </div>
              </div>
            </div>
            
            <div className="col-sm-4">
              <div className="card2" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="card-body2">
                <h5 className="card-title" style={{ textAlign: 'center' }}>Total Income</h5>
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
                            <th scope="col" >ID</th>
                                 <th scope="col" >Category</th>
                                 <th scope="col" >Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col" >Target Quantity</th>
                                <th scope="col" >Total Price</th>
                                 <th scope="col" >Action</th>
                                 <th scope="col" ></th>
                             </tr>
                         </thead>
                         <tbody> {
                            this.state.sales.map((sales, index) => (
                                <tr key={index}>

                                    <th scope="row">
                                        {
                                        index + 1
                                    }</th>

                                    <td> {
                                        sales.Category
                                    }</td>
                                    
                                    <td> {
                                        sales.type
                                    }</td>

                                    <td>{
                                        sales.Quantity
                                    }</td>

                                    <td>{
                                        sales.TQuantity
                                    }</td>

                                    <td>{
                                        sales.TPrice
                                    }</td>

                                    <td onClick={
                                        () => this.onDelete(sales._id)
                                    }>
                                        <a className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>

                                    <td>
                                        <a href={`/EditSalesD/${sales._id}`} className="btn btn-success">
                                        <i className="fas fa-edit"></i>
                                        </a>
                                    </td>

                                    {/* <td >
                                        <a component={Link} to={`/sales/${sales._id}`} className="btn btn-success">
                                            <i className="fas fa-edit"></i>
                                        </a>
                                    </td> */}


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


export default withParams(SalesList);