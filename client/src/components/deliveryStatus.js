
import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./status.css"

function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}

class deliveryStatus extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          id: props.params.id,
          name: '',
          email: '',
          message: '',
          phone: '',
          address: '',
          town: '',
          status: '',
        };
      }
    
      componentDidMount() {
        console.log(this.state.id);
        const id = this.state.id
        axios.get(`/informationForm/post/${id}`).then((res) => {
          console.log(res.data.post);
          if (res.data.success) {
            this.setState( res.data.post);
           
          }
    
        });
      }
    
    
    render() {
        return (
            <div>
               
                <ul class="step-wizard-list">
                    <li className={`step-wizard-item ${(this.state.status ==='') ? 'current-item':''}`}>
                        <span class="progress-count">1</span>
                        <span class="progress-label">Orderd</span>
                    </li>
                    <li className={`step-wizard-item ${(this.state.status ==='ORDERED') ? 'current-item':''}`}>
                        <span class="progress-count">2</span>
                        <span class="progress-label">Order Confirmed</span>
                    </li>
                    <li className={`step-wizard-item ${(this.state.status ==='CONFIRMED') ? 'current-item':''}`}>
                        <span class="progress-count">3</span>
                        <span class="progress-label">Order is being packing</span>
                    </li>
                    <li className={`step-wizard-item ${(this.state.status ==='PACKING') ? 'current-item':''}`}>
                        <span class="progress-count">4</span>
                        <span class="progress-label">Order ready for delivery</span>
                    </li>
                    <li className={`step-wizard-item ${(this.state.status ==='READY_FOR_DELIVERY') ? 'current-item':''}`}>
                        <span class="progress-count">5</span>
                        <span class="progress-label">Out for delivery</span>
                    </li>
                    <li className={`step-wizard-item ${(this.state.status ==='DELIVERYING') ? 'current-item':''}`}>
                        <span class="progress-count">6</span>
                        <span class="progress-label">Delivery completed</span>
                    </li>
                </ul>

            </div>
        )
    }
}

export default withParams(deliveryStatus);