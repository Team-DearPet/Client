import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './pages/Login'; // 로그인 컴포넌트
import SignUp from './pages/SignUp'; // 회원가입 컴포넌트
import OrderHistory from './pages/OrderHistory';
import OrderComplete from './pages/OrderComplete';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<OrderHistory/>}/>
      <Route path="/orderscomplete" element={<OrderComplete/>} />
    </Routes>
  </>
  );
};

export default App;
