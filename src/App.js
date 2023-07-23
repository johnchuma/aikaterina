import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard_layout';
import ProductPage from './pages/dashboard/product_page';
import SalesPage from './pages/dashboard/sales_page';
import StockPage from './pages/dashboard/stock_page';
import HomePage from './pages/dashboard/home_page';
import LoginPage from './pages/login_page';
import PrivateRoute from './pages/private_route';
import UserPage from './pages/dashboard/user_page';
import TodaySalesPage from './pages/dashboard/today_sales_page';
import ExpiringProductPage from './pages/dashboard/expiring_page';
import OutOfStock from './pages/dashboard/out_of_stock';
import StockHistoryPage from './pages/dashboard/stock_history_page';
import ProductSales from './pages/dashboard/product_sales';
function App() {
  return (
    <BrowserRouter basename='/aikaterina'>
    <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/' element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
      <Route index path='/home' element={<HomePage/>}/>
      <Route  path='/product' element={<ProductPage/>}/>
      <Route  path='/product-stock/:uuid' element={<StockHistoryPage/>}/>
      <Route  path='/product-sales/:uuid' element={<ProductSales/>}/>
      <Route  path='/stock' element={<StockPage/>}/>
      <Route  path='/expiring' element={<ExpiringProductPage/>}/>
      <Route  path='/sales' element={<SalesPage/>}/>
      <Route  path='/today' element={<TodaySalesPage/>}/>
      <Route  path='/sales-all' element={<SalesPage/>}/>
      <Route  path='/out-of-stock' element={<OutOfStock/>}/>
      <Route  path='/staff' element={<UserPage/>}/>

</Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
