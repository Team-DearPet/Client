import React, {useEffect, useState} from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import AddressModal from './AddressModal';

const ShippingInfo = ( { onAddressChange, onRequireChange }) => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [requirements, setRequirements] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://www.carepet.site/api/profile/addresses', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('주소 목록을 가져오는 데 실패했습니다.');
            }
    
            const data = await response.json();
            const defaultAddr = data.find((addr) => addr.defaultAddress === true);
            if (defaultAddr) {
                const fullAddress = `${defaultAddr.address} ${detailAddress}`;
                setAddress(fullAddress);
                onAddressChange(fullAddress);
            }
          } catch (error) {
            console.error('주소 목록을 가져오는 데 실패했습니다:', error);
          }
    }

    useEffect(() => {
        fetchAddress();
    }, []);
    
    const handleAddressChange = (newAddress) => {
        const fullAddress = `${newAddress} ${detailAddress}`; // 주소와 상세주소 합침
        setAddress(newAddress);
        onAddressChange(fullAddress);
    };

    const handleDetailAddressChange = (newDetailAddress) => {
        setDetailAddress(newDetailAddress);
        const fullAddress = `${address} ${newDetailAddress}`
        onAddressChange(fullAddress);
    };

    const handleRequireChange = (newRequire) => {
        setRequirements(newRequire);
        onRequireChange(newRequire);
    };

    
    return (
        <Box mt={4}>
            <Box 
                mb={2} 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    paddingTop: '15px' 
                }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 600, 
                        marginRight: '16px' 
                    }}>
                    배송지 정보
                </Typography>
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    sx={{ 
                        color: 'black', 
                        marginLeft: '35px', 
                        backgroundColor: 'white',
                        fontSize: '1rem', 
                        padding: '5px 80px', 
                        boxShadow: 'none',
                        borderRadius: '50px', 
                        border: '2px solid #D1C4E9',
                        '&:hover': { 
                            backgroundColor: '#D1C4E9', 
                            border: '2px solid #D1C4E9' 
                        }
                    }}>
                    배송지 변경
                </Button>
                <AddressModal open={open} onClose={handleClose} onAddressChange={handleAddressChange}/>
            </Box>
            {/* 배송주소에 선택된 주소 표시 */}
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="배송주소" style={{ fontSize: '1.1rem', marginRight: '16px', minWidth: '120px' }}>배송주소</label>
                <TextField
                    fullWidth
                    id="배송주소"
                    value={address} // 선택된 주소 반영
                    variant="outlined"
                    sx={{
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                        },
                    }}
                />
            </Box>
            {/* 상세주소 입력 */}
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="상세주소" style={{ fontSize: '1.1rem', marginRight: '16px', minWidth: '120px' }}>상세주소</label>
                <TextField
                    fullWidth
                    id="상세주소"
                    value={detailAddress}
                    onChange={(e) => handleDetailAddressChange(e.target.value)} // 상세주소 상태 업데이트
                    variant="outlined"
                    sx={{
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                        },
                    }}
                />
            </Box>

            {/* 요청사항 입력 */}
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="요청사항" style={{ fontSize: '1.1rem', marginRight: '16px', minWidth: '120px' }}>요청사항</label>
                <TextField
                    fullWidth
                    id="요청사항"
                    value={requirements}
                    onChange={(e) => handleRequireChange(e.target.value)} // 요청사항 상태 업데이트
                    variant="outlined"
                    sx={{
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1C4E9' },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ShippingInfo;
