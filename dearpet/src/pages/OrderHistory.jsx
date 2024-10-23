import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import '../style/OrderHistory.css';
import Header from '../component/Header';

const OrderHistory = () => {
    const orders = [
      {
        id: 1,
        status: '주문완료',
        price: 15000,
        product: '[하림펫푸드] 강아지 사료',
        date: '2024.10.18',
        deliveryDate: '10/21 배송 예정',
        quantity: '500g',
      },
      {
        id: 2,
        status: '주문완료',
        price: 15000,
        product: '[하림펫푸드] 강아지 사료',
        date: '2024.10.18',
        deliveryDate: '10/21 배송 예정',
        quantity: '500g',
      },
      {
        id: 3,
        status: '주문완료',
        price: 15000,
        product: '[하림펫푸드] 강아지 사료',
        date: '2024.10.18',
        deliveryDate: '10/21 배송 예정',
        quantity: '500g',
      },
      {
        id: 4,
        status: '주문완료',
        price: 15000,
        product: '[하림펫푸드] 강아지 사료',
        date: '2024.10.18',
        deliveryDate: '10/21 배송 예정',
        quantity: '500g',
      },
    ];
  
    return (
      <Box>
      <Header/>
      <Box className="order-history-container">
        <div className="order-header">
          <Typography variant="h6" className="order-header-title">
            주문내역
          </Typography>
        </div>
  
        <div className="order-status-container">
          <div className="order-status-item">
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>배송중</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</Typography>
          </div>
          <div className="order-status-item">
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>배송완료</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</Typography>
          </div>
          <div className="order-status-item">
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>취소/반품</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</Typography>
          </div>
        </div>
  
        {orders.map((order) => (
          <Box key={order.id} className="order-item">
            <Typography variant="subtitle1" className="order-date">
              {order.date}
              <Button variant="contained" className='DeleteButton'>구매취소</Button>
            </Typography>
            <Paper className="order-paper">
              <div className="order-image-placeholder" />
              <div className="order-details">
                <Typography className="order-status">{order.status}</Typography>
                <Typography className="order-price">{order.price.toLocaleString()}원</Typography>
                <Typography className="order-delivery">{order.deliveryDate}</Typography>
                <Typography className="order-product">
                  {order.product} {order.quantity}
                </Typography>
              </div>
              <div className="order-button-container">
                <div>
                <Button variant="contained" className="order-button" style={{marginTop:"-330px"}} >
                  문의하기
                </Button>
                </div>
                <div>
                <Button variant="contained" className="order-button" style={{marginTop:"-120px"}}>
                  리뷰작성
                </Button>
                </div>
              </div>
            </Paper>
          </Box>
        ))}
      </Box>
      </Box>
    );
  };
  
  export default OrderHistory;
