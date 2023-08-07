import React, { useState, Component } from 'react'
import './form.css'
import axios from 'axios';


//const AddSupplier = () => {
export default class AddSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: [],
            snname: '',
            sname: '',
            address: '',
            email: '',
            website: '',
            phone: '',
            status: '',
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

        const { snname, sname, address, email, website, phone, status } = this.state;

        const data = {
            snname: snname,
            sname: sname,
            address: address,
            email: email,
            website: website,
            phone: phone,
            status: status

        }
        console.log(data);

        axios.post("/AddSupplier/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/SupplierList`;

                this.setState(
                    {
                        snname: "",
                        sname: "",
                        address: "",
                        email: "",
                        website: "",
                        phone: "",
                        status: ""
                    }
                )
            }
        })

    }



    render() {
        return (
            <div className='container'>
                <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
                <a href="/SupplierList"><button className='backBtn'>Supplier List</button></a>

                <form className="create" onSubmit={this.onSubmit}>
                    <h3>Add New Supplier</h3>

                    <label>Supplier Company Name: </label>
                    <input type="text" name="snname" value={this.state.snname} onChange={this.handleChange} required />

                    <label>Supplier Name: </label>
                    <input type="text" name="sname" value={this.state.sname} onChange={this.handleChange} required />

                    <label>Address: </label>
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} required />

                    <label>Email: </label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />

                    <label>Website: </label>
                    <input type="url" name="website" value={this.state.website} onChange={this.handleChange} required />

                    <label>Phone: </label>
                    <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} required pattern="[0-9]{10}" title="Please enter a valid 10 digit phone number" />

                    <label>Status: </label>
                    <input type="text" name="status" value={this.state.status} onChange={this.handleChange} required />

                    <center>
                        <button className='formBtn' type="submit">Add Supplier</button>
                    </center>
                </form>

            </div>
        )
    }

}