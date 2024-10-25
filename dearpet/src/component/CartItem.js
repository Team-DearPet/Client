import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = ({ item, handleQuantityChange, handleCheckboxChange }) => {
    return (
        <Card key={item.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 0 }}> {/* boxShadow 값을 0으로 설정 */}
            <CardContent sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#F7F4FD' }}>
                <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                />
                <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ width: 100, height: 100, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        상품옵션: {item.option}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        상품금액: {item.price.toLocaleString()}원
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Typography variant="body2">수량</Typography> */}
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" sx={{ ml: 3 }}>
                    주문금액: {(item.price * item.quantity).toLocaleString()}원
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartItem;
