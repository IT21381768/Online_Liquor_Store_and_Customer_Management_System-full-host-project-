import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
function withParams(Component) {
    return props => <Component params={
        useParams()
    } />
}
class PrintPreviewSales extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
          id: props.params.id,
          sales: [],
          searchKey:"",
      };
    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddSalesD/posts").then(res => {
            if (res.data.success) {
                this.setState({ sales: res.data.existingPosts });
                console.log(this.state.sales)
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
        let data = this.state.sales.filter((post) => post._id === id)[0];
        data.status = this.status;

        axios.put(`/AddSalesD/post/${id}`, data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                alert("Updated Successfully");
                var id = res.data.success._id

                this.setState({
                    

                })
            }
        })
    }


    onDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            axios.delete(`/AddSalesD/post/${id}`).then((res) => {
                alert("Delete Successfully");
                this.retrievePosts();
            });
        }
    };


    //search part
    handleSearchKeyChange = (e) => {
        const searchKey = e.currentTarget.value;
        this.setState({ searchKey });
        this.filterData(this.state.sales, searchKey);
    };

    filterData(posts, searchkey) {
        const result = posts.filter((post) =>
            post.Category.toLowerCase().includes(searchkey.toLowerCase())
        );
        this.setState({ sales: result });
    }

    resetSearch = () => {
        this.setState({ searchKey: "" }, () => {
            this.retrievePosts();
        });
    };



    handlePrint = () => {
        const doc = new jsPDF();
        const table = document.getElementById("salesTable");
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
                doc.text("Sales Detail List", 80, 80);


                doc.autoTable({
                    html: "#salesTable",
                    startY: 90,
                });

                doc.save("Sales_Detail_Table.pdf");
            })
            .catch(error => {
                console.error("Error loading logo image:", error);
            });
    };

    render() {
      const totalQuantity = this.state.sales.reduce((total, item) => total + item.Quantity, 0);
      const totalPrice = this.state.sales.reduce((total, item) => total + item.TPrice, 0);
      const TargetQuantity = this.state.sales.reduce((total, item) => total + item.TQuantity, 0);

        return (


            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                    </div>
                    <div className="add_btn mt-2 mb-2">
                       
                        <a href="/adminDashboard"><button className='backBtn'>Dashboard</button></a>
                        <a href="/Saleslist"><button className='backBtn'> Sales List</button></a>
                         <button onClick={this.handlePrint} className='backBtn'>PDF </button>
                        <h2><b>Supreme Wine Stores</b></h2>
                        <p>Address: Supreme Wine Stores, No10,Gamini Road, Galle</p>
                        <p>Phone: 0915676543</p>
                        <p>Email: supreme@gmail.com</p>

                    </div>
                    <div className="row">
                <div className="col-sm-4">
              <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-body1">
                  <h5 className="card-title" style={{ textAlign: 'center' }}>Target Quantity</h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>{TargetQuantity}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card1" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card-body1">
                  <h5 className="card-title" style={{ textAlign: 'center' }}>Total Quantity</h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>{totalQuantity}</p>
                </div>
              </div>
            </div>
            
            <div className="col-sm-4">
              <div className="card2" style={{ backgroundColor: 'white', border: '2px solid orange', borderRadius: '10px', width: '200px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="card-body2">
                <h5 className="card-title" style={{ textAlign: 'center' }}>Total Price</h5>
                <p className="card-text" style={{ textAlign: 'center' }}>LKR {totalPrice}</p>
              </div>
              </div>
              </div>
              </div>
                    <h3>Order Detail List</h3>

                    <div className="table-responsive">
                        <table class="table" id="salesTable">
                            <thead>
                                <tr className="table-dark" >
                                <th scope="col">ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Target Quantity</th>
                                <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody> {
                                this.state.sales.map((sales, index) => (
                                  <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{sales.Category}</td>
                                  <td>{sales.type}</td>
                                  <td>{sales.Quantity}</td>
                                  <td>{sales.TQuantity}</td>
                                  <td>{sales.TPrice}</td>
                                </tr>
                                ))
                            } </tbody>


                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default withParams(PrintPreviewSales);