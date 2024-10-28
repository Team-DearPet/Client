import React from 'react';
import UserDetail from '../component/UserDetail';
import PetList from '../component/PetList';
import OrderStatus from '../component/OrderStatus';
import Footer from '../component/Footer';

function Mypage(props) {
    return (
        <div>
            <h1 style={{ textAlign:'center'}}>마이페이지</h1>
            <UserDetail />
            <PetList />
            <OrderStatus />
            <Footer />
        </div>
    );
}

export default Mypage;