import React from 'react';
import { Box, Typography } from '@mui/material';
import items from '../data/items';

const OrderSummary = () => {

    const productPrice = parseInt(items[1][0].price.replace(/,/g, '').replace('₩', ''), 10);
    const shippingCost = 2500;  
    const totalPrice = productPrice + shippingCost; 

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, marginRight: '16px' }}>
                주문
            </Typography>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom: 2, marginTop: 2 }}></Box>
            <Typography variant="body1" sx={{ textAlign: 'right' }}>
                [{items[1][0].brand}]{items[1][0].title}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'right' }}>
                ₩{items[1][0].price}
            </Typography>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom: 2, marginTop: 2 }}></Box>
            <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'right' }}>
                배송비 : ₩ 2,500
            </Typography>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom: 2, marginTop: 2 }}></Box>
            <Typography variant="h6" sx={{ marginTop: 2, textAlign: 'right' }}>
                합계 : ₩ {totalPrice.toLocaleString()}
            </Typography>
        </Box>
    );
};

export default OrderSummary;

