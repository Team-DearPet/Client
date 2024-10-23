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
  const [orderCnts, setOrderCnts] = useState({
    주문접수: 0,
    결제완료: 0,
    상품준비중: 0,
    배송중: 0,
    배송완료: 0,
  });

  const [locationData, setLocationData] = useState({
    postcode: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
    extraAddress: '',
  });

  useEffect(() => {
    const fetchedData = {
      주문접수: 0,
      결제완료: 1,
      상품준비중: 0,
      배송중: 0,
      배송완료: 0,
    };
    setOrderCnts(fetchedData);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOrder = () => {
    navigate('/orderhistory');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => {
      console.log('Daum Postcode script loaded.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5vh',
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
          bgcolor: 'background.paper',
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
              border: '1px solid #d9d9d9',
              borderRadius: 2,
            }}
          >
            <LocationOnOutlinedIcon />
            <Typography variant="button" sx={{ textTransform: 'none' }}>
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
                      borderRadius: '15%',
                      bgcolor: '#f1f3f5',
                    }}
                  >
                    <Typography variant="h6" color={orderCnts[status] !== 0 ? '#FF4255' : '#BEBFCA'}>
                      {orderCnts[status]}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="#616161">
                    {status}
                  </Typography>
                </Box>
              </Grid2>
              {index < 4 && (
                <NavigateNextIcon sx={{ margin: '0 8px', color: '#F3F3F6' }} />
              )}
            </React.Fragment>
          ))}
        </Grid2>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#F3F3F6',
            padding: 1,
            borderRadius: 2,
            marginBottom: 2,
            width: '80%',
          }}
        >
          {['취소', '교환', '반품', '구매확정'].map((label, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="#BEBFCA">
                0
              </Typography>
            </Box>
          ))}
        </Box>

        <Button onClick={handleOrder} variant="text" sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }}>
          주문/배송 조회 보러가기 &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default OrderStatus;
