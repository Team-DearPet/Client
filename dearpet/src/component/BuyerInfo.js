import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const BuyerInfo = ({ data, onPhoneChange }) => {
    const [contact, setContact] = useState('');

    const formatPhoneNumber = (value) => {
        const numericValue = value.replace(/\D/g, '');

        // '000-0000-0000' 형식으로 포맷팅
        const match = numericValue.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
        if (!match) return value;

        const formatted = `${match[1]}${match[2] ? '-' + match[2] : ''}${
            match[3] ? '-' + match[3] : ''
        }`;

        return formatted;
    };

    const handleContactChange = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setContact(formattedValue);
        onPhoneChange(formattedValue);
    };

    const fields = [
        { label: '이름', value: data.username, readOnly: true },
        { label: '이메일', value: data.email, readOnly: true },
        { label: '연락처', value: contact, readOnly: false, onChange: handleContactChange },
    ];

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

            {fields.map((field, index) => (
                <Box 
                    key={index} 
                    mb={2} 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center' 
                    }}>
                    <Box 
                        component="label" 
                        htmlFor={field.label} 
                        sx={{ 
                            fontSize: '1.1rem', 
                            marginRight: '16px', 
                            minWidth: '120px' 
                        }}>
                        {field.label}
                    </Box>
                    <TextField 
                        fullWidth 
                        id={field.label}
                        value={field.value}
                        onChange={field.onChange}
                        variant="outlined"
                        InputProps={{
                            readOnly: field.readOnly,
                        }}
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
