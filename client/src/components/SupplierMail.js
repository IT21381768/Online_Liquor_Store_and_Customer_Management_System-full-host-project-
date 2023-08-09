import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

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
      <div>
        <NavBar />
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
      </div>
    );
  }
}

export default SupplierMail;
