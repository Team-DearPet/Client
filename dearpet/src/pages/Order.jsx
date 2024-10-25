import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import BuyFooter from '../component/BuyFooter';
import Footer from '../component/Footer';
import Header from '../component/Header';
import BuyerInfo from '../component/BuyerInfo';
import ShippingInfo from '../component/ShippingInfo';
import OrderSummary from '../component/OrderSummary';

const Order = ( ) => {
    return (
        <div>
            <Header />
            <h1 
                style={{ 
                    textAlign: 'center' 
                }}>
                주문서
            </h1>
            <Container 
                maxWidth={false} 
                sx={{ 
                    padding: 3, 
                    width: "80%" 
                }}> 
                <Box 
                    sx={{ 
                        maxWidth: 800, 
                        margin: 'auto',
                        paddingLeft: '20px' 
                    }}>
                    <BuyerInfo />
                    <ShippingInfo />
                    <OrderSummary />
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end' 
                        }}>
                        <Button
                            variant="contained"
                            sx={{ 
                                backgroundColor: '#7B52E1', 
                                fontSize: '1.3em', 
                                padding: '12px 100px', 
                                boxShadow: 'none', 
                                marginTop: '20px', 
                                '&:hover': { 
                                    backgroundColor: '#7B52E1' 
                                }
                            }}>
                            결제하기
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default Order;
