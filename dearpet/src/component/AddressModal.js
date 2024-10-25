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

const AddressModal = ({ open, onClose, onSelectAddress }) => {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState(() => {
    // 로컬 스토리지에서 저장된 주소를 가져옴
    const savedAddresses = localStorage.getItem('addressList');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });
  const [selectedAddress, setSelectedAddress] = useState(() => {
    return localStorage.getItem('selectedAddress') || ''; // 저장된 주소 불러오기
  });

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

  useEffect(() => {
    localStorage.setItem('addressList', JSON.stringify(addressList));
  }, [addressList]);

  useEffect(() => {
    localStorage.setItem('selectedAddress', selectedAddress);
  }, [selectedAddress]);

  const handleAddressSearch = () => {
    // Daum 우편번호 서비스 호출
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        addAddressToList(fullAddress);
      },
    }).open();
  };

  const addAddressToList = (newAddress) => {
    setAddressList((prev) => [...prev, newAddress]);
  };

  const handleSelect = (address) => {
    setSelectedAddress(address);
    onSelectAddress(address); // 부모로 선택된 주소 전달
  };

  const removeAddress = (index) => {
    const updatedList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedList);
    if (selectedAddress === addressList[index]) {
      setSelectedAddress(''); // 선택된 주소가 삭제될 경우 초기화
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{textAlign:'center'}}>배송지 관리</DialogTitle>
      <DialogContent>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            fullWidth
            label="배송지 입력"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginRight: 1 }}
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
          <RadioGroup value={selectedAddress} onChange={(e) => handleSelect(e.target.value)}>
            {addressList.map((addr, index) => (
              <Card key={index} variant="outlined" sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Radio />}
                    label={addr}
                    value={addr}
                  />
                </CardContent>
                <IconButton onClick={() => removeAddress(index)}>
                  <CloseIcon />
                </IconButton>
              </Card>
            ))}
          </RadioGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
