import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./form.css"
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class EditOffer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      Offer: [],
      oname: '',
      odes: '',
      oval: '',
      sdate: '',
      edate: '',
      min: '',
      
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/OfferList/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          offer: res.data.post
        });
        console.log(this.state.offer);
      }

    });
  }


  //edit 
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.state.id

    const {oname, odes, oval, sdate, edate, min } = this.state;

    let data =  this.state.offer;  
    data = {
      oname: oname.length != 0 ? oname : data.oname,
      odes: odes.length != 0 ? odes : data.odes,
      oval: oval.length != 0 ? oval : data.oval,
      sdate: sdate.length != 0 ? sdate : data.sdate,
      edate: edate.length != 0 ? edate : data.edate,
      min: min.length != 0 ? min : data.min
    }


    axios.put(`/EditOffer/post/${id}`, data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        alert("Updated Successfully");
        var id = res.data.success._id
        //window.location.href=`/contactdisplay/${id}`;

        this.setState(
          {
                oname: '',
                odes: '',
                oval: '',
                sdate: '',
                edate: '',
                min: ''
                
          }
        )
      }
    })

  }



  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/contact/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };


  render() {
    
    const { _id, oname, odes, oval, sdate, edate, min  } = this.state.Offer;
    return (
        <div className='container'>
        <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
        <a href="/OfferList"><button className='backBtn'>Offers List</button></a>
        
        <form className="create" >
        <h3>Add New Promotional Offer</h3>

        
        {/* <label>ID: </label>
        <input type="text" name="_id" value={this.state._id}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={_id}  /> */}



        <label>Promotional Offer Name: </label>
        <input type="text" name="oname" value={this.state.oname}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={oname}  />
       

        <label>Offer Description </label>
        <input type="text" name="odes" value={this.state.odes}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={odes} />

        <label>Discount Value (Rs.)</label>
        <input type="text" name="oval" value={this.state.oval}
                     onChange={this.handleChange} id="formGroupExampleInput"placeholder={oval}  />

        <label>Start Date </label>
        <input type="text" name="sdate" value={this.state.sdate}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={sdate}  />

        <label>End Date </label>
        <input type="text" name="edate" value={this.state.edate}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={edate} />

        <label>Minimum purchase Amount (Rs.)</label>
        <input type="text" name="min" value={this.state.min}
                     onChange={this.handleChange} id="formGroupExampleInput"  placeholder={min}/>

        <center><a href='/OfferList'><button className='formBtn' type="submit" onClick={this.onSubmit}>Update Offer</button></a></center>

        
        
    </form>
    </div>

     





    )
  }
}



export default withParams(EditOffer);