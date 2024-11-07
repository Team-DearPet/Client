import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Typography, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [dialogId, setDialogId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('') // 배송상태필터
  const orderStatus = ['PENDING', 'SHIPPED', 'DELIVERED']
  const [cancelReason, setCancelReason] = useState('');

  const handleDialogClose = () => setDialogOpen(false);

  const openDialog = (message, id) => {
      setDialogMessage(message);
      setDialogOpen(true);
      setDialogId(id);
  };

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await fetch(`https://www.carepet.site/api/orders`, {
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
          const itemsResponse = await fetch(`https://www.carepet.site/api/orders/${order.orderId}/items`, {
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
              const productResponse = await fetch(`https://www.carepet.site/api/products/${item.productId}`, {
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

              const reviewResponse = await fetch(`https://www.carepet.site/api/products/${item.productId}/has-reviewed`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
              })

              if (!reviewResponse.ok) {
                throw new Error('Failed to fetch product details');
              }

              const reviewed = await reviewResponse.json()
              return { ...item, name: productData.name, image: productData.image, reviewed: reviewed };
            })
          );
  
          return { ...order, items };
        })
      );
  
      setOrders(orders);
      console.log(orders)
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };
  

useEffect(()=>{fetchOrders()},[])

  const handleCancel = (id) => {
    openDialog('정말 주문을 취소하시겠습니까?', id);
    return;
  }

  const orderCancel = async (id) => {
    try {
      const response = await fetch(`https://www.carepet.site/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason: cancelReason }),
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

  const handleStatusChange = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const currentStatusIndex = orderStatus.indexOf(order.status);
          const nextStatus = currentStatusIndex < orderStatus.length - 1
            ? orderStatus[currentStatusIndex + 1]
            : order.status;  // 더 이상 변경할 상태가 없으면 그대로 유지
          
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  const updateStatusCounts = () => {
    let 배송중 = 0, 배송완료 = 0, 취소반품 = 0;
  
    orders.forEach((order) => {
      if (order.status === 'SHIPPED') 배송중++;
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

  const handleReviewChange = (item) => {
    setSelectedItem(item);
    setReviewModalOpen(true);
  }

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

  const filteredOrders = orders.filter((order) => {
    // if (statusFilter === '') return true;
    if (statusFilter === '') {
      return order.status !== 'CANCELLED'; // 기본 상태에서도 'CANCELLED' 상태인 주문 제외
    }
    if (statusFilter === '배송중') return order.status === 'SHIPPED';
    if (statusFilter === '배송완료') return order.status === 'DELIVERED';
    if (statusFilter === '취소/반품') return order.status === 'CANCELLED';
    return false;
  });

  return (
    <div>
      <Box>
        <h1 style={{ textAlign: 'center', cursor: 'pointer' }} onClick={()=>{setStatusFilter('')}}>주문내역</h1>
        <Box className="order-history-container">
  
          <div className="order-status-container">
            {['배송중', '배송완료', '취소/반품'].map((status) => (
              <div className="order-status-item" key={status} onClick={() => { 
                setStatusFilter(status); 
              }}>
                <Typography sx={{ fontWeight: statusFilter === status ? 'bold' : 'normal', color: statusFilter === status ? '#7B52E1' : 'black' }}>{status}</Typography>
                <Typography sx={{ color: statusFilter === status ? '#ff4d4f' : 'gray' }}>{statusCounts[status]}</Typography>
              </div>
            ))}
          </div>
  
          {filteredOrders.slice().reverse().map((order) => (
            <Box key={order.orderId} className="order-item">
              <Typography variant="subtitle1" className="order-date">
                {new Date(order.date).toLocaleDateString()}
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#7B52E1', color: '#7B52E1'}}
                    onClick={() => handleStatusChange(order.orderId)}
                    disabled={order.status === 'CANCELLED'}  // CANCELLED 상태에서는 버튼 비활성화
                  >
                    상태 변경
                  </Button>
                  <Button
                    variant="contained"
                    className='DeleteButton'
                    disabled={order.status === 'DELIVERED' || order.status === 'CANCELLED'}
                    onClick={() => handleCancel(order.orderId)}
                  >
                    구매취소
                  </Button>
                </Box>
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
                        {order.status === "PENDING" 
                          ? "결제완료" 
                          : order.status === "SHIPPED" 
                          ? "배송중" 
                          : order.status === "DELIVERED" 
                          ? "구매확정" 
                          : order.status === "CANCELLED" 
                          ? "주문취소" 
                          : ""}
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
                            })} {order.status === 'DELIVERED'? '배송완료' : '배송예정'}
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
                            onClick={() => handleReviewChange(item)}
                            className="order-button"
                            style={{marginTop:"-120px"}}
                          >
                            리뷰수정
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
        <DialogContentText>{dialogMessage}</DialogContentText>
          <TextField
            label="취소 사유"
            fullWidth
            multiline
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#7B52E1',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7B52E1',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#7B52E1',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ mr: '15px', mb: '15px' }}>
            <Button onClick={handleDialogClose} sx={{ color: '#6A47B1' }}>취소</Button>
            <Button 
                onClick={() => { handleDialogClose(); orderCancel(dialogId) }} 
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
