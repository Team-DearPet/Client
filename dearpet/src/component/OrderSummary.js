import React from 'react';
import { Box, Typography } from '@mui/material';
import items from '../data/items';

const OrderSummary = () => {

    const productPrice = parseInt(items[1][0].price.replace(/,/g, '').replace('₩', ''), 10);
    // const shippingCost = 2500;  
    // const totalPrice = productPrice + shippingCost; 
    const shippingCost = 2500;  
    const totalPrice = productPrice + shippingCost;

    const borderBoxStyle = {
        borderBottom: 2,
        borderColor: 'divider',
        marginBottom: 2,
        marginTop: 2
    };

    const textRightStyle = {
        textAlign: 'right',
        marginTop: 2,
        fontSize: '1.1rem'
    };

    return (
        <Box mt={4}>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                    fontWeight: 600, 
                    marginRight: '16px' 
                }}>
                주문
            </Typography>
            <Box 
                sx={borderBoxStyle}>
            </Box>
            <Typography 
                variant="body1" 
                sx={textRightStyle}>
                [{items[1][0].brand}]{items[1][0].title}
            </Typography>
            <Typography 
                variant="body2" 
                sx={textRightStyle}>
                상품금액 : ₩{items[1][0].price}
            </Typography>
            <Box 
                sx={borderBoxStyle}>
            </Box>
            <Typography 
                variant="body2" 
                sx={textRightStyle}>
                배송비 : ₩ {shippingCost.toLocaleString()}
            </Typography>
            <Box 
                sx={borderBoxStyle}>
            </Box>
            <Typography 
                variant="h6" 
                sx={{ 
                    marginTop: 2, 
                    textAlign: 'right',
                    fontSize: '1.6rem' 
                }}>
                합계 : ₩ {totalPrice.toLocaleString()}
            </Typography>
        </Box>
    );
};

export default OrderSummary;
