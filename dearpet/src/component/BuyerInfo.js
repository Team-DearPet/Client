import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const BuyerInfo = () => {
    return (
        <Box>
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                    fontWeight: 600, 
                    marginRight: '16px' 
                }}>
                구매자 정보
            </Typography>
            
            {['이름', '이메일', '연락처'].map((label, index) => (
                <Box 
                    key={index} 
                    mb={2} 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center' 
                    }}>
                    <Box 
                        component="label" 
                        htmlFor={label} 
                        sx={{ 
                            fontSize: '1.1rem', 
                            marginRight: '16px', 
                            minWidth: '120px' 
                        }}>
                        {label}
                    </Box>
                    <TextField 
                        fullWidth 
                        id={label} 
                        variant="outlined" 
                        sx={{ 
                            borderRadius: '16px', 
                            '& .MuiOutlinedInput-root': { 
                                borderRadius: '50px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#D1C4E9' 
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#D1C4E9' 
                                }
                            } 
                        }} 
                    />
                </Box>
            ))}
        </Box>
    );
};

export default BuyerInfo;
