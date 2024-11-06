import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../style/OrderComplete.css';
import Footer from "../component/Footer";
import axios from 'axios';

export default function OrderComplete() {

    const location = useLocation();
    const { impUid } = location.state || {}; // location state에서 impUid 가져오기
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        if (impUid) {
            // API에서 결제 세부 정보 가져오기
            const accessToken = localStorage.getItem('token'); // 토큰 가져오기
            axios.get(`https://www.carepet.site/api/payments/${impUid}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // 인증 토큰 추가
                }
            })
            .then(response => {
                setPaymentInfo(response.data); // 결제 정보 상태에 저장
            })
            .catch(error => {
                console.error("결제 세부 정보 가져오는 중 오류 발생:", error);
            });
        }
    }, [impUid]);

    // 결제 정보가 로드되지 않았을 경우 로딩 상태 표시
    if (!paymentInfo) {
        return <div>로딩 중...</div>;
    }

    const { buyerName, buyerTel, buyerAddr, cardName, amount, paidAt, name } = paymentInfo;
    return (
        <div style={{ minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>주문완료</h1>
            <Container maxWidth={false} style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '0px', paddingRight: '0px' }}>
                <Box className="container" style={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
                        <CheckCircleIcon style={{ fontSize: '70px', color: '#DC0044', marginTop: "50px" }} />
                        <Typography style={{ marginTop: "20px", fontSize: "2rem", fontWeight: "500", color: "black" }} variant="h6">구매가 완료되었습니다</Typography>
                        <Typography style={{ marginTop: "50px", fontSize: "1.5rem", fontWeight: "500", color: "black" }}>{buyerName}님이 구매하신 상품은 {new Date(paidAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}에 주문 완료됐습니다!</Typography>
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
                            width: '18%',
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
                            <Typography variant="h5" >주문 정보</Typography>
                            <Typography style={{marginBottom:"20px"}}>주문 상품 : {name}</Typography>
                            <Typography variant="h5">결제 정보</Typography>
                        <Typography variant="subtitle1">결제 방식 : {cardName}</Typography>
                        <Typography>결제 금액 : 총 {amount}원</Typography>
                        {/* <Typography style={{fontSize:"1.3rem"}}>총 {amount}원</Typography> */}
                        </div>
                    </Box>

                    <Box
                        sx={{
                            width: '18%',
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
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Box>
                            <Typography variant="h5" >배송지 정보</Typography>
                            <Typography>성함 : {buyerName}</Typography>
                            <Typography>전화번호 : {buyerTel}</Typography>
                            <Typography>주소 : {buyerAddr} </Typography>
                        </Box>
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
