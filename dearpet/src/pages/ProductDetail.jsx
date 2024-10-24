import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid2, Card, CardMedia, CardContent, CardActions, Button, Select, MenuItem, InputLabel, FormControl, Tabs, Tab, Avatar } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import Header from '../component/Header';
import Footer from '../component/Footer';
import items from '../data/items';

function ProductDetail() {
    const [quantity, setQuantity] = useState(0);
    const [activeTab, setActiveTab] = useState('detail');
    console.log(items[1][0].brand)

    // price에서 숫자만 추출하고, discount 적용
    const originalPrice = parseInt(items[1][0].price.replace(/,/g, '').replace('원', '')); // 18,000 -> 18000
    const discount = items[1][0].discount; // 23처럼 숫자 그대로 사용
    const finalPrice = originalPrice * (1 - discount / 100); // 할인가 계산

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const reviews = [
        {
            id: 1,
            username: '춤추는 다람쥐',
            rating: 4,
            comment: '저희 아이가 좋아해요!',
        },
        {
            id: 2,
            username: '행복한 강아지',
            rating: 5,
            comment: '정말 좋아요! 재구매 의사 있습니다.',
        },
    ];

    const renderStars = (rating) => {
        return (
            <Box display="flex" alignItems="center">
                {[...Array(5)].map((_, index) => (
                    index < rating ? <Star key={index} /> : <StarBorder key={index} />
                ))}
            </Box>
        );
    };

    return (
        <div>
            <Header />
            <Container maxWidth={false} sx={{ padding: 3, width: "80%" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
                <Typography
                component="h1"
                sx={{
                    typography: 'h5', 
                    color: 'textPrimary', 
                    marginBottom: '16px',
                    marginLeft: '10px'
                }}
                >
                [{items[1][0].brand}]{items[1][0].title}
                </Typography>
                </Box>

                <Grid2 container spacing={3}>
                    <Grid2 item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            image={items[1][0].image}
                            alt="상품 이미지"
                            sx={{ width: 450, borderRadius: 2  }}
                        />
                    </Grid2>

                    <Grid2 item xs={12} md={6}>
                        <Card variant="outlined" sx={{ padding: 3 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" marginBottom={2}>
                                    <Typography variant="h5" component="div" color="textPrimary">
                                    {finalPrice.toLocaleString()}원
                                    </Typography>
                                    <Box sx={{ backgroundColor: '#e1b0ff', color: 'white', padding: '5px 10px', borderRadius: 1, marginLeft: 2 }}>
                                    {items[1][0].discount}%
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    소비자가: {items[1][0].price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    배송비: 2,500원
                                </Typography>
                                <Typography variant="body2" color="textSecondary" marginBottom={3}>
                                    브랜드: {items[1][0].brand}
                                </Typography>

                                <FormControl 
                                sx={{ 
                                    width: '60%', // width를 60%로 설정 
                                    margin: 'normal',
                                    
                                }}>
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
                                    sx={{
                                        backgroundColor: '#7B52E1',
                                        fontSize: '1.2rem',
                                        padding: '12px 100px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                        backgroundColor: '#7B52E1',
                                        },
                                    }}>구매하기</Button>
                                <Link to="/cart">
                                    <Button sx={{
                                            backgroundColor: '#FFFFFF',
                                            color: '#AC92ED',
                                            fontSize: '1.2rem',
                                            padding: '12px 100px',
                                            border: '1px solid #7B52E1',
                                            boxShadow: 'none',
                                            '&:hover': {
                                            backgroundColor: '#FFFFFF',
                                            },
                                        }}>장바구니</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid2>
                </Grid2>

                <Box marginTop={5}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="상품 상세정보" value="detail" />
                        <Tab label="리뷰(20)" value="review" />
                    </Tabs>
                    <Box padding={3} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, marginTop: 2 }}>
                        {activeTab === 'detail' && <Typography>상품 상세정보 내용</Typography>}
                        {activeTab === 'review' && (
                            <Box>
                                {reviews.map((review) => (
                                    <Card key={review.id} variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
                                        <Box display="flex" alignItems="center" marginBottom={1}>
                                            <Avatar sx={{ marginRight: 2 }}>{review.username.charAt(0)}</Avatar>
                                            <Typography variant="body1" fontWeight="bold">
                                                {review.username}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">
                                            별점
                                        </Typography>
                                        {renderStars(review.rating)}
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                                            {review.comment}
                                        </Typography>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductDetail;
