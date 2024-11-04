import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import BuyerInfo from '../component/BuyerInfo';
import ShippingInfo from '../component/ShippingInfo';
import OrderSummary from '../component/OrderSummary';
import Footer from '../component/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import $ from 'jquery';

const Order = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const items = JSON.parse(decodeURIComponent(queryParams.get('items') || '[]'));
    const [user, setUser] = useState([]); //유저정보
    const [buyerPhone, setBuyerPhone] = useState(''); //연락처
    const [address, setAddress] = useState(''); //주소
    const [requirements, setRequirements] = useState('') //요청사항
    const accessToken = localStorage.getItem('token');
    const orderItems = items.length > 1 
        ? `${items[0].productName} 외 ${items.length - 1}건` 
        : items[0]?.productName; //상품명
    const productPrice = items.reduce((total, item)=> {
        return total + item.price;
    },0); //상품금액
    const shippingCost = 2500; //배송비
    const totalPrice = productPrice + shippingCost; //총주문금액
    const merchantUid = `merchant_${Date.now()}_${Math.floor(Math.random() * 10000)}`; // 고유 주문 번호 생성


    //주문서에 넣을 유저정보 가져옴
    const fetchUser = async() => {
        const response = await fetch("http://localhost:8080/api/profile",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const data = await response.json();
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

    const proceedPay = () => {
        if (!buyerPhone) {
            alert("연락처를 입력해 주세요.");
            return;
        }
        if (!address) {
            alert("배송지를 설정해 주세요.");
            return;
        }
        $.ajax({
            url: "http://localhost:8080/api/verification/prepare",
            type: "POST",
            async: true,
            dataType: "json",
            contentType: "application/json",
            headers: {
                'Authorization': `Bearer ${accessToken}`, // 인증 토큰 추가
            },
            data: JSON.stringify({
                merchantUid: merchantUid,
                expectedAmount: 100
            }),
            success: function (data) {
                if (data.status === "CONFIRMED") {
                    requestPay(data);
                } else {
                    alert("결제 준비 중 문제가 발생했습니다.");
                }
            },
            error: function () {
                alert("결제 준비 요청 중 오류가 발생했습니다.");
            },
        });
    };

    const requestPay = (data) => {
        const accessToken = localStorage.getItem('token');
        const { IMP } = window;
        IMP.init("imp01130807");
        IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card", // 결제 방법 (카드 결제)
          merchant_uid: merchantUid, // 고유 주문 ID
          name: orderItems, // 상품명
          amount: 100, // 결제 금액 (실제로는 totalPrice로 바꾸기)
          buyer_addr: address, // 구매자 배송지
          buyer_email: user.email, // 구매자 이메일
          buyer_name: user.username, // 구매자 이름
          buyer_tel: buyerPhone, // 구매자 전화번호
        },
        function (rsp) {
            if (rsp.success) {
              // 결제 성공 시 검증 요청
              $.ajax({
                url: "http://localhost:8080/api/verification/confirm",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // 인증 토큰 추가
                },
                data: JSON.stringify({
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,
                }),
                success: function (validateData) {
                  alert("결제가 성공적으로 완료되었습니다!");
                  console.log(validateData);
                  succeedPay(rsp.imp_uid, merchantUid)
                },
                error: function () {
                  alert("결제 검증 요청 중 오류가 발생했습니다.");
                },
              });
            } else {
              // 결제 실패 시 메시지 출력
              var msg = "결제에 실패하였습니다.\n" + rsp.error_msg;
              alert(msg);
            }
          }
    )
    };
    const succeedPay = (impUid, merchantUid, amount, cardName) => {
        // 요청 데이터 확인을 위한 콘솔 로그
        console.log('Sending payment data:', {
            impUid: impUid,
            merchantUid: merchantUid
        });
    
        fetch("http://localhost:8080/api/payments/save", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // 인증 토큰 추가
            },
            body: JSON.stringify({
                impUid: impUid,
                merchantUid: merchantUid
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save payment information');
            }
            return response.json();
        })
        .then(data => {
            alert("결제 정보가 성공적으로 저장되었습니다!");
            console.log(data);
            navigate('/orderscomplete', { state: { impUid: impUid } });
        })
        .catch(error => {
            console.error('Error saving payment information:', error);
            alert("결제 정보 저장 중 오류가 발생했습니다.");
        });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>주문서</h1>
            <Container maxWidth={false} sx={{ padding: 3, width: "80%" }}> 
                <Box sx={{ maxWidth: 800, margin: 'auto', paddingLeft: '20px' }}>
                    <BuyerInfo data={user} onPhoneChange={setBuyerPhone}/>
                    <ShippingInfo onAddressChange={setAddress} onRequireChange={setRequirements}/>
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
                            onClick={proceedPay} // 결제하기 버튼 클릭 시 결제 요청
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