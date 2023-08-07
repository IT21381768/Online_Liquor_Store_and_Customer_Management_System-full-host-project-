import React, { Component } from 'react';
import axios from 'axios';
import './form.css';

class inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: null,
    };
  }

  componentDidMount() {
    const fetchInventory = async () => {
      axios.get("/addProduct/posts").then(res => {
        if (res.data.success) {
          this.setState({ inventory: res.data.existingPosts });
          console.log(this.state.inventory)
        }
      });
    };

    fetchInventory();
  }

  render() {
    const { inventory } = this.state;

    if (!inventory) {
      return <div></div>;
    }

    const outOfStockProducts = inventory.filter(product => product.quantity <= 4);

    return (
      <div>
        <div className="add_btn mt-2 mb-2">
          <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
          <a href="/inventoryDetail"><button className='backBtn'>View All Products</button></a>
          <a href="/addProduct"><button className='backBtn'>Add Product</button></a>
          <h2>Out of Stock Products List</h2>
          <table className='table1'>
            <thead className='thead1'>
              <tr className='tr1'>
                <th className='th1'>Name</th>
                <th className='th2'>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {outOfStockProducts.map(product => (
                <tr className='tr2' key={product._id}>
                  <td className='td1'>{product.name}</td> 
                  <td className='td2'>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default inventory;
