
import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import "./contact.css"
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class ContactDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      posts: [],
      name: '',
      email: '',
      message: '',
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/contact/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          posts: res.data.post
        });
        console.log(this.state.posts);
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

    const { name, email, message } = this.state;




    let data = this.state.posts;
    data = {
      name: name.length != 0 ? name : data.name,
      email: email.length != 0 ? email : data.email,
      message: message.length != 0 ? message : data.message
    }


    //   axios.put(`/contact/post/${id}`, data).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.success._id);
    //       alert("Updated Successfully");
    //       var id = res.data.success._id
    //       //window.location.href=`/contactdisplay/${id}`;

    //       this.setState(
    //         {
    //           name: "",
    //           email: "",
    //           message: ""
    //         }
    //       )
    //     }
    //   })

    // }

    axios.put(`/contact/post/${id}`, data).then((res) => {

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
            message: ""

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



  //  onDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     axios.delete(`/contact/post/${id}`).then((res) => {
  //       alert("Delete Successfully");
  //       this.retrievePosts();
  //     });
  //   }
  // };

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
//             axios.delete(`/contact/post/${id}`).then((res) => {
//                 Swal.fire(
//                     'Deleted!',
//                     'Your post has been deleted.',
//                     'success'
//                 )
//                 this.retrievePosts();
//                 window.location.href = `/contactdisplay/${id}`;
                
//             });
//         }
//     });
// };
 
  
  
  


  render() {
    const { _id, name, email, message } = this.state.posts;
    return (

      <div className="container-12">

        <h2>Contact</h2>
        <form>

          <p for="formGroupExampleInput" class="form-label">Name</p>
          <input type="text" class="form-control" name="name" value={this.state.name}
            onChange={this.handleChange} id="formGroupExampleInput" placeholder={name} />

          <p for="formGroupExampleInput2" class="form-label">Email</p>
          <input type="text" class="form-control" name="email" value={this.state.email}
            onChange={this.handleChange} id="formGroupExampleInput2" placeholder={email} />

          <p for="exampleFormControlTextarea1" class="form-label">Message</p>
          <textarea class="form-control" name="message" value={this.state.message}
            onChange={this.handleChange} id="exampleFormControlTextarea1" placeholder={message} rows="3"></textarea>

          {/* <button className="btn-contact-display" type="submit" style={{ marginTop: '15px' }} onClick={() => this.onDelete([_id])}>
            <i className="fas fa-trash-alt"></i> Delete</button><br /> */}

          <button className="btn-contact-display" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>

            <i className="fas fa-edit"></i> Edit

          </button>



        </form>


      </div>





    )
  }
}



export default withParams(ContactDisplay);






