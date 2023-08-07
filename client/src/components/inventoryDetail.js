import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from "react-router-dom";
import Swal from 'sweetalert2';

function withParams(Component) {
  return props => <Component params={useParams()} />
}

class inventoryDetail extends Component {

  constructor(props) {
    super(props);

    this.status = "";

    this.state = {
      id: props.params.id,
      inventory: [],
      searchKey: "",
    };

  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/addProduct/posts").then(res => {
      if (res.data.success) {
        this.setState({ inventory: res.data.existingPosts });
      }
    });
  }

  

 //search part
 handleSearchKeyChange = (e) => {
  const searchKey = e.currentTarget.value;
  this.setState({ searchKey });
  this.filterData(this.state.inventory, searchKey);
};

filterData(posts, searchkey) {
  const result = posts.filter((post) =>
      post.name.toLowerCase().includes(searchkey.toLowerCase())
  );
  this.setState({ inventory: result });
}

resetSearch = () => {
  this.setState({ searchKey: "" }, () => {
      this.retrievePosts();
  });
};
  edit
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
    this.status = value;
  }

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

axios.put(`/addProduct/post/${id}`, data).then((res) => {
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
              category: "",
              price: "",
              quantity: "",
              capacity: "",
              material: "",
              percentage: "",
              country: "",
              description: "",
              image: "",
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

  // onDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     axios.delete(`/addProduct/post/${id}`).then((res) => {
  //       alert("Delete Successfully");
  //       this.retrievePosts();
  //     });
  //   }
  // }

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
            axios.delete(`/addProduct/post/${id}`).then((res) => {
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
    const totalQuantity = this.state.inventory.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = this.state.inventory.reduce((total, item) => total + item.price*item.quantity, 0);
    const lowStockCount = this.state.inventory.filter((item) => item.quantity <= 3).length;
    const { searchKey } = this.state;
    const filterediIventory = this.state.inventory.filter((inventory) =>
        inventory.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    return (
      <div className='mt-5'>
        <div className="container">
          <h3>Inventory</h3>
          <div className="add_btn mt-2 mb-2">
            <Link to="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></Link>
            <Link to="/inventory"><button className='backBtn'>Low Stock Count Product List</button></Link>
            <Link to="/addProduct"><button className='backBtn'>Add Product</button></Link>
            <Link to="/printPreviewInventory"><button className='backBtn'>Print Preview</button></Link>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="card1">
                <div className="card-body1">
                  <h5 className="card-title">Total Quantity</h5>
                  <p className="card-text">{totalQuantity}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card2">
              <div className="card-body2">
                <h5 className="card-title">Total Price</h5>
                <p className="card-text">LKR {totalPrice}</p>
              </div>
            </div>
            </div>
            <div className="col-sm-4">
            <div className="card3">
              <div className="card-body3">
                <h5 className="card-title">Low Stock Count</h5>
                <p className="card-text">{lowStockCount}</p>
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

           <div className="table-responsive">
           
                
          <table className="table" >
            <thead>
              <tr className="table-dark" >
                <th scope="col" >#</th>
                <th scope="col" >Name</th>
                <th scope="col" >Category</th>
                <th scope="col" >Price(LKR)</th>
                <th scope="col" >Quantity</th>
                <th scope="col">Total</th>
                <th scope="col" >Capacity(ml)</th>
                <th scope="col" >Material</th>
                <th scope="col" >Percentage(%)</th>
                <th scope="col" >Country</th>
                <th scope="col" >Action</th>
                <th scope="col" ></th>
              </tr>
            </thead>
            <tbody> {
              this.state.inventory.map((inventory, index) => (
                <tr key={index}>

                  <th scope="row">
                    {
                      index + 1
                    }</th>

                  <td> {
                    inventory.name
                  }</td>

                  <td>{
                    inventory.category
                  }</td>

                  <td>{
                    inventory.price
                  }</td>

                  <td>{
                    inventory.quantity
                  }</td>

                  <td>{
                    inventory.quantity*inventory.price
                  }</td>

                  <td>{
                    inventory.capacity
                  }</td>

                  <td>{
                    inventory.material
                  }</td>

                  <td>{
                    inventory.percentage
                  }</td>
                  <td>{
                    inventory.country
                  }</td>



                  <td onClick={
                    () => this.onDelete(inventory._id)
                  }><a className="btn btn-danger"><i className="fas fa-trash-alt"></i></a>
                  </td>

                  <td>
                    <a href={`/editInventory/${inventory._id}`} className="btn btn-success">
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
   
export default withParams(inventoryDetail);











































