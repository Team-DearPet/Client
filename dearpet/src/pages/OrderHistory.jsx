import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../style/OrderHistory.css';
import ReviewModal from '../component/ReviewModal';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusCounts, setStatusCounts] = useState({'배송중': 0, '배송완료': 0, '취소/반품': 0});
  const accessToken = localStorage.getItem('token');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);

  const handleDialogClose = () => setDialogOpen(false);

  const openDialog = (message, action) => {
      setDialogMessage(message);
      setDialogAction(() => action);
      setDialogOpen(true);
  };

  const fetchOrders = async () => {
    try {
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

  const handleCancel = (id) => {
    openDialog('정말 주문을 취소하시겠습니까?',() => orderCancel(id));
    return;
  }

  const orderCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel orders');
      }
    }catch(error){
      console.error('Error canceling orders', error);
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === id ? { ...order, status: 'CANCELLED' } : order
      )
    );

    // 취소된 상태 카운트 업데이트
    setStatusCounts((prev) => ({
      ...prev,
      '취소/반품': prev['취소/반품'] + 1,
    }));
  };

  const updateStatusCounts = () => {
    let 배송중 = 0, 배송완료 = 0, 취소반품 = 0;
  
    orders.forEach((order) => {
      if (order.status === 'DELIVERED') 배송완료++;
      if (order.status === 'CANCELLED') 취소반품++;
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
  
          {orders.slice().reverse().map((order) => (
            <Box key={order.orderId} className="order-item">
              <Typography variant="subtitle1" className="order-date">
                {new Date(order.date).toLocaleDateString()}
                <Button
                  variant="contained"
                  className='DeleteButton'
                  disabled={order.status === 'DELIVERED' || order.status === 'CANCELLED'}
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
                          {order.status === "PENDING" ? "결제완료" : order.status === "SHIPPED" ? "배송중" : "CANCELLED" ? "주문취소" : "구매확정"}
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
      <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '400px', 
                        maxWidth: '600px', 
                    },
                }}
            >
                <DialogTitle>알림</DialogTitle>
                <DialogContent>
                    <DialogContentText dangerouslySetInnerHTML={{ __html: dialogMessage }} />
                </DialogContent>
                <DialogActions sx={{ mr: '15px', mb: '15px' }}>
                    <Button onClick={handleDialogClose} sx={{ color: '#6A47B1' }}>취소</Button>
                    <Button 
                        onClick={() => { handleDialogClose(); dialogAction && dialogAction(); }} 
                        sx={{ bgcolor: '#6A47B1', color: 'white', '&:hover': { bgcolor: '#7B52E1' } }}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
      <Footer />
    </div>
  );
};

export default OrderHistory;
