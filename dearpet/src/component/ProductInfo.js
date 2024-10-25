import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductInfo = ({ item }) => {
    const [quantity, setQuantity] = useState(1); // 기본 수량 1

    // 가격 계산 로직
    const originalPrice = parseInt(item.price.replace(/,/g, '').replace('원', ''));
    const discount = item.discount;
    const finalPrice = originalPrice * (1 - discount / 100);

    const handleAddToCart = () => {
        alert('장바구니에 상품을 담았습니다.');
    };

    
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Card 
            variant="outlined" 
            sx={{ 
                padding: 3 
            }}>
            <CardContent>
                <Box 
                    display="flex" 
                    alignItems="center" 
                    marginBottom={2}>
                    <Typography 
                        variant="h5" 
                        component="div" 
                        color="textPrimary">
                        {finalPrice.toLocaleString()}원
                    </Typography>
                    <Box 
                        sx={{ 
                            backgroundColor: '#e1b0ff', 
                            color: 'white', 
                            padding: '5px 10px', 
                            borderRadius: 1, 
                            marginLeft: 2 
                        }}>
                        {item.discount}%
                    </Box>
                </Box>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    fontSize="1.1rem">
                    소비자가: {item.price}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    fontSize="1.1rem">
                    배송비: 2,500원
                </Typography>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    marginBottom={3} 
                    fontSize="1.1rem">
                    브랜드: {item.brand}
                </Typography>
                
                {/* 수량 조절 및 표시 */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginTop: 2 
                    }}>
                    <IconButton onClick={handleDecrease}>
                        <RemoveIcon />
                    </IconButton>
                    <Typography 
                        variant="body2"
                        sx={{ 
                            fontSize: '1.2rem', 
                            mx: 2 
                        }}>
                        {quantity}
                    </Typography>
                    <IconButton onClick={handleIncrease}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Typography 
                    variant="h6" 
                    component="div" 
                    marginTop={3}>
                    총 상품금액: {(quantity * finalPrice).toLocaleString()}원
                </Typography>
            </CardContent>
            <CardActions 
                sx={{ 
                    justifyContent: 'space-between' 
                }}>
                <Link to="/order">
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#7B52E1', 
                            fontSize: '1.2rem', 
                            padding: '12px 100px', 
                            boxShadow: 'none' 
                        }}>
                        구매하기
                    </Button>
                </Link>
                <Button 
                    sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#AC92ED',
                        fontSize: '1.2rem',
                        padding: '12px 80px',
                        border: '1px solid #7B52E1',
                        boxShadow: 'none'
                    }}
                    onClick={handleAddToCart}>
                    장바구니 담기
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductInfo;
