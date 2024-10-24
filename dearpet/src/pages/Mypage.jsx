import React from 'react';
import Header from '../component/Header';
import UserDetail from '../component/UserDetail';
import PetList from '../component/PetList';
import OrderStatus from '../component/OrderStatus';

function Mypage(props) {
    return (
        <div>
            <Header />
            <h2 style={{ textAlign:'center'}}>마이페이지</h2>
            <UserDetail />
            <PetList />
            <OrderStatus />
        </div>
    );
}

export default Mypage;