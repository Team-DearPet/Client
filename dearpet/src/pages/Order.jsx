import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import BuyerInfo from '../component/BuyerInfo';
import ShippingInfo from '../component/ShippingInfo';
import OrderSummary from '../component/OrderSummary';
import Footer from '../component/Footer';
import { useLocation } from 'react-router-dom';

const Order = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const items = JSON.parse(decodeURIComponent(queryParams.get('items') || '[]'));
    console.log(items);
    const [user, setUser] = useState([]);
    const [buyerPhone, setBuyerPhone] = useState('');

    const orderItems = items.length > 1 
        ? `${items[0].productName} 외 ${items.length - 1}건` 
        : items[0]?.productName; //상품명
    const productPrice = items.reduce((total, item)=> {
        return total + item.price;
    },0); //상품금액
    const shippingCost = 2500; //배송비
    const totalPrice = productPrice + shippingCost; //총주문금액


    //주문서에 넣을 유저정보 가져옴
    const fetchUser = async() => {
        const accessToken = localStorage.getItem('token');
        const response = await fetch("http://localhost:8080/api/profile",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const data = await response.json();
        console.log(data);
        setUser(data);
    }

    useEffect(() => {
        fetchUser();
        let script = document.querySelector(`script[src="https://cdn.iamport.kr/v1/iamport.js"]`);
        if (!script) {
            script = document.createElement('script');
            script.src = "https://cdn.iamport.kr/v1/iamport.js";
            document.body.appendChild(script);
        }
    }, []);

    const onclickPay = () => {
        const { IMP } = window;
        IMP.init("imp85434333"); // 고객사식별코드

        const data = { 
            pg: "html5_inicis",
            pay_method: "card", // 결제 방법 (카드 결제)
            merchant_uid: `ORD-${Date.now()}`, // 고유 주문 ID
            name: orderItems, // 상품명
            amount: 100, // 결제 금액 (실제로는 totalPrice로 바꾸기)
            buyer_addr: "부산 남구", // 구매자 배송지
            buyer_email: user.email, // 구매자 이메일
            buyer_name: user.username, // 구매자 이름
            buyer_tel: buyerPhone, // 구매자 전화번호
            // m_redirect_url: "http://localhost:3000/orderscomplete"
        };

        IMP.request_pay(data, (rsp) => { // 결제 요청
            if (rsp.success) {
                console.log("결제 성공:", rsp);
                alert("결제가 완료되었습니다.");
                window.location.href = "http://localhost:3000/orderscomplete";
            } else {
                console.error("결제 실패:", rsp);
                alert("결제가 실패하였습니다. " + rsp.error_msg);
            }
        });
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>주문서</h1>
            <Container maxWidth={false} sx={{ padding: 3, width: "80%" }}> 
                <Box sx={{ maxWidth: 800, margin: 'auto', paddingLeft: '20px' }}>
                    <BuyerInfo data={user} onPhoneChange={setBuyerPhone}/>
                    <ShippingInfo />
                    <OrderSummary orderItems={orderItems} productPrice={productPrice} shippingCost={shippingCost} totalPrice={totalPrice}/>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                            }}
                            onClick={onclickPay} // 결제하기 버튼 클릭 시 결제 요청
                        >
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
