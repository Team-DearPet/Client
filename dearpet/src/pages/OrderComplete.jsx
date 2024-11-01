import React from "react";
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../style/OrderComplete.css';
import Footer from "../component/Footer";

export default function OrderComplete() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>주문완료</h1>
            <Container maxWidth={false} style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '0px', paddingRight: '0px' }}>
                <Box className="container" style={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
                        <CheckCircleIcon style={{ fontSize: '70px', color: '#DC0044', marginTop: "50px" }} />
                        <Typography style={{ marginTop: "20px", fontSize: "2rem", fontWeight: "500", color: "black" }} variant="h6">구매가 완료되었습니다</Typography>
                        <Typography style={{ marginTop: "50px", fontSize: "1.5rem", fontWeight: "500", color: "black" }}>ooo님이 구매하신 상품은 2024.10.21부터 배송될 예정이에요!</Typography>
                        <Typography style={{ marginBottom: "50px", fontSize: "1.5rem", fontWeight: "500", color: "black" }}>구매내역은 마이페이지 '구매내역'에서 하실 수 있습니다.</Typography>
                    </Box>
                </Box>
                
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px',
                        padding: '0 10px',
                        gap: '20px',
                        maxWidth: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: '15%',
                            minHeight: '150px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            paddingRight: '20px',
                            paddingLeft: '30px',
                            backgroundColor: '#fff',
                            border: '3px solid #E0D7F8',
                            borderRadius: '20px',
                            textAlign: 'left',
                            flexShrink: 0,
                        }}
                    >
                        <div className="info">
                            <Typography variant="h6">주문 정보</Typography>
                            <Typography variant="subtitle1" gutterBottom>배송지 정보</Typography>
                            <Typography>000</Typography>
                            <Typography>010-1234-5678</Typography>
                            <Typography>[00000] 서울 00구 00로</Typography>
                        </div>
                    </Box>

                    <Box
                        sx={{
                            width: '15%',
                            minHeight: '150px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            paddingRight: '20px',
                            paddingLeft: '30px',
                            backgroundColor: '#fff',
                            border: '3px solid #E0D7F8',
                            borderRadius: '20px',
                            textAlign: 'left',
                            flexShrink: 0,
                        }}
                    >
                        <Typography variant="h6">결제 정보</Typography>
                        <Typography variant="subtitle1" gutterBottom>결제 방식</Typography>
                        <Typography>카카오페이</Typography>
                        <Typography>결제 금액</Typography>
                        <Typography>총 32,500원</Typography>
                    </Box>
                </Box>

                <Link to="/">
                    <Button variant="contained" style={{ marginTop: '30px', marginBottom: '10px', backgroundColor: "#7B52E1", fontSize: "1rem", fontWeight: "normal", boxShadow: "none", padding: "12px 24px" }}>
                        다른 상품 보러가기
                    </Button>
                </Link>
            </Container>
            <Footer />
        </div>
    );
}
