import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button, Select, MenuItem, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductInfo = ({ item }) => {
    const [quantity, setQuantity] = useState(0);

    // 가격 계산 로직
    const originalPrice = parseInt(item.price.replace(/,/g, '').replace('원', ''));
    const discount = item.discount;
    const finalPrice = originalPrice * (1 - discount / 100);

    return (
        <Card variant="outlined" sx={{ padding: 3 }}>
            <CardContent>
                <Box display="flex" alignItems="center" marginBottom={2}>
                    <Typography variant="h5" component="div" color="textPrimary">
                        {finalPrice.toLocaleString()}원
                    </Typography>
                    <Box sx={{ backgroundColor: '#e1b0ff', color: 'white', padding: '5px 10px', borderRadius: 1, marginLeft: 2 }}>
                        {item.discount}%
                    </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" fontSize="1.1rem">
                    소비자가: {item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize="1.1rem">
                    배송비: 2,500원
                </Typography>
                <Typography variant="body2" color="textSecondary" marginBottom={3} fontSize="1.1rem">
                    브랜드: {item.brand}
                </Typography>

                <FormControl sx={{ width: '60%' }}>
                    <Select
                        labelId="product-option-label"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        <MenuItem value={0}>[필수] 개수를 선택해주세요</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>

                <Typography variant="h6" component="div" marginTop={3}>
                    총 상품금액: {(quantity * finalPrice).toLocaleString()}원
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#7B52E1', fontSize: '1.2rem', padding: '12px 100px', boxShadow: 'none' }}
                >
                    구매하기
                </Button>
                <Link to="/cart">
                    <Button sx={{ backgroundColor: '#FFFFFF', color: '#AC92ED', fontSize: '1.2rem', padding: '12px 100px', border: '1px solid #7B52E1', boxShadow: 'none' }}>
                        장바구니
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default ProductInfo;
