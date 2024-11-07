import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AddressModal = ({ open, onClose, onAddressChange }) => {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');

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

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://www.carepet.site/api/profile/addresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddressList(response.data);
      const defaultAddr = response.data.find((addr) => addr.defaultAddress === true);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.addressId);
      }
    } catch (error) {
      console.error('주소 목록을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAddresses();
    }
  }, [open]);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        addAddressToList(fullAddress);
        setSelectedAddressId(fullAddress);
      },
    }).open();
  };

  const addAddressToList = async (newAddress) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('https://www.carepet.site/api/profile/addresses', 
        { address: newAddress }, 
        { headers: { Authorization: `Bearer ${token}` } } 
      ); 
      
      setAddress('');
      await fetchAddresses();

    } catch (error) {
      console.error('주소 추가에 실패했습니다:', error);
    }
  };

  const handleSelect = async (addressId) => {
    try {
      setSelectedAddressId(addressId);
      await updateAddressToDefault(addressId);
    } catch (error) {
      console.error('기본 배송지 선택 업데이트 실패: ', error);
    }
  };

  const updateAddressToDefault = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      const selectedAddr = addressList.find(addr => addr.addressId === Number(addressId));

      if (!selectedAddr) {
        console.error('선택된 주소를 찾을 수 없습니다. addressList:', addressList, 'addressId:', addressId);
        return; 
      }

      await axios.patch(`https://www.carepet.site/api/profile/addresses/${addressId}`, 
        { 
          defaultAddress: true,
          address: selectedAddr.address 
        }, 
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      await fetchAddresses();
      onAddressChange(selectedAddr.address);

    } catch (error) {
      console.error('주소를 기본 주소로 설정하는 데 실패했습니다:', error);
    }
  };
  

  const removeAddress = async (addressId) => {
    const confirmDelete = window.confirm('이 주소를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token'); 
        await axios.delete(`https://www.carepet.site/api/profile/addresses/${addressId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }); 
        const updatedList = addressList.filter((addr) => addr.addressId !== addressId);
        setAddressList(updatedList);
        if (selectedAddressId === addressId) {
          setSelectedAddressId(''); 
        }
      } catch (error) {
        console.error('주소 삭제에 실패했습니다:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>배송지 관리</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop:1, marginBottom: 2 }}>
          <TextField
            fullWidth
            label="배송지 입력"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ 
              marginRight: 1,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7B52E1',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#7B52E1',
              },
            }}
          />
          <Button variant="contained" sx={{
            width: '200px',
            height: '55px',
            bgcolor: '#7B52E1',
            color: 'white',
            '&:hover': {
              bgcolor: '#6A47B1'
            }
          }} onClick={handleAddressSearch}>
            우편번호 찾기
          </Button>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">배송지 선택</Typography>
          <RadioGroup value={selectedAddressId} onChange={(e) => handleSelect(e.target.value)} sx={{
              '& .MuiRadio-root.Mui-checked': {
                color: '#7B52E1',
              },
            }}>
            {addressList.map((addr, index) => (
              <Card key={index} variant="outlined" sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Radio value={addr.addressId} />} 
                    label={addr.address}
                  />
                </CardContent>
                <IconButton onClick={() => removeAddress(addr.addressId)}>
                  <CloseIcon />
                </IconButton>
              </Card>
            ))}
          </RadioGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#7B52E1' }}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
