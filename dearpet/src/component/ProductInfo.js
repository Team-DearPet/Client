import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useStore from '../data/store';

const ProductInfo = ({ item }) => {
    const [quantity, setQuantity] = useState(1); // 기본 수량 1
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState(null);
    const navigate = useNavigate();
    const setOrderItems = useStore(state => state.setOrderItems);

    const discount = item.discount || 0;
    const originalPrice = item.price * (1 + discount / 100);
    const finalPrice = item.price;

    const handleDialogClose = () => setDialogOpen(false);

    const openDialog = (message, action) => {
        setDialogMessage(message);
        setDialogAction(() => action);
        setDialogOpen(true);
    };

    const handleBuyItem = () => {
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            openDialog('로그인이 필요한 페이지입니다.<br />로그인하시겠습니까?', () => navigate('/login'));
            return;
        }

        const items = [{
            productId: item.productId,
            productName: item.name,
            quantity,
            price: item.price * quantity,
        }];
        setOrderItems(items)
        navigate('/order');
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            openDialog('로그인이 필요한 페이지입니다.<br />로그인하시겠습니까?', () => navigate('/login'));
            return;
        }

        try {
            const response = await fetch(`https://www.carepet.site/api/cart/items?productId=${item.productId}&quantity=${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                openDialog('장바구니에 상품을 담았습니다.<br />장바구니로 이동하시겠습니까?', () => navigate('/cart'));
            } else {
                console.error('Error adding item to cart');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <>
            <Card 
                variant="outlined" 
                sx={{ padding: 6 }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2} padding='3px'>
                        <Typography variant="h5" component="div" color="textPrimary" sx={{ fontSize: '1.9rem' }}>
                            {finalPrice.toLocaleString()}원
                        </Typography>
                        {discount > 0 && (
                            <Box sx={{ backgroundColor: '#e1b0ff', color: 'white', padding: '5px 10px', borderRadius: 1, marginLeft: 2 }}>
                                {item.discount}%
                            </Box>
                        )}
                    </Box>
                    <Typography variant="body2" color="textSecondary" fontSize="1.1rem">
                        소비자가: {originalPrice.toLocaleString()}원
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize="1.1rem">
                        배송비: 2,500원
                    </Typography>
                    <Typography variant="body2" color="textSecondary" marginBottom={3} fontSize="1.1rem">
                        브랜드: {item.seller}
                    </Typography>
                    
                    {/* 수량 조절 및 표시 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <IconButton onClick={handleDecrease}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontSize: '1.2rem', mx: 2 }}>
                            {quantity}
                        </Typography>
                        <IconButton onClick={handleIncrease}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="h6" component="div" marginTop={3}>
                        총 상품금액: {(quantity * finalPrice).toLocaleString()}원
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        onClick={handleBuyItem}
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#7B52E1', 
                            fontSize: '1.2rem', 
                            padding: '12px 100px', 
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: '#6A47B1' }
                        }}
                    >
                        구매하기
                    </Button>
                    <Button 
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: '#FFFFFF',
                            color: '#AC92ED',
                            fontSize: '1.2rem',
                            padding: '12px 80px',
                            border: '1px solid #7B52E1',
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: '#E0D7F8' }
                        }}
                    >
                        장바구니 담기
                    </Button>
                </CardActions>
            </Card>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '400px', 
                        maxWidth: '600px', 
                    },
                }}
            >
                <DialogTitle>알림</DialogTitle>
                <DialogContent>
                    <DialogContentText dangerouslySetInnerHTML={{ __html: dialogMessage }} />
                </DialogContent>
                <DialogActions sx={{ mr: '15px', mb: '15px' }}>
                    <Button onClick={handleDialogClose} sx={{ color: '#6A47B1' }}>취소</Button>
                    <Button 
                        onClick={() => { handleDialogClose(); dialogAction(); }} 
                        sx={{ bgcolor: '#6A47B1', color: 'white', '&:hover': { bgcolor: '#7B52E1' } }}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductInfo;
