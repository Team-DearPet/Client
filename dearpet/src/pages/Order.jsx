import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import BuyerInfo from '../component/BuyerInfo';
import ShippingInfo from '../component/ShippingInfo';
import OrderSummary from '../component/OrderSummary';
import Footer from '../component/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import $ from 'jquery';
import useStore from '../data/store';

const Order = () => {
    const navigate = useNavigate();
    const items = useStore(state => state.orderItems);
    const setOrderItems = useStore(state => state.setOrderItems);
    const [user, setUser] = useState([]); //유저정보
    const [buyerPhone, setBuyerPhone] = useState(''); //연락처
    const [address, setAddress] = useState(''); //주소
    const [requirements, setRequirements] = useState('') //요청사항
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState(null);
    const accessToken = localStorage.getItem('token');
    const orderItems = items.length > 1 
        ? `${items[0].productName} 외 ${items.length - 1}건` 
        : items[0]?.productName;
    const productPrice = items.reduce((total, item) => total + item.price, 0);
    const shippingCost = 2500;
    const totalPrice = productPrice + shippingCost;
    const merchantUid = `merchant_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const fetchUser = async () => {
        const response = await fetch("https://www.carepet.site/api/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
        let script = document.querySelector(`script[src="https://cdn.iamport.kr/v1/iamport.js"]`);
        if (!script) {
            script = document.createElement('script');
            script.src = "https://cdn.iamport.kr/v1/iamport.js";
            document.body.appendChild(script);
        }
    }, []);

    const openDialog = (message, action) => {
        setDialogMessage(message);
        setDialogAction(() => action);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const proceedPay = () => {
        if (!buyerPhone) {
            openDialog("연락처를 입력해 주세요.");
            return;
        }
        if (!address) {
            openDialog("배송지를 설정해 주세요.");
            return;
        }
        $.ajax({
            url: "https://www.carepet.site/api/verification/prepare",
            type: "POST",
            async: true,
            dataType: "json",
            contentType: "application/json",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            data: JSON.stringify({
                merchantUid: merchantUid,
                expectedAmount: totalPrice
            }),
            success: function (data) {
                if (data.status === "CONFIRMED") {
                    requestPay(data);
                } else {
                    openDialog("결제 준비 중 문제가 발생했습니다.");
                }
            },
            error: function () {
                openDialog("결제 준비 요청 중 오류가 발생했습니다.");
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
            pay_method: "card",
            merchant_uid: merchantUid,
            name: orderItems,
            amount: totalPrice,
            buyer_addr: address,
            buyer_email: user.email,
            buyer_name: user.username,
            buyer_tel: buyerPhone,
        },
        function (rsp) {
            if (rsp.success) {
                $.ajax({
                url: "https://www.carepet.site/api/verification/confirm",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: JSON.stringify({
                    impUid: rsp.imp_uid,
                    merchantUid: rsp.merchant_uid,
                }),
                success: function (validateData) {
                    openDialog("결제가 성공적으로 완료되었습니다!", () => succeedPay(rsp.imp_uid, merchantUid));
                },
                error: function () {
                    openDialog("결제 검증 요청 중 오류가 발생했습니다.");
                },
            });
            } else {
                openDialog("결제에 실패하였습니다.\n" + rsp.error_msg);
            }
        }
    )
    };

    const succeedPay = (impUid, merchantUid) => {
        fetch("https://www.carepet.site/api/payments/save", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
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
            cartCheckout(impUid);//장바구니에 주문한 상품 삭제 및 주문 생성
            navigate('/orderscomplete', { state: { impUid: impUid } })
        })
        .catch(error => {
            console.error('Error saving payment information:', error);
            openDialog("결제 정보 저장 중 오류가 발생했습니다.");
        });
    };

    const cartCheckout = async (impUid) => {
        try {
            setOrderItems([])
            const cartItemIds = items?.map(item => item.cartItemId).filter(id => id !== undefined);

            const baseUrl = `https://www.carepet.site/api/orders/checkout?impUid=${impUid}`;
            const url = cartItemIds.length > 0 
                ? `${baseUrl}&${cartItemIds.map(id => `cartItemIds=${id}`).join('&')}`
                : baseUrl;
            const requestBody = {
                requirement: requirements,
                productInfo: {
                    productId: items[0].productId,
                    quantity: items[0].quantity,
                    price: items[0].price
                }
            };
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                throw new Error('Failed to add order');
            }
    
        } catch (error) {
            console.error('Error adding order', error);
        }
    }

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
                            onClick={proceedPay}
                        >
                            결제하기
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
                <DialogTitle>알림</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ mr: '15px', mb: '15px' }}>
                    <Button onClick={handleDialogClose} sx={{ color: '#7B52E1' }}>취소</Button>
                    <Button onClick={() => { handleDialogClose(); if (dialogAction) dialogAction(); }} sx={{ color: 'white', bgcolor: '#7B52E1', '&:hover': { bgcolor: '#6A47B1' } }}>확인</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Order;