
import React, { Component } from "react";
import axios from 'axios';
import "./leave.css"
import "./contact.css"

export default class Leave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaves: [],
            NIC: props.loggedInNIC,
            leaveDate: '',
            reason: '',
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

        const { NIC, leaveDate, reason } = this.state;

        const data = {
            NIC: NIC,
            leaveDate: leaveDate,
            reason: reason
        }
        console.log(data);

        axios.post("/leave/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.reload()

                this.setState(
                    {
                        NIC: "",
                        leaveDate: "",
                        reason: ""
                    }
                )
            }
        })

    }



    render() {
        return (
            <div className='container'>
            <div class="createLeave">

                <h3>Add Leave Request</h3>
                <form>


                    {/* <label>NIC: </label> */}
                    <input
                        type="text"
                        name="NIC"
                        value={this.state.NIC}
                        onChange={this.handleChange}
                        required
                        minLength="10"
                        placeholder={this.props.loggedInNIC}
                        readOnly
                        style={{ display: 'none' }}
                    />


                    <label>Date: </label>
                    <input
                        type="date"
                        name="leaveDate"
                        value={this.state.leaveDate}
                        onChange={this.handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />


                    <label>Reason: </label>
                    <input
                        type="text"
                        name="reason"
                        value={this.state.reason}
                        onChange={this.handleChange}
                        required
                    />
                    <center><button className="formBtn" type="submit" onClick={this.onSubmit}>
                        Submit</button><br /></center>




                </form>
            </div>
            </div>
        )
    }
}
