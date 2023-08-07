import React, { Component } from "react";
import axios from 'axios';
import "./contact.css"

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            name: '',
            email: '',
            message: '',
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

        const { name, email, message } = this.state;

        const data = {
            name: name,
            email: email,
            message: message
        }
        console.log(data);

        axios.post("/contact/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/contactdisplay/${id}`;

                this.setState(
                    {
                        name: "",
                        email: "",
                        message: ""
                    }
                )
            }
        })

    }





    render() {
        return (
            <div >


                <section id="about" class="about section-padding">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-4 col-md-12 col-12">
                                <div class="about-img">
                                    <img src="https://images.pexels.com/photos/13927674/pexels-photo-13927674.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" class="img-fluid" />
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
                                <div class="about-text">
                                    <h2>ABOUT</h2>
                                    <p>The Story of Supreme Wine Stores is that are covering at least 560 places
                                        around it which opened its doors in 2018, is a great
                                        story of continuous product improvement and the highest quality standards of liquor products.</p>
                                    <p> In here, Customers can visit to their liquor store and choose different types of
                                        liquor products such as wines, beers, vodka, gin etc and buy those products manually.</p>
                                    <p>Address:  Suprime Wine Stores, No10,Gamini Road, Galle</p>
                                    <p>Phone: 0915676543</p>
                                    <p>Email: suprime@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="contact-form">
                    <h2>Contact Form</h2>
                    {/* <form>


                        <p for="formGroupExampleInput" class="form-label">Name</p>
                        <input type="text" class="form-control" name="name" value={this.state.name}
                            onChange={this.handleChange} id="formGroupExampleInput" placeholder="Enter your name" />


                        <p for="formGroupExampleInput2" class="form-label">Email</p>
                        <input type="text" class="form-control" name="email" value={this.state.email}
                            onChange={this.handleChange} id="formGroupExampleInput2" placeholder="Enter your email" />

                        <p for="exampleFormControlTextarea1" class="form-label">Message</p>
                        <textarea class="form-control" name="message" value={this.state.message}
                            onChange={this.handleChange} id="exampleFormControlTextarea1" placeholder="Enter your message" rows="3"></textarea>


                        <button className="btn-contact" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i> Submit</button><br />






                    </form> */}

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
                            <p for="exampleFormControlTextarea1" class="form-label">Message</p>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                placeholder="Enter your message"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-contact" style={{ marginTop: '15px' }}>
                            Submit
                        </button>
                    </form>

                </div>



                <div class="contact-form-2">

                    <form>
                        <h2>INFORMATION</h2>
                        <p>One of the world's top online liquor stores, was founded on the ideal of delivering the best spirits at the best prices. </p>
                        <br /><p><span class="fa fa-star"></span> Address:  Suprime Wine Stores, No10,Gamini Road, Galle</p>
                        <p><span class="fa fa-star"></span> Phone: 0915676543</p>
                        <p><span class="fa fa-star"></span> Email: supreme@gmail.com</p>
                    </form>
                </div>




            </div>
        )
    }
}
