import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ReviewList from './ReviewList';

const ProductTabs = ({ activeTab, handleTabChange, product }) => {
    return (
        <Box marginTop={5}>
            <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                centered
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#7B52E1'
                    }
                }}>
                <Tab 
                    label="상품 상세정보" 
                    value="detail"
                    sx={{ 
                        '&.Mui-selected': { 
                            color: '#7B52E1' 
                        }, 
                        color: 'black',
                        fontSize: '1.2rem' 
                    }}>
                </Tab>
                <Tab 
                    label="리뷰" 
                    value="review"
                    sx={{ 
                        '&.Mui-selected': { 
                            color: '#7B52E1' 
                        }, 
                        color: 'black', 
                        fontSize: '1.2rem' 
                    }}>
                </Tab>
            </Tabs>
            <Box 
                padding={3} 
                sx={{ 
                    backgroundColor: '#fff', 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    marginTop: 2 
                }}>
                {activeTab === 'detail' && <Typography>{product.description}</Typography>}
                {activeTab === 'review' && <ReviewList product={product} />}
            </Box>
        </Box>
    );
};

export default ProductTabs;
