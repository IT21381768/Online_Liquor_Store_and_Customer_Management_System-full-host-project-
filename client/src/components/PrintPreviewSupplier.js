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

class PrintPreviewSupplier extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            supplier: []
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddSupplier/posts").then(res => {
            if (res.data.success) {
                this.setState({ supplier: res.data.existingPosts });
                console.log(this.state.supplier)
            }
        });
    }
    handlePrint = () => {
        const doc = new jsPDF();
        const table = document.getElementById("SupplierTable");
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
                doc.text("Supplier Detail List", 80, 80);


                doc.autoTable({
                    html: "#SupplierTable",
                    startY: 90,
                });

                doc.save("Supplier.pdf");
            })
            .catch(error => {
                console.error("Error loading logo image:", error);
            });
    };




    render() {
        // const [count, setCount] = useState(0);

        return (


            <div className='mt-5'>


                <div className="container">
                    <div className="add_btn mt-2 mb-2">


                        <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
                        <a href="/SupplierList"><button className='backBtn'>Supplier List</button></a>
                        <button onClick={this.handlePrint} className='backBtn'>Save </button><br></br>
                        <h2><b>Supreme Wine Stores</b></h2>
                        <p>Address: Supreme Wine Stores, No10,Gamini Road, Galle</p>
                        <p>Phone: 0915676543</p>
                        <p>Email: supreme@gmail.com</p>

                    </div>
                    <h3>Supplier Detail List</h3>


                    <div className="add_btn mt-2 mb-2">

                        {/* <b>Total: {count}</b> */}
                        {/* <div style={{ marginLeft: '1100px' }}> <h1><b>Total: </b></h1></div> */}


                    </div>

                    <div className="table-responsive">
                        <table class="table" id="SupplierTable">
                            <thead>
                                <tr className="table-dark" >
                                    <th scope="col" >ID</th>
                                    <th scope="col" >Supplier Company Name</th>
                                    <th scope="col">Supplier Name</th>
                                    <th scope="col" >Phone</th>
                                    <th scope="col" >Status</th>


                                </tr>
                            </thead>
                            <tbody> {
                                this.state.supplier.map((supplier, index) => (
                                    <tr key={index}>

                                        <th scope="row">
                                            {
                                                index + 1
                                            }</th>

                                        <td> {
                                            supplier.snname
                                        }</td>

                                        <td>{
                                            supplier.sname
                                        }</td>

                                        <td>{
                                            supplier.phone
                                        }</td>

                                        <td>{
                                            supplier.status
                                        }</td>



                                        {/* <td onClick={
                                        () => this.onDelete(supplier._id)
                                    }>
                                        <a className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>

                                    <td>
                                    <a href={`/EditSupplier/${supplier._id}`} className="btn btn-success">
                                        <i className="fas fa-edit"></i>
                                        </a>
                                    </td> */}

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

export default withParams(PrintPreviewSupplier);