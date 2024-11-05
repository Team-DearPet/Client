import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import useStore from '../data/store';

const BuyFooter = ({ orderAmount }) => {
    const orderItems = useStore(state => state.orderItems)
    const shippingCost = 2500;
    const totalAmount = orderAmount + shippingCost;

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                overflowX: 'auto',  // 가로 스크롤 가능
                backgroundColor: '#C0ADF0',
                borderTop: '1px solid #dee2e6',
                padding: '40px 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12vw',  // 요소 사이 간격
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6vw',  // 내부 요소 간격
                        flexWrap: 'wrap',  // 작은 화면에서 줄바꿈
                    }}
                >
                    <Typography sx={{ fontSize: '1.2rem' }}>
                        총 주문금액 <br />
                        <strong>{orderAmount.toLocaleString()}원</strong>
                    </Typography>

                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />

                    <Typography sx={{ fontSize: '1.2rem' }}>
                        배송비 <br />
                        <strong>{shippingCost.toLocaleString()}원</strong>
                    </Typography>

                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#ddd' }} />

                    <Typography sx={{ fontSize: '1.2rem' }}>
                        결제예정금액 <br />
                        <strong>{totalAmount.toLocaleString()}원</strong>
                    </Typography>
                </Box>

                <Link to={'/order'}>
                    <Button
                        variant="contained"
                        sx={{
                            width:'200px',
                            backgroundColor: '#7B52E1',
                            color: 'white',
                            padding: '10px 50px',
                            fontSize: '1.2rem',
                        }}
                    >
                        주문하기
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default BuyFooter;
