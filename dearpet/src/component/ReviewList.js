import React from 'react';
import { Box, Typography, Card, Avatar } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

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

const ReviewList = () => {
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
    );
};

export default ReviewList;
