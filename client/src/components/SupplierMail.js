// import React, { useState } from 'react';
// import axios from 'axios';

// function SupplierMail() {
//   const [email, setEmail] = useState({});

//   const handleSendMail = () => {
//     axios.post('/sendmail', email)
//       .then(response => console.log(response.data))
//       .catch(error => console.error(error));
//   };

//   return (
//     <div>
//         <br></br>
//         <a href="/adminDashboard"><button className='backBtn'>Back to Dashboard</button></a>
//         <a href="/SupplierList"><button className='backBtn'>Supplier List</button></a>
//         <h3><b>Send Email To Supplier</b></h3>
//       <input type="text" placeholder="Email address" onChange={e => setEmail({ ...email, to: e.target.value })} />
//       <input type="text" placeholder="Subject" onChange={e => setEmail({ ...email, subject: e.target.value })} />
//       <textarea placeholder="Message" onChange={e => setEmail({ ...email, text: e.target.value })}></textarea>
//       <br></br>
//       <br></br>
//       <button onClick={handleSendMail}>Send Mail</button>
//     </div>
//   );
// }

// export default SupplierMail;





import React, { Component } from 'react';
import axios from 'axios';

class SupplierMail extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    error: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, message } = this.state;
    try {
      await axios.post('/api/send-email', { name, email, message });
      alert('Email sent successfully');
      this.setState({ name: '', email: '', message: '', error: '' });
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Error sending email' });
    }
  };

  render() {
    const { name, email, message, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleInputChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={message}
          onChange={this.handleInputChange}
        />
        <button type="submit">Send Email</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
  }
}

export default SupplierMail;
