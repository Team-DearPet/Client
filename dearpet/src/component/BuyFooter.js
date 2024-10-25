import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const BuyFooter = ({ orderAmount }) => {
    const shippingCost = 2500;  
    const totalAmount = orderAmount + shippingCost;  

    return (
        <Box 
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                zIndex: 1000 
            }}>
            <Box
                sx={{
                    backgroundColor: '#C0ADF0',
                    padding: '40px',  
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #dee2e6',
                    color: '#333'
                }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center' 
                    }}>
                    <Typography 
                        sx={{ 
                            marginRight: '100px', 
                            marginLeft: '300px', 
                            textAlign: 'center',
                            fontSize: '1.2rem' 
                        }}>
                        총 주문금액 <br />
                        <strong>{orderAmount.toLocaleString()}원</strong>
                    </Typography>
                    <Divider 
                        orientation="vertical" 
                        flexItem 
                        sx={{ 
                            marginRight: '100px', 
                            borderColor: '#ddd' 
                        }} 
                    />
                    <Typography 
                        sx={{ 
                            marginRight: '100px', 
                            textAlign: 'center',
                            fontSize: '1.2rem' 
                        }}>
                        배송비 <br />
                        <strong>{shippingCost.toLocaleString()}원</strong>
                    </Typography>
                    <Divider 
                        orientation="vertical" 
                        flexItem 
                        sx={{ 
                            marginRight: '100px', 
                            borderColor: '#ddd' 
                        }} 
                    />
                    <Typography 
                        sx={{ 
                            textAlign: 'center',
                            fontSize: '1.2rem' 
                        }}>
                        결제예정금액 <br />
                        <strong>{totalAmount.toLocaleString()}원</strong>
                    </Typography>
                </Box>
                <Link to="/order">
                    <Button 
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#7B52E1', 
                            color: 'white', 
                            padding: '10px 100px',  
                            marginRight: '200px',
                            fontSize: '1.2rem' 
                        }}>
                        주문하기
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default BuyFooter;
