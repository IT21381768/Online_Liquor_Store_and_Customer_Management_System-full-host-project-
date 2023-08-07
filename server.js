const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// const postRoutes = require('./routes/posts');
// const detailsRoutes = require('./routes/details');

app.use(bodyParser.json());
app.use(cors());

//app.use(postRoutes);
//app.use(detailsRoutes);

app.use(cors());
mongoose.set('strictQuery', true);
const port = 8000;
const url = 'mongodb+srv://minsandi:minsandi123@mernapp.cnpzawc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Database not connected', err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//contact
const postRoutes = require('./routes/posts');
app.use('/contact', postRoutes);
app.use('/contactAdmin', postRoutes);

//delivery
const detailsRoutes = require('./routes/details');
app.use('/informationForm', detailsRoutes); 
app.use('/DisplayInfo', detailsRoutes);



//products
const productsRoutes = require('./routes/inventory');
app.use('/spirits', productsRoutes); 

const cartRoutes = require('./routes/cart');
app.use('/spirits', cartRoutes); 

app.use('/categoryDetails', cartRoutes); 

//employee
const employeeRoutes = require('./routes/employee');
app.use('/AddEmployee', employeeRoutes);
app.use('/EditEmployee', employeeRoutes);
app.use('/EmployeeList', employeeRoutes);
app.use('/EmployeePreview', employeeRoutes);
app.use('/EmpLoginPage', employeeRoutes);
app.use('/EmpWelcome', employeeRoutes);


const leaveRoutes = require('./routes/leaves');
app.use('/leave', leaveRoutes);
app.use('/leaveAdmin', leaveRoutes);
app.use('/leaveDisplay', leaveRoutes);

const supplierRoutes = require('./routes/supplier');
app.use('/AddSupplier', supplierRoutes);


app.use('/SupplierList', supplierRoutes);
app.use('/EditSupplier', supplierRoutes);

//supplier
const orderRoutes = require('./routes/order');
app.use('/AddOrder', orderRoutes);

app.use('/OrderList', orderRoutes);
app.use('/EditOrder', orderRoutes);

//sales
const salesRoutes = require('./routes/sales');
app.use('/AddSalesD', salesRoutes);

app.use('/EditSalesD', salesRoutes);
app.use('/SalesList', salesRoutes);

//inventory
const inventoryRoutes = require('./routes/inventory');
app.use('/addProduct', inventoryRoutes);

app.use('/inventory', inventoryRoutes);
app.use('/inventoryDetail', inventoryRoutes);
app.use('/adminDashboard', inventoryRoutes);
app.use('/editInventory', inventoryRoutes);


//finance
const financeRoutes = require('./routes/finance');
app.use('/AddIncome', financeRoutes);

app.use('/IncomeList', financeRoutes);
app.use('/EditIncome', financeRoutes);

const financeExRoutes = require('./routes/financeEx');
app.use('/AddExpense', financeExRoutes);

app.use('/ExpenseList', financeExRoutes);
app.use('/EditExpense', financeExRoutes);

//offers
const offerRoutes = require('./routes/offer');
app.use('/AddOffer', offerRoutes);
app.use('/EditOffer', offerRoutes);
app.use('/OfferList', offerRoutes);




const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);




