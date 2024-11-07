import { Box, Typography, IconButton, Button, Grid2, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';

const OrderStatus = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchOrderStatus = async () => {
    try{
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

      const newOrderCounts = {
        주문접수: 0,
        결제완료: 0,
        상품준비중: 0,
        배송중: 0,
        배송완료: 0,
      };

      const newOrderStatus = {
        취소: 0,
        교환: 0,
        반품: 0,
        구매확정: 0,
      };

      data.forEach(order => {
        switch (order.status) {
          case 'PENDING':
            newOrderCounts.결제완료 += 1;
            break;
          case 'SHIPPED':
            newOrderCounts.배송중 += 1;
            break;
          case 'DELIVERED':
            newOrderCounts.배송완료 += 1;
            newOrderStatus.구매확정 += 1;
            break;
          case 'CANCELLED':
            newOrderStatus.취소 += 1;
            break;
          default:
            break;
        }
      });
  
      setOrderCnts(newOrderCounts);
      setOrderStatus(newOrderStatus);
    }catch(error){
      console.error('Failed fetching order', error)
    }
  }
  const [orderCnts, setOrderCnts] = useState({
    주문접수: 0,
    결제완료: 0,
    상품준비중: 0,
    배송중: 0,
    배송완료: 0,
  });
  const [orderStatus, setOrderStatus] = useState({
    취소: 0,
    교환: 0,
    반품: 0,
    구매확정: 0,
  });

  useEffect(() => {
    fetchOrderStatus()
  }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const handleOrder = () => {
    navigate('/orders');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5vh 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          maxWidth: 800,
          width: '100%',
          bgcolor: '#F7F4FD',
          gap: 2,
        }}
      >
        {/* 주문 내역 및 배송지 관리 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            주문내역
          </Typography>
          <IconButton
            variant="outlined"
            onClick={handleOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: 1,
              borderRadius: 2,
              backgroundColor:'white',
              border: '1px solid #AC92ED', 
              color: '#AC92ED', 
              '&:hover': { bgcolor: '#E0D7F8' } 
            }}
          >
            <LocationOnOutlinedIcon />
            <Typography variant="button" sx={{ textTransform: 'none', paddingRight: '10px' }}>
              배송지 관리
            </Typography>
          </IconButton>
          <AddressModal open={open} onClose={handleClose} />
        </Box>

        <Grid2
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: 2 }}
          
        >
          {['주문접수', '결제완료', '상품준비중', '배송중', '배송완료'].map((status, index) => (
            <React.Fragment key={index}>
              <Grid2 item sx={{ width: 70 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      marginBottom: '10px',
                      borderRadius: '15%',
                      bgcolor: 'white',
                    }}
                  >
                    <Typography variant="h6" color={orderCnts[status] !== 0 ? '#FF4255' : '#BEBFCA'}>
                      {orderCnts[status]}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="#616161" sx={{ marginTop: '5px' , fontSize: '1rem'}}>
                    {status}
                  </Typography>
                </Box>
              </Grid2>
              {index < 4 && (
                <NavigateNextIcon sx={{ margin: '0 8px', color: '#D3D2D2' }} />
              )}
            </React.Fragment>
          ))}
        </Grid2>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: 'white',
            padding: 1,
            borderRadius: 2,
            marginBottom: 2,
            width: '80%',
          }}
        >
          {['취소', '교환', '반품', '구매확정'].map((status, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {status}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="#BEBFCA">
              {orderStatus[status]}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button onClick={handleOrder} variant="text" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#7B52E1', fontSize: '1rem' }}>
          주문/배송 조회 보러가기 &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default OrderStatus;
