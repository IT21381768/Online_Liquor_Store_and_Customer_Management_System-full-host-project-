
import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./delivery.css"
import Swal from 'sweetalert2';
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class DisplayInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      details: [],
      name: '',
      email: '',
      message: '',
      phone: '',
      address: '',
      town: ''
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/informationForm/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          details: res.data.post
        });
        console.log(this.state.details);
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
    // e.preventDefault();
    const id = this.state.id

    const { name, email, message, phone, address, town } = this.state;

    let data = this.state.details;
    data = {
      name: name.length != 0 ? name : data.name,
      email: email.length != 0 ? email : data.email,
      message: message.length != 0 ? message : data.message,
      phone: phone.length != 0 ? phone : data.phone,
      address: address.length != 0 ? address : data.address,
      town: town.length != 0 ? town : data.town,
      status: "ORDERED"
    }

  //   axios.put(`/informationForm/post/${id}`, data).then((res) => {
  //     if (res.data.success) {
  //       console.log(res.data.success._id);
  //       alert("Updated Successfully");
  //       var id = res.data.success._id

  //       this.setState(
  //         {
  //           name: "",
  //           email: "",
  //           message: "",
  //           address: "",
  //           town: "",
  //           phone: ""
  //         }
  //       )
  //     }
  //   })
  // }

  axios.put(`/informationForm/post/${id}`, data).then((res) => {

    if (res.data.success) {
      Swal.fire({
        title: 'Updated Successfully!',
        text: 'Your changes have been saved.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        this.setState({
          name: "",
            email: "",
            message: "",
            address: "",
            town: "",
            phone: ""

        });

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



  // onDelete = (id) => {
  //   axios.delete(`/informationForm/post/${id}`).then((res) => {
  //     alert("Deleted Successfully");
  //     this.retrievePosts();
  //   })
  // }


//   onDelete = (id) => {
//     Swal.fire({
//         title: 'Are you sure you want to delete this?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#FFB400',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             axios.delete(`/informationForm/post/${id}`).then((res) => {
//                 Swal.fire({
//                     title: 'Deleted!',
//                     text: 'Your post has been deleted.',
//                     icon: 'success',
//                     timer: 2000, // show alert for 2 seconds
//                     timerProgressBar: true, // show progress bar
//                     onClose: () => {
//                         // do something when the alert is closed
//                         this.retrievePosts();
//                     }
//                 });
//             });
//         }
//     });
// };

  render() {
    const { _id, name, address, email, message, town, phone } = this.state.details;
    return (
      <div>





        <div class="delivery-form-display">
          <form>
            <h2>Your Details</h2>
            <p for="formGroupExampleInput" class="form-label">Name</p>
            <input type="text" class="form-control" name="name" value={this.state.name}
              onChange={this.handleChange} id="formGroupExampleInput" placeholder={name} />

            <p for="exampleFormControlTextarea1" class="form-label">Address</p>
            <textarea class="form-control" name="address" value={this.state.address}
              onChange={this.handleChange} id="exampleFormControlTextarea1" placeholder={address} rows="3"></textarea>

            <p for="formGroupExampleInput2" class="form-label">Email</p>
            <input type="text" class="form-control" name="email" value={this.state.email}
              onChange={this.handleChange} id="formGroupExampleInput2" placeholder={email} />

            <p for="formGroupExampleInput2" class="form-label">Phone</p>
            <input type="text" class="form-control" name="phone" value={this.state.phone}
              onChange={this.handleChange} id="formGroupExampleInput2" placeholder={phone} />

            <p for="formGroupExampleInput" class="form-label">Town</p>
            <input type="text" class="form-control" name="town" value={this.state.town}
              onChange={this.handleChange} id="formGroupExampleInput" placeholder={town} />

            <p for="exampleFormControlTextarea1" class="form-label">Notes</p>
            <textarea class="form-control" name="message" value={this.state.message}
              onChange={this.handleChange} id="exampleFormControlTextarea1" placeholder={message} rows="3"></textarea>

            {/* <button className="btn-dilivery-edit" type="submit" style={{ marginTop: '15px' }} onClick={() => this.onDelete([_id])}>
              <i className="fas fa-trash-alt"></i> Delete</button><br /> */}

            <button className="btn-dilivery-edit" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>

              <i className="fas fa-edit"></i> Update

            </button><br />

            
              <button className="btn-dilivery-edit" type="submit" style={{ marginTop: '15px' }} >
              <a href={`/deliveyStatus/${_id}`}>
                <i className="fa fa-arrow-circle-right"></i> Next  </a>
              </button>
            

          </form>
        </div>

      </div>




    )
  }
}



export default withParams(DisplayInfo);






