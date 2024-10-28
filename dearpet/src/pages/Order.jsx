import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import BuyFooter from '../component/BuyFooter';
import Footer from '../component/Footer';
import BuyerInfo from '../component/BuyerInfo';
import ShippingInfo from '../component/ShippingInfo';
import OrderSummary from '../component/OrderSummary';
import Footer from '../component/Footer';
const Order = () => {
    useEffect(() => {
        let script = document.querySelector(`script[src="https://cdn.iamport.kr/v1/iamport.js"]`);
        if (!script) {
            script = document.createElement('script');
            script.src = "https://cdn.iamport.kr/v1/iamport.js";
            document.body.appendChild(script);
        }
    }, []);
    const onclickPay = () => {
        const { IMP } = window;
        IMP.init("imp41731737");
        const data = {
            pg: "html5_inicis",
            pay_method: "card", // 결제 방법 (카드 결제)
            merchant_uid: "ORD20180131-0000012", // 고유 주문 ID
            name: "노르웨이 회전 의자", // 상품명
            amount: 100, // 결제 금액
            buyer_email: "gildong@gmail.com", // 구매자 이메일
            buyer_name: "홍길동", // 구매자 이름
            buyer_tel: "010-0000-0000", // 구매자 전화번호
            buyer_addr: "서울특별시 강남구 신사동", // 구매자 주소
            buyer_postcode: "01181", // 구매자 우편번호
            m_redirect_url: "http://localhost:3000/orderscomplete"
        };
        IMP.request_pay(data, (rsp) => { // 결제 요청
            if (rsp.success) {
                console.log("결제 성공:", rsp);
                alert("결제가 완료되었습니다.");
            } else {
                console.error("결제 실패:", rsp);
                alert("결제가 실패하였습니다. " + rsp.error_msg);
            }
        });
    }
    return (
        <div>
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