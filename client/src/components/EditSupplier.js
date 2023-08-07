import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./form.css"
import Swal from 'sweetalert2';
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class EditSupplier extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      supplier: [],
      snname: '',
      sname: '',
      address: '',
      email: '',
      website: '',
      phone: '',
      status: '',
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/SupplierList/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          supplier: res.data.post
        });
        console.log(this.state.supplier);
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
  this.note = value;
}

onSubmit = (e) => {
  e.preventDefault();
  const id = this.state.id

  const { snname, sname, address, email, website, phone, status } = this.state;

  let data = this.state.supplier;
  data = {
    snname: snname.length != 0 ? snname : data.snname,
    sname: sname.length != 0 ? sname : data.sname,
    address: address.length != 0 ? address : data.address,
    email: email.length != 0 ? email : data.email,
    website: website.length != 0 ? website : data.website,
    phone: phone.length != 0 ? phone : data.phone,
    status: status.length != 0 ? status : data.status,

  }

  axios.put(`/EditSupplier/post/${id}`, data).then((res) => {

    if (res.data.success) {
      Swal.fire({
        title: 'Updated Successfully!',
        text: 'Your changes have been saved.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        this.setState({
          snnname: '',
          sname: '',
          address: '',
          email: '',
          website: '',
          phone: '',
          status: ''

        });
        window.location.href = `/SupplierList`;
      });
    }
  }).catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'An error occurred while updating the post. Please try again later.',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  });
};



  render() {

    const { _id, snname, sname, address, email, website, phone, status } = this.state.supplier;
    return (
      <div className='container'>
        <a href="/adminDashboard"><button className='backBtn'> Dashboard</button></a>
        <a href="/SupplierList"><button className='backBtn'>Supplier List</button></a>

        <form className="create" >
          <h3>Update Supplier</h3>

          <label>Supplier Company Name: </label>
          <input type="text" name="snname" value={this.state.snname}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={snname} />


          <label>Supplier Name: </label>
          <input type="text" name="sname" value={this.state.sname}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={sname} />

          <label>Address: </label>
          <input type="text" name="address" value={this.state.address}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={address} />

          <label>Email: </label>
          <input type="text" name="email" value={this.state.email}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={email} />

          <label>Website: </label>
          <input type="text" name="website" value={this.state.website}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={website} />

          <label>Phone: </label>
          <input type="number" name="phone" value={this.state.phone}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={phone} />

          <label>Status: </label>
          <input type="text" name="status" value={this.state.status}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={status} />


          <center><a href='/SupllierList'><button className='formBtn' type="submit" onClick={this.onSubmit}>Update Supplier</button></a></center>



        </form>
      </div>







    )
  }
}



export default withParams(EditSupplier);