import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import ContactDisplay from './components/ContactDisplay';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import InformationForm from './components/InformationForm';
import DisplayInfo from './components/DisplayInfo';
import Spirits from './components/categories/spirits';
import Category_details from './components/categories/category_details';
import CartPage from './components/cartPage';
import AdminDelivery from './components/AdminDelivery';
import ContactAdmin from './components/ContactAdmin';
import DeliverPreview from './components/deliverPreview';
import DeliveryStatus from './components/deliveryStatus';
import ContactPreview from './components/contactPreview';
import SupplierList from './components/SupplierList';
import AddSupplier from './components/AddSupplier';
import EditSupplier from './components/EditSupplier';
import OrderList from './components/OrderList';
import SupplierMail from './components/SupplierMail';
import AddOrder from './components/AddOrder';
import PrintPreviewSupplier from './components/PrintPreviewSupplier';
import PrintPreviewOrder from './components/PrintPreviewOrder';
import AddSalesD from './components/AddSalesD';
import EditSalesD from './components/EditSalesD';
import SalesList from './components/SalesList';
import PrintPreviewSales from './components/PrintPreviewSales';
import Inventory from './components/inventory';
import InventoryDetail from './components/inventoryDetail';
import AddProduct from './components/addProduct';
import AdminDashboard from './components/adminDashboard';
import EditInventory from './components/editInventory';
import PrintPreviewInventory from './components/printPreviewInventory';
import OfferList from './components/OfferList';
import AddOffer from './components/AddOffer';
import EditOffer from './components/EditOffer';
import PrintPreviewOffer from './components/PrintPreviewOffer';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeePreview from './components/EmployeePreview';
import Leave from './components/Leave'
import LeaveAdmin from './components/LeaveAdmin'
import LeaveDisplay from './components/LeaveDisplay'
import EmpLoginPage from './components/EmpLoginPage';
import EmpWelcome from './components/EmpWelcome';
import IncomeList from './components/IncomeList';
import EditIncome from './components/EditIncome';
import EditExpense from './components/EditExpense';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import PrintPreviewIncome from './components/PrintPreviewIncome';
import PrintPreviewExpense from './components/PrintPreviewExpense';
import AddIncome from './components/AddIncome';
import PieChart from './components/pieChart';
import LoginPage from './components/LoginPage';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/contactdisplay/:id" exact element={<ContactDisplay />} />
            <Route path="/contact" exact element={<Contact />} />
          
   
          <Route path="/informationForm" exact element={<InformationForm />} />
          <Route path="/DisplayInfo/:id" exact element={<DisplayInfo />} />

  
          <Route path="/adminDashboard" exact element={<AdminDashboard />} />

          

         <Route path="/spirits" exact element={<Spirits />} />
            <Route path="/categoryDetails" exact element={<Category_details />} />
            <Route path="/cartPage" exact element={<CartPage />} />

            <Route path="/admindelivery" exact element={<AdminDelivery />} />
            <Route path="/deliveyStatus/:id" exact element={<DeliveryStatus />} />

            <Route path="/printPreview" exact element={<DeliverPreview />} />
            <Route path="/printContactPreview" exact element={<ContactPreview />} />

            <Route path="/contactAdmin" exact element={<ContactAdmin />} />

            

            <Route path="/EmployeeList" exact element={<EmployeeList/>}/>
          <Route path="/AddEmployee" exact element={<AddEmployee/>}/>
          <Route path="/EditEmployee/:id" exact element={<EditEmployee/>}/>
          <Route path="/EmployeePreview" exact element={<EmployeePreview/>}/>

          <Route path="/EmpLoginPage" exact element={<EmpLoginPage/>}/>
          <Route path="/EmpWelcome" exact element={<EmpWelcome/>}/>


          <Route path="/Leave" exact element={<Leave/>}/>
          <Route path="/LeaveAdmin" exact element={<LeaveAdmin/>}/>
          <Route path="/LeaveDisplay" exact element={<LeaveDisplay/>}/>

          <Route path="/SupplierList" exact element={<SupplierList />} />
            <Route path="/AddSupplier" exact element={<AddSupplier />} />
            <Route path="/EditSupplier/:id" exact element={<EditSupplier />} />
            <Route path="/OrderList" exact element={<OrderList />} />
            <Route path="/SupplierMail" exact element={<SupplierMail />} />
            <Route path="/AddOrder" exact element={<AddOrder />} />
            <Route path="/PrintPreviewSupplier" exact element={<PrintPreviewSupplier />} />
            <Route path="/OrderList" exact element={<OrderList />} />
            <Route path="/PrintPreviewOrder" exact element={<PrintPreviewOrder />} />

            <Route path="/SalesList" exact element={<SalesList/>}/>
          <Route path="/AddSalesD" exact element={<AddSalesD/>}/>
         <Route path="/EditSalesD/:id" exact element={<EditSalesD/>}/>
         <Route path="/PrintPreviewSales" exact element={<PrintPreviewSales/>}/>

         <Route path="/inventory" exact element={<Inventory />} />
          <Route path="/inventoryDetail" exact element={<InventoryDetail />} />
          <Route path="/addProduct" exact element={<AddProduct />} />
          <Route path="/adminDashboard" exact element={<AdminDashboard />} />
          <Route path="/editInventory/:id" exact element={<EditInventory />} />
          <Route path="/printPreviewInventory" exact element={<PrintPreviewInventory />} />
          <Route path="/LoginPage" exact element={<LoginPage />} />

          <Route path="/AddIncome" exact element={<AddIncome/>}/>
          <Route path="/IncomeList" exact element={<IncomeList/>}/>
          <Route path="/EditIncome/:id" exact element={<EditIncome/>}/>
          <Route path="/pieChart" exact element={<PieChart/>}/>


          <Route path="/AddExpense" exact element={<AddExpense/>}/>
          <Route path="/ExpenseList" exact element={<ExpenseList/>}/>
          <Route path="/EditExpense/:id" exact element={<EditExpense/>}/>
          
          <Route path="/PrintPreviewIncome" exact element={<PrintPreviewIncome/>}/>

          <Route path="/PrintPreviewExpense" exact element={<PrintPreviewExpense/>}/>

          <Route path="/OfferList" exact element={<OfferList/>}/>
          <Route path="/AddOffer" exact element={<AddOffer/>}/>
         <Route path="/EditOffer/:id" exact element={<EditOffer/>}/>
         <Route path="/PrintPreviewOrder" exact element={<PrintPreviewOffer />} />

         

        
          
          </Routes>
          {/* <Footer />  */}
          
        </div>
      </BrowserRouter>
    )
  }
}
