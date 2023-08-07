import React, {Component} from 'react';
import axios from 'axios';
import {useParams, useLocation,Link} from "react-router-dom";
function withParams(Component) {
    return props => <Component params={
        useParams()
    }/>
}

class OfferList extends Component {

    constructor(props) {
        super(props);

        this.status = "";

        this.state = {
            id: props.params.id,
            offer: [],
            searchKey:"",
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


    // edit
    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
        this.status = value;
    }

  

   onDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    axios.delete(`/AddOffer/post/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrievePosts();
});
}
};

//search part
handleSearchKeyChange = (e) => {
    const searchKey = e.currentTarget.value;
    this.setState({ searchKey });
    this.filterData(this.state.offer, searchKey);
};

filterData(posts, searchkey) {
    const result = posts.filter((post) =>
        post.Category.toLowerCase().includes(searchkey.toLowerCase())
    );
    this.setState({ offer: result });
}

resetSearch = () => {
    this.setState({ searchKey: "" }, () => {
        this.retrievePosts();
    });
};


    render() {
        const { searchKey } = this.state;
        const filteredOffer = this.state.offer.filter((offer) =>
            offer.oname.toLowerCase().includes(searchKey.toLowerCase())
        );
        return (
           
            <div className='mt-5'>
          <div className="container">
                <div className="add_btn mt-2 mb-2">
                <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
                <a href="/AddOffer"><button className='backBtn'>Add Promotional Offer</button></a>
                <a href="/PrintPreviewOffer"><button className='backBtn'>Print Preview</button></a>
                <form className="form-inline my-2 my-lg-9 ml-auto">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchKey}
                                onChange={this.handleSearchKeyChange}
                            />
                            <button
                                className="btn btn-outline-success my-2 my-sm-0"
                                type="button"
                                onClick={this.resetSearch}
                            >
                                Reset
                            </button>
                        </form>
                
                </div>

                

                <div className="table-responsive">
                     <table class="table" >
                         <thead>
                            <tr className="table-dark" >
                            <th scope="col" >Offer ID</th>
                                 <th scope="col" >Offer Name</th>
                                <th scope="col">Description</th>
                                <th scope="col" >Discounyt Value(Rs.)</th>
                                <th scope="col" >Start Date</th>
                                 <th scope="col" >End Date</th>
                                 <th scope="col" >Min Purchase(Rs.)</th>
                                 <th scope="col" ></th>
                                 <th></th>
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

                                    <td onClick={
                                        () => this.onDelete(offer._id)
                                    }>
                                        <a className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>

                                    <td>
                                        <a href={`/EditOffer/${offer._id}`} className="btn btn-success">
                                        <i className="fas fa-edit"></i>
                                        </a>
                                    </td>

                                    {/* <td >
                                        <a component={Link} to={`/sales/${sales._id}`} className="btn btn-success">
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

export default withParams(OfferList);