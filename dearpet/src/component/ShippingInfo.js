import React, {useState} from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import AddressModal from './AddressModal';

const ShippingInfo = () => {
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(() => {
        return localStorage.getItem('selectedAddress') || ''; // 저장된 주소 불러오기
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    }

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
                <AddressModal open={open} onClose={handleClose} onSelectAddress={handleAddressSelect} />
            </Box>
            {/* 배송주소에 선택된 주소 표시 */}
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="배송주소" style={{ fontSize: '1.1rem', marginRight: '16px', minWidth: '120px' }}>배송주소</label>
                <TextField
                    fullWidth
                    id="배송주소"
                    value={selectedAddress} // 선택된 주소 반영
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
            {/* 요청사항 입력란 */}
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <label 
                    htmlFor="요청사항" 
                    style={{ fontSize: '1.1rem', marginRight: '16px', minWidth: '120px' }}
                >
                    요청사항
                </label>
                <TextField
                    fullWidth
                    id="요청사항"
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
