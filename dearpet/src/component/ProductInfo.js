import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductInfo = ({ item }) => {
    const [quantity, setQuantity] = useState(1); // 기본 수량 1
    const navigate = useNavigate();

    // 가격 계산 로직
    const discount = item.discount || 0;
    const originalPrice = item.price * (1 + discount/100);
    const finalPrice = item.price;

    const handleBuyItem = () => {
        const accessToken = localStorage.getItem('token');

        if( !accessToken ){
            const userConfirmed = window.confirm("로그인이 필요한 페이지입니다.\n로그인하시겠습니까?");
            if(userConfirmed){
                navigate('/login');
            }
            return;
        }

        const items = [{
            productName: item.name,
            quantity: quantity,
            price: item.price * quantity,
        }];
        navigate(`/order?items=${encodeURIComponent(JSON.stringify(items))}`);
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        
        if (!accessToken) {
            const userConfirmed = window.confirm("로그인이 필요한 페이지입니다.\n로그인하시겠습니까?");
            if (userConfirmed) {
                navigate('/login'); // 로그인 페이지로 이동
            }
            return;
        }
        
        try{
        const productId = item.productId;

        if (!item || !item.productId) {
            console.error("Invalid product item or product_id");
            return;
        }

        const response = await fetch(`http://localhost:8080/api/cart/items?productId=${productId}&quantity=${quantity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if(response.ok){
            const userConfirmed = window.confirm("장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?");
            if (userConfirmed) {
                navigate('/cart'); // 장바구니 페이지로 이동
            }
        }else{
            console.error('Error adding item');
        }}catch(error){
            console.error('Error: ',error);
        }
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
                paddingTop: 5, 
                paddingRight: 6, 
                paddingBottom: 6, 
                paddingLeft: 6 
            }}>
            <CardContent>
                <Box 
                    display="flex" 
                    alignItems="center" 
                    marginBottom={2}
                    padding= '3px' >
                    <Typography 
                        variant="h5" 
                        component="div" 
                        color="textPrimary"
                        sx={{ fontSize: '1.9rem' }}
                        >
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
                    소비자가: {originalPrice.toLocaleString()}원
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
                    브랜드: {item.seller}
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
                    <Button
                        onClick={handleBuyItem}
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#7B52E1', 
                            fontSize: '1.2rem', 
                            padding: '12px 100px', 
                            boxShadow: 'none' 
                        }}>
                        구매하기
                    </Button>
                <Button 
                    sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#AC92ED',
                        fontSize: '1.2rem',
                        padding: '12px 80px',
                        border: '1px solid #7B52E1',
                        boxShadow: 'none',
                        
                    }}
                    onClick={handleAddToCart}>
                    장바구니 담기
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductInfo;
