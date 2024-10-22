import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './component/Login'; // 로그인 컴포넌트
import SignUp from './component/SignUp'; // 회원가입 컴포넌트

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
