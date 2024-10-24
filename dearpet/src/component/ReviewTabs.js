import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ReviewList from './ReviewList';

const ReviewTabs = ({ activeTab, handleTabChange }) => {
    return (
        <Box marginTop={5}>
            <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                centered
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#7B52E1' // 보라색으로 설정
                    }
                }}
                >
                <Tab 
                    label="상품 상세정보" 
                    value="detail"
                    sx={{
                        '&.Mui-selected': { color: '#7B52E1' }, // 활성화된 탭 글자색을 보라색으로 설정
                        color: 'black', // 기본 글자색
                    }} 
                />
                <Tab 
                    label="리뷰(20)" 
                    value="review"
                    sx={{
                        '&.Mui-selected': { color: '#7B52E1' }, // 활성화된 탭 글자색을 보라색으로 설정
                        color: 'black', // 기본 글자색
                    }} 
                />
            </Tabs>
            <Box padding={3} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, marginTop: 2 }}>
                {activeTab === 'detail' && <Typography>상품 상세정보 내용</Typography>}
                {activeTab === 'review' && <ReviewList />}
            </Box>
        </Box>
    );
};

export default ReviewTabs;
