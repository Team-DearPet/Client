import React from 'react';
import Header from '../component/Header';
import PetDetail from '../component/PetDetail';

function MyPet(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Header />
            <h2 style={{ textAlign: 'center' }}>마이펫</h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{ maxWidth: 800, width: '100%' }}>
                    <PetDetail />
                </div>
            </div>
        </div>
    );
}

export default MyPet;
