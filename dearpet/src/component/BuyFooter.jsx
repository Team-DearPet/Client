import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

const BuyFooter = () => {
  const orderAmount = 30000;  // 총 주문금액
  const shippingCost = 2500;  // 배송비backgroundColor: 'rgba(172, 146, 237, 0.5)',
  const totalAmount = orderAmount + shippingCost;  // 결제 예정금액

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
            <Box
                sx={{
                    backgroundColor: '#C0ADF0',
                    padding: '30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #dee2e6',
                    color: '#333',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: '100px', marginLeft: '300px' }}>
                        총 주문금액 <br />
                        <strong>{orderAmount.toLocaleString()}원</strong>
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ marginRight: '100px', borderColor: '#ddd' }} />
                    <Typography sx={{ marginRight: '100px' }}>
                        배송비 <br />
                        <strong>{shippingCost.toLocaleString()}원</strong>
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ marginRight: '100px', borderColor: '#ddd' }} />
                    <Typography>
                        결제예정금액 <br />
                        <strong>{totalAmount.toLocaleString()}원</strong>
                    </Typography>
                </Box>
                <Button variant="contained"
                    sx={{ 
                        backgroundColor: '#7B52E1', 
                        color: 'white', 
                        padding: '15px 150px', 
                        marginRight: '200px',
                        fontSize: '1.2rem'
                    }}>
                    구매하기
                </Button>
            </Box>
        </Box>
    );
};

export default BuyFooter;
