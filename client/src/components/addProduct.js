import React, {useState,Component} from 'react'
import './form.css'
import axios from 'axios';


//const AddSupplier = () => {
export default class addProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            name: '',
            category: '',
            price: '',
            quantity: '',
            capacity: '',
            material: '',
            percentage:'',
            country:'',
            description:'',
            image:''
        }
    }


    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, category, price, quantity, capacity, material,percentage,country,description,image } = this.state;

        const data = {
            name: name,
            category: category,
            price: price,
            quantity: quantity,
            capacity: capacity,
            material: material,
            percentage: percentage,
            country: country,
            description: description,
            image: image

        }
        console.log(data);

        axios.post("/addProduct/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/inventoryDetail`;

                this.setState(
                    {
                        name: '',
                        category: '',
                        price: '',
                        quantity: '',
                        capacity: '',
                        material: '',
                        percentage: '',
                        country: '',
                        description: '',
                        image: '',
                    }
                )
            }
        })

    }

 render(){
    return (
        <div className='container'>
            <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
            <a href="/inventory"><button className='backBtn'>Low Stock Count Product List</button></a>
            <a href="/inventoryDetail"><button className='backBtn'>All Products</button></a>
            
            
            <form className="create" onSubmit={this.onSubmit}>
    <h3>Add New Product</h3>

<label>Product Name: </label>
<input type="text" name="name" value={this.state.name}
    onChange={this.handleChange} id="formGroupExampleInput" required
    minLength="2" maxLength="50" pattern="[a-zA-Z0-9\s]+" title="Please enter valid characters: letters, numbers, and spaces."/>

<label>Category: </label>
<input type="text" name="category" value={this.state.category}
    onChange={this.handleChange} id="formGroupExampleInput" required
    minLength="2" maxLength="50" pattern="[a-zA-Z\s]+" title="Please enter valid characters: letters and spaces only."/>

<label>Price(LKR): </label>
<input type="number" name="price" value={this.state.price}
    onChange={this.handleChange} id="formGroupExampleInput" step="0.01" min="0" required/>

<label>Quantity: </label>
<input type="number" name="quantity" value={this.state.quantity}
    onChange={this.handleChange} id="formGroupExampleInput" min="0" required/>

<label>Capacity(ml): </label>
<input type="number" name="capacity" value={this.state.capacity}
    onChange={this.handleChange} id="formGroupExampleInput" required
    min="0" max="10000" pattern="[0-9]{1,5}" title="Please enter a valid number between 0-10000."/>

<label>Material: </label>
<input type="text" name="material" value={this.state.material}
    onChange={this.handleChange} id="formGroupExampleInput" required
    minLength="2" maxLength="50" pattern="[a-zA-Z\s]+" title="Please enter valid characters: letters and spaces only."/>

<label>Percentage(%): </label>
<input type="number" name="percentage" value={this.state.percentage}
    onChange={this.handleChange} id="formGroupExampleInput" step="0.01" required
    min="0" max="100" pattern="[0-9]{1,3}" title="Please enter a valid number between 0-100."/>

<label>Country: </label>
<input type="text" name="country" value={this.state.country}
    onChange={this.handleChange} id="formGroupExampleInput" required
    minLength="2" maxLength="50" pattern="[a-zA-Z\s]+" title="Please enter valid characters: letters and spaces only."/>

<label>Description: </label>
<textarea name="description" value={this.state.description}
    onChange={this.handleChange} id="formGroupExampleInput" required
    minLength="10" maxLength="500" title="Please enter a valid description between 10-500 characters."/>

<label>URL of the Image: </label>
<input type="url" name="image" value={this.state.image}
    onChange={this.handleChange} id="formGroupExampleInput" required/>



    <center><button className='formBtn' type="submit" onClick={this.onSubmit}>Add Product</button></center>  
  </form>
        </div>
    )
}

 }









