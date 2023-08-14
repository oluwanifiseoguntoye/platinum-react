import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import Home from './pages/Home';
import Product from './pages/Product';
import Password from './pages/Password';
import Order from './pages/Order'
import OrderComplete from './pages/OrderComplete'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Adminlogin from './pages/AdminLogin'


function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Password />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/product/:id/order" element={<Order />} />
                    <Route path="/product/:id/order/complete" element={<OrderComplete />} />
                  </Route>
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;