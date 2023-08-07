import React, { useState, Component } from 'react'
import './form.css'
import axios from 'axios';


//const AddOffer = () => {
export default class AddOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: [],
            oname: '',
            odes: '',
            oval: '',
            sdate: '',
            edate: '',
            min: '',
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

        const { oname, odes, oval, sdate, edate, min } = this.state;

        const data = {
            oname: oname,
            odes: odes,
            oval: oval,
            sdate: sdate,
            edate: edate,
            min: min

        }
        console.log(data);

        axios.post("/AddOffer/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/OfferList`;

                this.setState(
                    {
                        oname: "",
                        odes: "",
                        oval: "",
                        sdate: "",
                        edate: "",
                        min: ""
                    }
                )
            }
        })

    }



    render() {
        return (
            <div className='container'>
                <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                <a href="/OfferList"><button className='backBtn'>Promotional Offers List</button></a>

                <form className="create" onSubmit={this.onSubmit}>
                    <h3>Add New Offer</h3>

                    <label>Promotional Offer Name: </label>
                    <input type="text" name="oname" value={this.state.oname} onChange={this.handleChange} required />

                    <label>Promotional Offer Description </label>
                    <input type="text" name="odes" value={this.state.odes} onChange={this.handleChange} required />

                    <label>Discount Value (Rs.)</label>
                    <input type="text" name="oval" value={this.state.oval} onChange={this.handleChange} required />

                    <label>Start Date </label>
                    <input type="date" name="sdate" value={this.state.sdate} onChange={this.handleChange} required />

                    <label>End Date </label>
                    <input type="date" name="edate" value={this.state.edate} onChange={this.handleChange} required />

                    <label>Minimum Purchase Amount (Rs.)</label>
                    <input type="number" name="min" value={this.state.min} onChange={this.handleChange} required  />

                    
                    <center>
                        <button className='formBtn' type="submit">Add Offer</button>
                    </center>
                </form>

            </div>
        )
    }

}