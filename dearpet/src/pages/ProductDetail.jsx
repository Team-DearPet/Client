import React, { useState } from 'react';
import { Container, Typography, Box, Grid2 } from '@mui/material';
import Header from '../component/Header';
import Footer from '../component/Footer';
import ProductInfo from '../component/ProductInfo';
import ReviewTabs from '../component/ReviewTabs';
import items from '../data/items';

function ProductDetail() {
    const [activeTab, setActiveTab] = useState('detail');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Header />
            <Container 
                maxWidth="lg" 
                sx={{ 
                    padding: 3, 
                    width: '100%' 
                }}>
                <Box 
                    sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider', 
                        marginBottom: 3 
                    }}>
                    <Typography
                        component="h1"
                        sx={{ 
                            typography: 'h5', 
                            color: 'textPrimary', 
                            marginBottom: '16px', 
                            marginLeft: '10px' 
                        }}>
                        [{items[1][0].brand}]{items[1][0].title}
                    </Typography>
                </Box>

                <Grid2 
                    container 
                    spacing={3}>
                    <Grid2 
                        item 
                        xs={12} 
                        md={6} 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center' 
                        }}>
                        <img 
                            src={items[1][0].image} 
                            alt="상품 이미지" 
                            style={{ 
                                width: 450, 
                                borderRadius: 8 
                            }} />
                    </Grid2>

                    <Grid2 
                        item 
                        xs={12} 
                        md={6}>
                        <ProductInfo 
                            item={items[1][0]} 
                            />
                    </Grid2>
                </Grid2>

                <ReviewTabs 
                    activeTab={activeTab} 
                    handleTabChange={handleTabChange} 
                />
            </Container>

            <Footer />
        </div>
    );
}

export default ProductDetail;
