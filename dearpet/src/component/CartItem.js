import React , {useState, useEffect }from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = ({ item, totalPrice, handleTotalChange, handleQuantityChange, handleCheckboxChange }) => {
    const [itemPrice, setItemPrice] = useState(item.price / item.quantity);
    const [itemImage, setItemImage] = useState('');
    
    const changeValue = (delta) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;
        handleQuantityChange(item.cartItemId, delta);
        handleTotalChange(itemPrice*newQuantity);
    }

    const fetchImage = async () => {
        const accessToken = localStorage.getItem('token');
        try{
        const response = await fetch(`https://www.carepet.site/api/products/${item.productId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }
        const data = await response.json();
        setItemImage(data.image);
        } catch (error) {
        console.error('Error: ', error);
        }
    }

    useEffect(()=>{
        fetchImage()
    },[]);

    return (
        <Card 
            key={item.cartItemId} 
            sx={{ 
                mb: 2, 
                borderRadius: 2, 
                boxShadow: 0 
            }}> {/* boxShadow 값을 0으로 설정 */}
            <CardContent 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: '#F7F4FD' 
                }}>
            <Checkbox
                checked={item.checked || false}
                onChange={() => handleCheckboxChange(item.cartItemId)}
                sx={{
                    color: '#6A47B1',
                    '&.Mui-checked': {
                        color: '#6A47B1',
                    },
                }}
            />
                <CardMedia
                    component="img"
                    image={itemImage}
                    alt={item.productName}
                    sx={{ 
                        width: 100, 
                        height: 100, 
                        mr: 3,
                        ml: 2
                    }}
                />
                <Box 
                    sx={{ 
                        flexGrow: 1 
                    }}>
                    <Typography 
                        variant="subtitle1"
                        sx={{ 
                            fontSize: '1.2rem' 
                        }}>
                        {item.productName}
                    </Typography>
                    {/* <Typography 
                        variant="body2" 
                        color="textSecondary">
                        상품옵션: {item.option}
                    </Typography> */}
                    <Typography 
                        variant="body2" 
                        color="textSecondary">
                        상품금액: {itemPrice.toLocaleString()}원
                    </Typography>
                </Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center' 
                    }}>
                    <IconButton onClick={() => changeValue(-1)}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography 
                        variant="body2"
                        sx={{ 
                            fontSize: '1.2rem' 
                        }}>
                        {item.quantity}
                    </Typography>
                    <IconButton onClick={() => changeValue(1)}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        ml: 3,
                        mr: 3,
                        fontSize: '1.2rem' 
                    }}>
                    주문금액: {totalPrice.toLocaleString()}원
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartItem;