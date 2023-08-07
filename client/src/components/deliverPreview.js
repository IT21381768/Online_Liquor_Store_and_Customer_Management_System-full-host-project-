
import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}

class deliverPreview extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            details: []
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/informationForm/posts").then(res => {
            if (res.data.success) {
                this.setState({ details: res.data.existingPosts });
                console.log(this.state.details)
            }
        });
    }


    // edit
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
        this.status = value;
    }

    onSave = (id) => {
        let data = this.state.details.filter((post) => post._id === id)[0];
        data.status = this.status;

        axios.put(`/informationForm/post/${id}`, data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                alert("Updated Successfully");
                var id = res.data.success._id

                this.setState({
                    name: "",
                    email: "",
                    message: "",
                    address: "",
                    town: "",
                    phone: ""
                })
            }
        })
    }

    onDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            axios.delete(`/informationForm/post/${id}`).then((res) => {
                alert("Delete Successfully");
                this.retrievePosts();
            });
        }
    };

    //print
    // handlePrint = () => {
    //     const doc = new jsPDF();
    //     const table = document.getElementById("deliveryTable");
    //     const tableRows = table.querySelectorAll("tr");
    
    //     // Add header
    //     doc.text("Supreme Wine Stores", 10, 10);
    //     doc.text("Address: Supreme Wine Stores, No10,Gamini Road, Galle", 10, 20);
    //     doc.text("Phone: 0915676543", 10, 30);
    //     doc.text("Email: suprime@gmail.com", 10, 40);
    //     doc.text("Delivery List", 10, 60);
    
    //     // Add table
    //     doc.autoTable({
    //       html: "#deliveryTable",
    //       startY: 70
    //     });
    
    
    //     doc.save("deliveryTable.pdf");
    // };

    handlePrint = () => {
        const doc = new jsPDF();
        const table = document.getElementById("deliveryTable");
        const tableRows = table.querySelectorAll("tr");
      
        
        fetch("../images/sprmeLogo.png")
          .then(response => response.arrayBuffer())
          .then(logoData => {
            const logoUrl = URL.createObjectURL(new Blob([logoData]));
      
            
            doc.addImage(logoUrl, "PNG", 10, 21, 40, 40); 
            doc.text("Supreme Wine Stores", 55, 30);
            doc.text("Address: Supreme Wine Stores, No.10, Gamini Road, Galle", 55, 40);
            doc.text("Phone: 0915676543", 55, 50);
            doc.text("Email: supreme@gmail.com", 55, 60);
            doc.text("Employee Detail List", 80, 80); 
      
            
            doc.autoTable({
              html: "#deliveryTable",
              startY: 90,
            });
      
            doc.save("Delivery_Detail_Table.pdf");
          })
          .catch(error => {
            console.error("Error loading logo image:", error);
          });
      };
    

    render() {
        return (
            <div>
                <div className='mt-5'>
                    <div className="container">
                        
                        <div className="add_btn mt-2 mb-2">
                        <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                        <a href="/admindelivery"><button className='backBtn'>Delivery List</button></a>
                            <button onClick={this.handlePrint} className="backBtn">Save</button><br/>
                            <h2><b>Supreme Wine Stores</b></h2>
                            <p>Address: Supreme Wine Stores, No10,Gamini Road, Galle</p>
                            <p>Phone: 0915676543</p>
                            <p>Email: suprime@gmail.com</p>
                            <h3>Delivery</h3>
                        </div>

                        <div className="table-responsive">
                            <table className="table" id="deliveryTable">
                                
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Town</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.details.map((details, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{details.name}</td>
                                            <td>{details.address}</td>
                                            <td>{details.email}</td>
                                            <td>{details.phone}</td>
                                            <td>{details.town}</td>
                                            <td>{details.message}</td>
                                            <td>{details.status}</td>
                                            


                                        
                                    </tr>
                                ))
                            } </tbody>


                        </table>


                        
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withParams(deliverPreview);