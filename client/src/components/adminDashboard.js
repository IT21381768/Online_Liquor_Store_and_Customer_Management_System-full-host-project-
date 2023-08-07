import React from 'react'

const adminDashboard = () => {
  return (
    <div>
        <a href='/inventoryDetail'><button class="backBtn2">Inventory </button></a><br></br>
        <a href='/SupplierList'><button class="backBtn2">Supplier Details</button></a><br></br>
        <a href='/OrderList'><button class="backBtn2">Stock Order Details</button></a><br></br>
        <a href='/admindelivery'><button class="backBtn2">Delivery Details</button></a><br></br>
        <a href='/EmployeeList'><button class="backBtn2">Employees</button></a><br></br>
        {/* <a href='/IncomeList'><button class="backBtn2">Income</button></a><br></br>
        <a href='/ExpenseList'><button class="backBtn2">Expense</button></a><br></br> */}
        <a href='/SalesList'><button class="backBtn2">Sales</button></a><br></br>
        <a href='/OfferList'><button class="backBtn2">Promotional Offers</button></a><br></br>
        <a href='/contactAdmin'><button class="backBtn2">Contact Details List</button></a><br></br>
        <a href='/pieChart'><button class="backBtn2">Finance</button></a><br></br>

    </div>
  )
}

export default adminDashboard;