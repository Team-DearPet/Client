import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './pages/Login'; // 로그인 컴포넌트
import SignUp from './pages/SignUp'; // 회원가입 컴포넌트
import Mypage from './pages/Mypage';
import OrderHistory from './pages/OrderHistory';
import OrderComplete from './pages/OrderComplete';
import Map from './pages/Map';
import MyPet from './pages/MyPet';
import Emergency from './pages/Emergency';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/mypet" element={<MyPet />} />
      <Route path="/orders" element={<OrderHistory/>}/>
      <Route path="/orderscomplete" element={<OrderComplete/>} />
      <Route path="/emergency" element={<Emergency/>} />
    </Routes>
  );
};

export default App;
