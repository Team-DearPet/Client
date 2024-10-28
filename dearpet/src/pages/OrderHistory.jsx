import React, { useState } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import '../style/OrderHistory.css';
import ReviewModal from '../component/ReviewModal';

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2024.10.18',
      items: [
        { name: '[하림펫푸드] 강아지 사료', price: 15000, quantity: 1, deliveryDate: '10/21 배송 예정', option: '500g', reviewed: false, review: '' },
        { name: '[바잇미] 롤케이크 노즈워크 매트 장난감', price: 10000, quantity: 1, deliveryDate: '10/21 배송 예정', option: '', reviewed: false, review: '' }
      ],
      status: '주문완료',
      totalprice: 25000,
    },
    {
      id: 2,
      date: '2024.10.12',
      items: [
        { name: '[하림펫푸드] 강아지 사료', price: 15000, quantity: 1, deliveryDate: '10/14 배송 완료', option: '500g', reviewed: false, review: '' },
        { name: '[바잇미] 롤케이크 노즈워크 매트 장난감', price: 10000, quantity: 1, deliveryDate: '10/14 배송 완료', option: '', reviewed: false, review: '' }
      ],
      status: '구매확정',
      totalprice: 25000,
    },
  ]);
  
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusCounts, setStatusCounts] = useState({'배송중': 0, '배송완료': 0, '취소/반품': 0});
  
  const handleCancel = (orderIndex) => {
    const newOrders = [...orders];
    newOrders[orderIndex].status = '취소/반품';
    setOrders(newOrders);
    setStatusCounts((prev) => ({
      ...prev,
      ['취소/반품']: prev['취소/반품'] + 1,
    }));
  };

  const updateStatusCounts = () => {
    let 배송중 = 0, 배송완료 = 0, 취소반품 = 0;
  
    orders.forEach((order) => {
      if (order.status === '구매확정') 배송완료++;
      if (order.status === '취소/반품') 취소반품++;
    });
  
    setStatusCounts({ 배송중, 배송완료, '취소/반품': 취소반품 });
  };
  
  React.useEffect(() => {
    updateStatusCounts();
  }, [orders]);

  const handleOpenReview = (item) => {
    setSelectedItem(item);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (item, review) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => ({
        ...order,
        items: order.items.map((i) =>
          i === item ? { ...i, reviewed: true, review } : i
        ),
      }))
    );
    setReviewModalOpen(false);
  };

  const handleReviewDelete = (item) => {
    const confirmDelete = window.confirm("정말 리뷰를 삭제하시겠습니까?");
    if (confirmDelete) {
      setOrders((prevOrders) => 
        prevOrders.map((order) => ({
          ...order,
          items: order.items.map((i) =>
            i === item ? { ...i, reviewed: false, review: '' } : i
          ),
        }))
      );
    }
  };

  return (
    <Box>
      <h1 style={{ textAlign: 'center' }}>주문내역</h1>
      <Box className="order-history-container">

        <div className="order-status-container">
          {['배송중', '배송완료', '취소/반품'].map((status) => (
            <div className="order-status-item" key={status}>
              <Typography sx={{ fontWeight: 'bold' }}>{status}</Typography>
              <Typography sx={{ color: 'gray' }}>{statusCounts[status]}</Typography>
            </div>
          ))}
        </div>

        {orders.map((order, orderIndex) => (
          <Box key={order.id} className="order-item">
            <Typography variant="subtitle1" className="order-date">
              {order.date}
              <Button
                variant="contained"
                className='DeleteButton'
                disabled={order.status === '구매확정'}
                onClick={() => handleCancel(orderIndex)}
              >
                구매취소
              </Button>
            </Typography>
            <Paper className="order-paper">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="order-image-placeholder" />
                  <div className="order-details">
                    <Box gap={1} sx={{display:'flex'}}>
                      <Typography className="order-status">{order.status}</Typography>
                      <Typography
                        className="order-delivery"
                        sx={{
                          textDecoration: order.status === '취소/반품' ? 'line-through' : 'none',
                        }}
                      >
                        • {item.deliveryDate}
                      </Typography>
                    </Box>
                    <Typography className="order-price">{item.price.toLocaleString()}원</Typography>
                    <Typography className="order-product">
                      {item.name} <br/> {item.option} {item.quantity}개
                    </Typography>
                  </div>
                  <div className="order-button-container">
                    <div>
                      <Button className="order-button" style={{marginTop:"-240px"}} >
                        문의하기
                      </Button>
                    </div>
                    <div>
                      {item.reviewed ? (
                        <Button
                          onClick={() => handleReviewDelete(item)}
                          className="order-button"
                          style={{marginTop:"-120px"}}
                        >
                          리뷰삭제
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleOpenReview(item)}
                          className="order-button"
                          style={{marginTop:"-120px"}}
                        >
                          리뷰작성
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Paper>
          </Box>
        ))}
      </Box>
      <ReviewModal
        open={reviewModalOpen}
        item={selectedItem}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </Box>
  );
};

export default OrderHistory;
