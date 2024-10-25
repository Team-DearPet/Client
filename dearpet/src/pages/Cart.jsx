import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Header from '../component/Header';
import Footer from '../component/Footer';
import BuyFooter from '../component/BuyFooter';
import CartHeader from '../component/CartHeader';
import CartItem from '../component/CartItem';
import petfoodImage from '../images/petfood.png';

const Cart = () => {
    const [items, setItems] = useState([
        { id: 1, name: '[하림펫푸드] 강아지 사료', option: '500g', price: 15000, quantity: 2, image: petfoodImage, checked: false },
        { id: 2, name: '[하림펫푸드] 강아지 사료', option: '500g', price: 15000, quantity: 2, image: petfoodImage, checked: false },
        { id: 3, name: '[하림펫푸드] 강아지 사료', option: '500g', price: 15000, quantity: 2, image: petfoodImage, checked: false },
        { id: 5, name: '[하림펫푸드] 강아지 사료', option: '500g', price: 15000, quantity: 2, image: petfoodImage, checked: false },
        { id: 6, name: '[하림펫푸드] 강아지 사료', option: '500g', price: 15000, quantity: 2, image: petfoodImage, checked: false }
    ]);

    const handleQuantityChange = (id, delta) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
            )
        );
    };

    const handleCheckboxChange = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );
    };

    const handleDeleteSelected = () => {
        setItems((prevItems) => prevItems.filter((item) => !item.checked));
    };

    const handleSelectAll = (checked) => {
        setItems((prevItems) => prevItems.map((item) => ({ ...item, checked })));
    };

    return (
        <div>
            <Header />
				<Container>
                <h1 style={{ textAlign:'center'}}>장바구니</h1>
					<Box sx={{ p: 4 }}>
						<CartHeader 
							items={items} 
							handleSelectAll={handleSelectAll} 
							handleDeleteSelected={handleDeleteSelected} 
						/>
						{items.map((item) => (
							<CartItem 
								key={item.id} 
								item={item} 
								handleQuantityChange={handleQuantityChange} 
								handleCheckboxChange={handleCheckboxChange} 
							/>
						))}
					</Box>
				</Container>
            <BuyFooter />
            <Footer />
        </div>
    );
};

export default Cart;
