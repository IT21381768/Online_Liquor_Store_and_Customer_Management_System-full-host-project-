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

class contactPreview extends Component {

    constructor(props) {
        super(props);

        this.note = "";

        this.state = {
            id: props.params.id,
            posts: []
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/contactAdmin/posts").then(res => {
            if (res.data.success) {
                this.setState({ posts: res.data.existingPosts });
                console.log(this.state.posts)
            }
        });
    }



handlePrint = () => {
    const doc = new jsPDF();
    const table = document.getElementById("contactTable");
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
          html: "#contactTable",
          startY: 90,
        });
  
        doc.save("Contact_Detail_Table.pdf");
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
                        <a href="/contactAdmin"><button className='backBtn'>Contact List</button></a>
                            <button onClick={this.handlePrint} className="backBtn">Save</button><br/>
                            <h2><b>Suprime Wine Stores</b></h2>
                            <p>Address: Suprime Wine Stores, No10,Gamini Road, Galle</p>
                            <p>Phone: 0915676543</p>
                            <p>Email: suprime@gmail.com</p>
                            <h3>Contact Table</h3>
                        </div>
                      
                        <div className="table-responsive">
                            <table className="table" id="contactTable">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Notes</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.posts.map((posts, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{posts.name}</td>
                                            <td>{posts.email}</td>
                                            <td>{posts.message}</td>
                                            <td>{posts.note}</td>


                                            
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

export default withParams(contactPreview);