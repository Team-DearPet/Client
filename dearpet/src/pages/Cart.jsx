import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Footer from '../component/Footer';
import BuyFooter from '../component/BuyFooter';
import CartHeader from '../component/CartHeader';
import CartItem from '../component/CartItem';
import petfoodImage from '../images/petfood.png';

const Cart = () => {
    const [items, setItems] = useState([]);

    const fetchcart = async () => {
        const accessToken = localStorage.getItem('token');
        const response = await fetch("http://localhost:8080/api/cart",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const data = await response.json();
        console.log(data);
        setItems(data.items);
    };

    const changeQuantity = async (id, newQuantity) => {
        try{
            const accessToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/cart/items/${id}?quantity=${newQuantity}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (!response.ok){
                throw new Error('Failed to update quantity')
            }
        }catch(error){
            console.error('Error updating quantity',error);
        }
    }

    const deleteitem = async (id) => {
        try{
            const accessToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/cart/items/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (!response.ok){
                throw new Error('Failed to delete item')
            }
        }catch(error){
            console.error('Error deleting item',error);
        }
    }

    useEffect(()=>{
        fetchcart();
    },[])

    const getTotalOrderAmount = () => {
        return items
            .filter(item => item.checked)
            .reduce((sum, item) => sum + item.price, 0);
    };

    const getCheckedItems = () => {
        return items.filter(item => item.checked);
    };

    const handleQuantityChange = async (id, delta) => {
        const newQuantity = items.find(item => item.cartItemId === id).quantity + delta;
        
        if (newQuantity < 1) return;
        
        const updatedItems = items.map((item) =>
            item.cartItemId === id
                ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
                : item
        );
        
        try{
            await changeQuantity(id, newQuantity);
            setItems(updatedItems);
        }catch (error){
            console.error('Quantity update failed:', error);
            setItems(items);
        }
    };

    const handleCheckboxChange = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.cartItemId === id ? { ...item, checked: !item.checked } : item))
        );
    };

    const handleDeleteSelected = async () => {
        const selectedItems = items.filter((item) => item.checked);
        const deletePromises = selectedItems.map((item) => deleteitem(item.cartItemId));

        try {
            await Promise.all(deletePromises);
            setItems((prevItems) => prevItems.filter((item) => !item.checked));
        } catch (error) {
            console.error('Error deleting selected items:', error);
        }
    };

    const handleSelectAll = (checked) => {
        setItems((prevItems) => prevItems.map((item) => ({ ...item, checked })));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container>
                <h1 
                    style={{ 
                        textAlign: 'center' 
                    }}>
                    장바구니
                </h1>
                <Box 
                    sx={{ 
                        p: 4 
                    }}>
                    <CartHeader 
                        items={items} 
                        handleSelectAll={handleSelectAll} 
                        handleDeleteSelected={handleDeleteSelected} 
                    />
                    {items.map((item) => (
                        <CartItem 
                            key={item.cartItemId} 
                            item={item} 
                            handleQuantityChange={handleQuantityChange} 
                            handleCheckboxChange={handleCheckboxChange} 
                        />
                    ))}
                </Box>
            </Container>
            <BuyFooter orderItems={getCheckedItems()} orderAmount={getTotalOrderAmount()} />
            <Footer />
        </div>
    );
};

export default Cart;
