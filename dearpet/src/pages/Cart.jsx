import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Footer from '../component/Footer';
import BuyFooter from '../component/BuyFooter';
import CartHeader from '../component/CartHeader';
import CartItem from '../component/CartItem';
import useStore from '../data/store';

const Cart = () => {
    const [items, setItems] = useState([]);
    const setOrderItems = useStore(state => state.setOrderItems);
    const [prices, setPrices] = useState([]);

    const fetchcart = async () => {
        const accessToken = localStorage.getItem('token');
        const response = await fetch("https://www.carepet.site/api/cart",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const data = await response.json();
        setItems(data.items);
        const prices = data.items.map(item => ({
            itemId: item.cartItemId, // cartItemId
            price: item.price         // 가격
        }))
        setPrices(prices);
    };

    const changeQuantity = async (id, newQuantity) => {
        try{
            const accessToken = localStorage.getItem('token');
            const response = await fetch(`https://www.carepet.site/api/cart/items/${id}?quantity=${newQuantity}`,{
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
            const response = await fetch(`https://www.carepet.site/api/cart/items/${id}`,{
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

    const handleTotalChange = (itemId, newPrice) => {
        setPrices((prevPrices) =>
            prevPrices.map((price) =>
                price.itemId === itemId ? { ...price, price: newPrice } : price
            )
        );
    };

    const getTotalOrderAmount = () => {
        return items
            .filter(item => item.checked)
            .reduce((sum, item) => {
                const itemPrice = prices.find(price => price.itemId === item.cartItemId)?.price || 0;
                return sum + itemPrice;
            }, 0);
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
        const updatedItems = items.map((item) => 
            item.cartItemId === id ? { ...item, checked: !item.checked } : item
        );
        setItems(updatedItems);
        const checkedItems = updatedItems.filter(item => item.checked);
        setOrderItems(checkedItems);
    };

    const handleDeleteSelected = async () => {
        const selectedItems = items.filter((item) => item.checked);
        const deletePromises = selectedItems.map((item) => deleteitem(item.cartItemId));

        try {
            await Promise.all(deletePromises);
            setItems((prevItems) => prevItems.filter((item) => !item.checked));
            setOrderItems([]);
        } catch (error) {
            console.error('Error deleting selected items:', error);
        }
    };

    const handleSelectAll = (checked) => {
        const updatedItems = items.map(item => ({ ...item, checked }));
        setItems(updatedItems);
        
        const checkedItems = updatedItems.filter(item => item.checked);
        setOrderItems(checkedItems);
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
                            totalPrice={prices.find(price => price.itemId === item.cartItemId)?.price || 0}
                            handleTotalChange={(newPrice)=>handleTotalChange(item.cartItemId, newPrice)} 
                            handleQuantityChange={handleQuantityChange} 
                            handleCheckboxChange={handleCheckboxChange} 
                        />
                    ))}
                </Box>
            </Container>
            <BuyFooter orderAmount={getTotalOrderAmount()} />
            <Footer />
        </div>
    );
};

export default Cart;