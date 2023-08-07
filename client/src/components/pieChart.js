import React, { Component } from "react";
import Chart from "react-apexcharts";

class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: [],
      expense: [],
    };
  }

  componentDidMount() {
    const fIncome = [];
    const fExpense = [];
    const getStudentdata = async () => {
      const reqData = await fetch(
        "http://localhost/reactgraphtutorial/marks"
      );
      const resData = await reqData.json();
      for (let i = 0; i < resData.length; i++) {
        fIncome.push(resData[i].income);
        fExpense.push(parseInt(resData[i].expense));
      }
      this.setState({ income: fIncome, expense: fExpense });
    };

    getStudentdata();
  }

  render() {
    const { income, expense } = this.state;
    return (
      <React.Fragment>
        <div className="container">
        <h3 className="mt-3">Welcome to Pie Chart </h3>
        <a href="/adminDashboard">
            <button className="backBtn">Dashboard </button>
          </a>
          <a href="/IncomeList">
            <button className="backBtn">Income </button>
          </a>
          <a href="/ExpenseList">
            <button className="backBtn">Expense </button>
          </a>
        </div>
        <div className="container-fluid mb-3">
         
          <Chart
            type="pie"
            width={1349}
            height={550}
            series={[59, 41]}
            options={{
              noData: { text: "Empty Data" },
              labels: ["Income", "Expense"],
            }}
          ></Chart>
        </div>
        
      </React.Fragment>
    );
  }
  
}

export default Piechart;
