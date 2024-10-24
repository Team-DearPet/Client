import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

const ShippingInfo = () => {
    return (
        <Box mt={4}>
            <Box mb={2} sx={{ display: 'flex', alignItems: 'center', paddingTop: '15px'}}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, marginRight: '16px' }}>
                    배송지 정보
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'black', marginLeft: '16px', backgroundColor: 'white',
                        fontSize: '1rem', padding: '5px 80px', boxShadow: 'none',
                        borderRadius: '50px', border: '2px solid #D1C4E9',
                        '&:hover': { backgroundColor: '#F3E5F5', border: '2px solid #B39DDB' },
                    }}
                >
                    배송지 변경
                </Button>
            </Box>
            {['배송주소', '요청사항'].map((label, index) => (
                <Box key={index} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor={label} style={{ marginRight: '16px', minWidth: '120px' }}>{label}</label>
                    <TextField fullWidth id={label} variant="outlined" 
                        sx={{ borderRadius: '16px', '& .MuiOutlinedInput-root': { borderRadius: '50px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D1C4E9'}, 
                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#D1C4E9'} } }} />
                </Box>
            ))}
        </Box>
    );
};

export default ShippingInfo;
