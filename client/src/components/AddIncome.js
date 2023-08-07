import React, {useState,Component} from 'react'
import './form.css'
import axios from 'axios';


//const AddSupplier = () => {
export default class AddIncome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finance: [],
            date: '',
            category: '',
            remarks: '',
            amount: '',
            status: '',
            
        }
    }


    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { date, category, remarks, amount, status } = this.state;

        const data = {
            date: date,
            category: category,
            remarks: remarks,
            amount: amount,
            status: status,

        }
        console.log(data);

        axios.post("/AddIncome/post", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.success._id);
                var id = res.data.success._id
                window.location.href = `/IncomeList`;

                this.setState(
                    {
                        date: "",
                        category: "",
                        remarks: "",
                        amount: "",
                        status:""
                    }
                )
            }
        })

    }

 render(){
    return (
        <div className='container'>
            <a href="/IncomeList"><button className='backBtn'>Income List</button></a>
            
            <form className="create" onSubmit={this.onSubmit}>
  <h3>Add Income Details</h3>

  {/* <label>Date: </label>
  <input type="date" name="date" value={this.state.date} onChange={this.handleChange} id="formGroupExampleInput" required max={new Date().toISOString().split("T")[0]} /> */}


<label>Date:</label>
<input
  type="date"
  name="date"
  value={this.state.date}
  onChange={this.handleChange}
  id="formGroupExampleInput"
  required
  min={new Date().toISOString().split("T")[0]}
  max={new Date().toISOString().split("T")[0]}
/>

  <label>Category: </label>
  <input type="text" name="category" value={this.state.category}
         onChange={this.handleChange} maxLength="50" required />

  <label>Remarks: </label>
  <textarea name="remarks" value={this.state.remarks}
            onChange={this.handleChange} maxLength="200" />

  <label>Amount(LKR): </label>
  <input type="number" name="amount" value={this.state.amount}
         onChange={this.handleChange} min="0" required />

  <label>Status: </label>
  <input type="text" name="status" value={this.state.status}
         onChange={this.handleChange} maxLength="50" required />

  <center>
    <button className='formBtn' type="submit">Save</button>
  </center>
</form>

        </div>
    )
}

 }
   

