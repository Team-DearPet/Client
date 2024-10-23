import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button, Select, MenuItem, InputLabel, FormControl, Tabs, Tab } from '@mui/material';
import petfoodImage from '../images/petfood.png';
import Header from '../component/Header';
import Footer from '../component/Footer';

function ProductDetail() {
    const [quantity, setQuantity] = useState(0);
    const [activeTab, setActiveTab] = useState('detail');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
        <Header />
        <Container maxWidth={false} sx={{ width: '100%', backgroundColor: '#f9f6fc', padding: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
                <Typography variant="h4" component="h1" color="textPrimary" gutterBottom>
                    [하림펫푸드] 강아지 사료
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        image={petfoodImage}
                        alt="상품 이미지"
                        sx={{ width: 300, borderRadius: 2, boxShadow: 3 }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ padding: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" marginBottom={2}>
                                <Typography variant="h5" component="div" color="textPrimary">
                                    15,000원
                                </Typography>
                                <Box sx={{ backgroundColor: '#e1b0ff', color: 'white', padding: '5px 10px', borderRadius: 1, marginLeft: 2 }}>
                                    25%
                                </Box>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                소비자가: 20,000원
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                배송비: 2,500원 (30,000원 이상 구매 시 무료)
                            </Typography>
                            <Typography variant="body2" color="textSecondary" marginBottom={3}>
                                브랜드: 하림펫푸드
                            </Typography>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="product-option-label">옵션</InputLabel>
                                <Select
                                    labelId="product-option-label"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                >
                                    <MenuItem value={0}>[필수] 용량을 선택해주세요</MenuItem>
                                    <MenuItem value={1}>1kg</MenuItem>
                                    <MenuItem value={2}>2kg</MenuItem>
                                    <MenuItem value={3}>3kg</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="h6" component="div" marginTop={3}>
                                총 상품금액: {quantity * 15000}원
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary">구매하기</Button>
                            <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary">장바구니</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <Box marginTop={5}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="상품 상세정보" value="detail" />
                    <Tab label="리뷰(20)" value="review" />
                </Tabs>
                <Box padding={3} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, marginTop: 2 }}>
                    {activeTab === 'detail' && <Typography>상품 상세정보 내용</Typography>}
                    {activeTab === 'review' && <Typography>리뷰 내용</Typography>}
                </Box>
            </Box>
        </Container>
        <Footer />
        </div>
    );
}

export default ProductDetail;
