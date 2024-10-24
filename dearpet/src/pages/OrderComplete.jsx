import React from "react";
import Header from "../component/Header";
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../style/OrderComplete.css'
import { WidthFull } from "@mui/icons-material";

export default function OrderComplete() {
    return(
        <div style={{minHeight:'100vh'}}>
            <Header/>
            <h2 style={{ textAlign: 'center' }}>주문완료</h2>
            <Container maxWidth={false} style={{ textAlign: 'center', padding: '20px'}}>
            <Box className="container" style={{WidthFull}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
                <CheckCircleIcon style={{ fontSize: '70px', color: 'red', marginTop:"50px" }} />
                <Typography style={{marginTop:"20px", fontSize:"2rem", fontWeight:"bold", color:"black"}} variant="h6">구매가 완료되었습니다</Typography>
                <Typography style={{marginTop:"50px", fontSize:"1.5rem", fontWeight:"bold", color:"black"}}>ooo님이 구매하신 상품은 2024.10.21부터 배송될 예정이에요!</Typography>
                <Typography style={{marginBottom:"50px", fontSize:"1.5rem", fontWeight:"bold", color:"black"}}>구매내역은 마이페이지 '구매내역'에서 하실 수 있습니다.</Typography>
            </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    {/* 주문 정보 박스 */}
                    <Box sx={{ width: '20%', marginLeft: "450px", marginRight:"20px", padding: '20px', backgroundColor: '#fff', border: '3px solid #E0D7F8', borderRadius:"20px", textAlign:"left"}}>
                        <div className="info">
                        <Typography variant="h6">주문 정보</Typography>
                        <Typography variant="subtitle1" gutterBottom>배송지 정보</Typography>
                        <Typography>000</Typography>
                        <Typography>010-1234-5678</Typography>
                        <Typography>[00000] 서울 00구 00로</Typography>
                        </div>
                    </Box>

                    {/* 결제 정보 박스 */}
                    <Box sx={{ width: '20%', marginRight: "450px", padding: '20px', backgroundColor: '#fff', border: '3px solid #E0D7F8', borderRadius:"20px", textAlign:"left" }}>
                        <Typography variant="h6">결제 정보</Typography>
                        <Typography variant="subtitle1" gutterBottom>결제 방식</Typography>
                        <Typography>카카오페이</Typography>
                        <Typography>결제 금액</Typography>
                        <Typography>총 32,500원</Typography>
                    </Box>
                </Box>
            <Button variant="contained" style={{ marginTop: '20px' , backgroundColor:"#AC92ED", fontWeight:"bold" }}>
                다른 상품 보러가기
            </Button>
        </Container>
        </div>
    )
}