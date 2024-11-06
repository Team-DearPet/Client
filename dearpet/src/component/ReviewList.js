import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Avatar, Rating } from '@mui/material';
import axios from 'axios';

const ReviewList = ({ product }) => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        photo: '',
        nickname: '',
    });
    const productId = product.productId;

    const fetchReviews = async () => {
        try {
            const response = await fetch(`https://www.carepet.site/api/reviews?productId=${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error: ', error);
            alert("서버 오류 발생");
        }
    };
    
    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://www.carepet.site/api/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 저장소에서 가져오기
                    },
                });
                setFormData((prev) => ({
                    ...prev,
                    nickname: response.data.nickname,
                    photo: response.data.photo || '',
                }));
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    return (
        <Box>
            {reviews.map((review) => (
                <Card 
                    key={review.reviewId} 
                    variant="outlined" 
                    sx={{ 
                        marginBottom: 2, 
                        padding: 2 
                    }}>
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        marginBottom={1}>
                        <Avatar 
                            sx={{ 
                                marginRight: 2 
                            }}>
                            {review.userId}
                        </Avatar>
                        <Typography 
                            variant="body1" 
                            fontWeight="bold">
                            {review.nickname} 
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                        {review.image && (
                            <Box 
                                component="img" 
                                src={review.image} 
                                alt="review" 
                                sx={{ 
                                    width: 100, 
                                    height: 100, 
                                    marginRight: 2, 
                                    objectFit: 'cover', 
                                    borderRadius: 2 
                                }}
                            />
                        )}
                        <Box>
                            <Rating name="half-rating" value={review.rating} precision={1} readOnly />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    marginTop: 1 
                                }}>
                                {review.comment}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default ReviewList;