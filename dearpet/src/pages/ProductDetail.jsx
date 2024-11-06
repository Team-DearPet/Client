import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid2 } from '@mui/material';
import Footer from '../component/Footer';
import ProductInfo from '../component/ProductInfo';
import ProductTabs from '../component/ProductTabs';
// import items from '../data/items';

function ProductDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('detail');
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const fetchProduct = async () => {
        const accessToken = localStorage.getItem('token');
        try{
        const response = await fetch(`https://www.carepet.site/api/products/${productId}`, {
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
        setProduct(data);
        } catch (error) {
        console.error('Error: ', error);
        setErrorMessage("서버 오류 발생");
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[productId]);

    if (errorMessage) return <p>{errorMessage}</p>;
    if (!product) return <p>로딩 중...</p>;
    return (
        <div>
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
                        {product.name}
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
                            src={product.image} 
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
                            item={product} 
                            />
                    </Grid2>
                </Grid2>

                <ProductTabs 
                    activeTab={activeTab} 
                    handleTabChange={handleTabChange}
                    product={product}
                />
            </Container>

            <Footer />
        </div>
    );
}

export default ProductDetail;
