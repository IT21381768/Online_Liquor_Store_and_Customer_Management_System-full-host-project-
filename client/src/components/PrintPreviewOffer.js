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

class PrintPreviewOffer extends Component  {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            offer: []
        };

    }

    componentDidMount() {
        this.retrievePosts();

    }

    retrievePosts() {
        axios.get("/AddOffer/posts").then(res => {
            if (res.data.success) {
                this.setState({offer: res.data.existingPosts});
                console.log(this.state.offer)
            }
        });
    }
    handlePrint = () => {
        const doc = new jsPDF();
        const table = document.getElementById("OfferTable");
        const tableRows = table.querySelectorAll("tr");
    
        // Add header
        doc.text("Suprime Wine Stores", 10, 10);
        doc.text("Address: Supreme Wine Stores, No10,Gamini Road, Galle", 10, 20);
        doc.text("Phone: 0915676543", 10, 30);
        doc.text("Email: supreme@gmail.com", 10, 40);
        doc.text("Promotional Offers List", 10, 60);
    
        // Add table
        doc.autoTable({
          html: "#OfferTable",
          startY: 70
        });
    
        
        doc.save("Offer_Detail_Table.pdf");
    };


   

    render() {
        // const [count, setCount] = useState(0);
     
        return (
           
           
            <div className='mt-5'>

   
                    <div className="container">
                    <div className="add_btn mt-2 mb-2">
                           
                       
                        <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                        <a href="/OfferList"><button className='backBtn'>Promotional Offer List</button></a>
                         <button onClick={this.handlePrint}  className='backBtn'>Save </button>
                        <h2><b>Supreme Wine Stores</b></h2>
                        <p>Address: Supreme Wine Stores, No10,Gamini Road, Galle</p>
                        <p>Phone: 0915676543</p>
                        <p>Email: supreme@gmail.com</p>

                    </div>
                    <h3>Promotional Offers List</h3>


                        <div className="add_btn mt-2 mb-2">
                          
                            {/* <b>Total: {count}</b> */}
                            {/* <div style={{ marginLeft: '1100px' }}> <h1><b>Total: </b></h1></div> */}


                        </div>

                        <div className="table-responsive">
                            <table class="table" id="OfferTable">
                                <thead>
                                     <tr className="table-dark" >
                            <th scope="col" >Offer ID</th>
                                 <th scope="col" >Promotional Offer Name</th>
                                <th scope="col">Offer Description</th>
                                <th scope="col" >Discount Value</th>
                                <th scope="col" >Start Date</th>
                                 <th scope="col" >End Date</th>
                                 <th scope="col" >Min Purchase</th>
                                 <th scope="col" ></th>
                             </tr>
                                </thead>
                                <tbody> {
                                    this.state.offer.map((offer, index) => (
                                        <tr key={index}>

                                    <th scope="row">
                                        {
                                        index + 1
                                    }</th>

                                    <td> {
                                        offer.oname
                                    }</td>

                                    <td>{
                                        offer.odes
                                    }</td>

                                    <td>{
                                        offer.oval
                                    }</td>

                                    <td>{
                                        offer.sdate
                                    }</td>
                                    <td>{
                                        offer.edate
                                    }</td>
                                     <td>{
                                        offer.min
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

export default withParams(PrintPreviewOffer);