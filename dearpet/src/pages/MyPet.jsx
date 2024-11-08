import React from 'react';
import PetDetail from '../component/PetDetail';
import Footer from '../component/Footer';

function MyPet(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>마이펫</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <div style={{ maxWidth: 800, width: '100%' }}>
          <PetDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPet;
