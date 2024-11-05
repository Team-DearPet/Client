import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import '../style/OrderHistory.css';
import ReviewModal from '../component/ReviewModal';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      const data = await response.json();
      const orders = await Promise.all(
        data.map(async (order) => {
          const itemsResponse = await fetch(`http://localhost:8080/api/orders/${order.orderId}/items`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });
  
          if (!itemsResponse.ok) {
            throw new Error('Failed to fetch items');
          }
  
          const itemsData = await itemsResponse.json();
          const items = await Promise.all(
            itemsData.map(async (item) => {
              const productResponse = await fetch(`http://localhost:8080/api/products/${item.productId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
              });
  
              if (!productResponse.ok) {
                throw new Error('Failed to fetch product details');
              }
  
              const productData = await productResponse.json();
              return { ...item, name: productData.name, image: productData.image };
            })
          );
  
          return { ...order, items };
        })
      );
  
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };
  

useEffect(()=>{fetchOrders()},[])
  
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
  
  useEffect(() => {
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
          i.productId === item.productId ? { ...i, reviewed: true, review } : i
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
            i.productId === item.productId ? { ...i, reviewed: false, review: '' } : i
          ),
        }))
      );
    }
  };

  return (
    <div>
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
  
          {orders.map((order) => (
            <Box key={order.orderId} className="order-item">
              <Typography variant="subtitle1" className="order-date">
                {new Date(order.date).toLocaleDateString()}
                <Button
                  variant="contained"
                  className='DeleteButton'
                  disabled={order.status === 'DELIVERED'}
                  onClick={() => handleCancel(order.orderId)}
                >
                  구매취소
                </Button>
              </Typography>
              <Paper className="order-paper">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-image-placeholder"
                    />
                    <div className="order-details">
                      <Box gap={1} sx={{display:'flex'}}>
                        <Typography className="order-status">
                          {order.status === "PENDING" ? "결제완료" : order.status === "SHIPPED" ? "배송중" : "구매확정"}
                        </Typography>
                        <Typography
                          className="order-delivery"
                          sx={{
                            textDecoration: order.status === 'CANCELLED' ? 'line-through' : 'none',
                          }}
                        >
                          • {new Date(order.eta).toLocaleDateString("ko-KR", {
                              month: "2-digit",  // 두 자리 월
                              day: "2-digit",    // 두 자리 일
                              weekday: "short"   // 짧은 요일 (월, 화, 수 등)
                            })} 배송예정
                        </Typography>
                      </Box>
                      <Typography className="order-price">{(item.price/item.quantity).toLocaleString()}원</Typography>
                      <Typography className="order-product">
                        {item.name} <br/> {item.quantity}개
                      </Typography>
                    </div>
                    <div className="order-button-container">
                      <div>
                        <Button onClick={()=> navigate(`/detail/${item.productId}`)}className="order-button" style={{marginTop:"-240px"}} >
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
      <Footer />
    </div>
  );
};

export default OrderHistory;
