import React, { Component } from "react";
import axios from 'axios';
import "./delivery.css"
import NavBar from './NavBar';

export default class InformationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: [],
            name: '',
            address: '',
            email: '',
            message: '',
            town: '',
            phone: ''
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

        const { name, email, message, town, address, phone } = this.state;

        const data = {
            name: name,
            address: address,
            email: email,
            message: message,
            town: town,
            phone: phone

        }
        console.log(data);

        axios.post("/informationForm/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/DisplayInfo/${id}`;

                this.setState(
                    {
                        name: "",
                        address: "",
                        email: "",
                        message: "",
                        town: "",
                        phone: ""
                    }
                )
            }
        })

    }

    render() {
        return (
            <div >
                <NavBar />
                <div class="head-title">
                    <h1>Please enter your details below</h1>
                </div>
                <div class="delivery-form">
                    <h2>Information Form</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <p for="formGroupExampleInput" class="form-label">Name</p>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <p for="formGroupExampleInput2" class="form-label">Address</p>
                            <input
                                type="address"
                                className="form-control"
                                id="address"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleChange}
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        {/* <div className="form-group">
                            <p for="exampleFormControlTextarea1" class="form-label">Email</p>
                            <textarea
                             
                                className="form-control"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div> */}

                        <div className="form-group">
                            <p for="formGroupExampleInput2" class="form-label">Email</p>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>




                        <div className="form-group">
                            <p for="exampleFormControlTextarea1" class="form-label">Phone</p>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                placeholder="Enter your phone"
                                required pattern="[0-9]{10}"
                                title="Please enter a valid 10 digit phone number"
                            />
                        </div>

                        {/* <div className="form-group">
                            <p>Phone: </p>
                            <input
                                type="tel"
                                name="phone"
                                value={this.state.phone}
                                placeholder="Enter your phone number"
                                onChange={this.handleChange}
                                required pattern="[0-9]{10}"
                                title="Please enter a valid 10 digit phone number" />
                        </div> */}

                        <div className="form-group">
                            <p for="exampleFormControlTextarea1" class="form-label">Town</p>
                            <textarea
                                className="form-control"
                                id="town"
                                name="town"
                                value={this.state.town}
                                onChange={this.handleChange}
                                placeholder="Enter your town"

                            />
                        </div>

                        <div className="form-group">
                            <p for="exampleFormControlTextarea1" class="form-label">Notes</p>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                placeholder="Enter your Notes"

                            />
                        </div>

                        <button type="submit" className="btn-contact" style={{ marginTop: '15px' }}>
                            Submit
                        </button>
                    </form>
                </div>



            </div>
        )
    }
}