import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Avatar, Rating } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const ReviewList = ({ product }) => {
    const [reviews, setReviews] = useState([]);
    const productId = product.productId;

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/reviews?productId=${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            console.log(data);
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
                            {review.userId} {/* 임시 사용자 ID */}
                        </Avatar>
                        <Typography 
                            variant="body1" 
                            fontWeight="bold">
                            사용자 {review.userId} {/* 임시 사용자 이름 */}
                        </Typography>
                    </Box>
                    <Rating name="half-rating" value={review.rating} precision={1} readOnly />
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            marginTop: 1 
                        }}>
                        {review.comment}
                    </Typography>
                </Card>
            ))}
        </Box>
    );
};

export default ReviewList;
