import logo from './logo.svg';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './component/Login'; // 로그인 컴포넌트
import SignUp from './component/SignUp'; // 회원가입 컴포넌트

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes><div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </>
  );
};

export default App;
