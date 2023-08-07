
import React, {Component} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

function withParams(Component) {
    return props => <Component params={
        useParams()
    }/>
}

class PrintPreviewIncome extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            finance: []
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddIncome/posts").then(res => {
            if (res.data.success) {
                this.setState({finance: res.data.existingPosts});
                console.log(this.state.finance)
            }
        });
    }


    // edit
    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
        this.status = value;
    }

    // onSave = (id) => {


    //     let data = this.state.posts.filter((post) => post._id === id)[0];
    //     data.status = this.status;


    //     axios.put(`/post/${id}`, data).then((res) => {
    //         if (res.data.success) {
    //             console.log(res.data.success._id);
    //             alert("Updated Successfully");
    //             var id = res.data.success._id


    //             this.setState({
    //                 name: "",
    //                 email: "",
    //                 message: "",
    //                 address: "",
    //                 town: "",
    //                 phone: ""
    //             })
    //         }
    //     })
    // }

   onDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    axios.delete(`/AddIncome/post/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrievePosts();
});
}
};

handlePrint = () => {
    const doc = new jsPDF();
    const table = document.getElementById("IncomeTable");
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
            doc.text("Income Detail List", 80, 80);


            doc.autoTable({
                html: "#IncomeTable",
                startY: 90,
            });

            doc.save("Income_Detail_Table.pdf");
        })
        .catch(error => {
            console.error("Error loading logo image:", error);
        });
};

    render() {
        return (
           
            <div className='mt-5'>
          <div className="container">
                <div className="add_btn mt-2 mb-2">
                <button onClick={this.handlePrint}  className='backBtn'>Save </button>
                <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
                <a href="/IncomeList"><button className='backBtn'>Income List</button></a>
                <h2><b>Supreme Wine Stores</b></h2>
                        <p>Address: Supreme Wine Stores, No10,Gamini Road, Galle</p>
                        <p>Phone: 0915676543</p>
                        <p>Email: supreme@gmail.com</p>

                    </div>
                    <h3>Income Detail List</h3>
                <div className="table-responsive">
                     <table class="table" id = "IncomeTable">
                         <thead>
                            <tr className="table-dark" >
                            <th scope="col" >Report ID</th>
                                 <th scope="col" >Date</th>
                                <th scope="col">Category</th>
                                <th scope="col" >Remarks</th>
                                <th scope="col" >Amount(LKR)</th>
                                 <th scope="col" >Status</th>
                                 <th scope="col" ></th>
                            
                             </tr>
                         </thead>
                         <tbody> {
                            this.state.finance.map((finance, index) => (
                                <tr key={index}>

                                    <th scope="row">
                                        {
                                        index + 1
                                    }</th>

                                    <td> {
                                        finance.date.substring(0,10)
                                    }</td>

                                    <td>{
                                        finance.category
                                    }</td>

                                    <td>{
                                        finance.remarks
                                    }</td>

                                    <td>{
                                        finance.amount
                                    }</td>

                                    <td>{
                                        finance.status
                                    }</td>
                                 

                                    


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

export default withParams(PrintPreviewIncome);