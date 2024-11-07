import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton, Rating, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewFormModal = ({ open, item, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReviewed, setUserReviewed] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);

  useEffect(() => {
    if (open && item) {
      setHasReviewed(item.reviewed);

      if (item.reviewed) {
        const fetchUserReview = async () => {
          const accessToken = localStorage.getItem('token');
          try {
            const response = await fetch(`https://www.carepet.site/api/reviews/user`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            });
            if (!response.ok) {
              throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            const matchingReview = data.find((review) => review.productId === item.productId);

            if (matchingReview) {
              setReviewRating(matchingReview.rating);
              setReviewText(matchingReview.comment);
              setImages(matchingReview.image ? [matchingReview.image] : []);
              setUserReviewed(matchingReview);
            }
          } catch (error) {
            console.error('Error: ', error);
            alert("서버 오류 발생");
          }
        };
        fetchUserReview();
      } else {
        setReviewRating(0);
        setReviewText('');
        setImages([]);
      }
    }
  }, [open, item]);

  const handleImageRemove = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImagePreviews]);
  };

  const handleDialogOpen = (message, action) => {
    setDialogMessage(message);
    setDialogAction(() => action );
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      if (hasReviewed) {
        const response = await axios.patch(
          `https://www.carepet.site/api/reviews/${userReviewed.reviewId}`,
          {
            rating: reviewRating,
            comment: reviewText,
            image: images[0] || '',
          },
          { headers }
        );
        onSubmit(userReviewed, response.data);
        handleDialogOpen('리뷰 수정 완료!<br />리뷰 페이지로 이동하시겠습니까?', () => {
          navigate(`/detail/${item.productId}`);
        });
      } else {
        const response = await axios.post(
          `https://www.carepet.site/api/products/${item.productId}/reviews`,
          {
            productId: item.productId,
            rating: reviewRating,
            comment: reviewText,
            image: images[0] || '',
          },
          { headers }
        );
        onSubmit(item, response.data);
        handleDialogOpen('리뷰 등록 완료!<br />리뷰 페이지로 이동하시겠습니까?', () => {
          navigate(`/detail/${item.productId}`);
        });
      }

      setReviewText('');
      setImages([]);
      setReviewRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response) {
        console.error('Response error data:', error.response.data);
      }
    }
  };

  const handleDeleteReview = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://www.carepet.site/api/reviews/${userReviewed.reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        handleDialogOpen('리뷰 삭제 완료!<br />리뷰 페이지로 이동하시겠습니까?', () => {
          navigate(`/detail/${item.productId}`);
        });
        
    } catch (error) {
        console.error('Failed to delete review:', error);
        alert('리뷰 삭제에 실패했습니다.');
    }
};

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: 450,
            padding: 4,
            margin: 'auto',
            marginTop: '10%',
            backgroundColor: 'white',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            {hasReviewed ? '리뷰 수정' : '리뷰 등록'}
          </Typography>

          {item && (
            <>
              <Typography sx={{ fontWeight: 'bold', marginBottom: 2 }}>{item.name}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>별점</Typography>
                  <Rating
                    name="reviewRating"
                    value={reviewRating}
                    onChange={(event, newValue) => setReviewRating(newValue)}
                    precision={1}
                  />
                </Box>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                    borderColor: '#AC92ED !important',
                    color: '#AC92ED',
                    '&:hover': {
                      backgroundColor: '#E0D7F8',
                    },
                  }}
                >
                  이미지 업로드
                  <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', margin: 1 }}>
                  <img src={image} alt={`review-${index}`} style={{ width: 50, height: 50 }} />
                  <IconButton
                    onClick={() => handleImageRemove(image)}
                    sx={{ position: 'absolute', top: -10, right: -10 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

              <TextField
                label="리뷰 내용"
                multiline
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                fullWidth
                sx={{
                  marginTop: 2,
                  '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#6A47B1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6A47B1',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#6A47B1',
                  },
                },

                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, gap: 2 }}>
                {hasReviewed && (
                  <Button
                    variant="contained"
                    onClick={handleDeleteReview}
                    sx={{
                      backgroundColor: '#E57373',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#D32F2F',
                      },
                    }}
                  >
                    삭제
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleReviewSubmit}
                  sx={{
                    backgroundColor: '#7B52E1',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#6A47B1',
                    },
                  }}
                >
                  {hasReviewed ? '수정' : '등록'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText dangerouslySetInnerHTML={{ __html: dialogMessage }} />
        </DialogContent>
        <DialogActions sx={{ mr: '15px', mb: '15px' }}>
          <Button onClick={handleDialogClose} sx={{ color: '#7B52E1' }}>취소</Button>
          <Button
            onClick={() => {
              handleDialogClose();
              if (dialogAction) dialogAction();
            }}
            sx={{
              color: 'white',
              bgcolor: '#7B52E1',
              '&:hover': {
                bgcolor: '#6A47B1',
              },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewFormModal;