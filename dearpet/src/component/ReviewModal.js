import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton, Rating, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ReviewModal = ({ open, item, onClose, onSubmit }) => {
  const [images, setImages] = useState([]);
  const [review, setReview] = useState('');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageRemove = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleSubmit = () => {
    onSubmit(item, review);
    setReview('');
    setImages([]); 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
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
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: 2 
          }}
        >
          <h3 style={{ margin: 0 }}>리뷰 등록</h3>
        </Box>

        {item && (
          <>
            <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>별점</Typography>
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
              </Box>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{
                  borderColor: '#AC92ED !important',
                  marginTop: 1,
                  color: '#AC92ED',
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: '#E0D7F8',
                  },
                }}
              >
                이미지 업로드
                <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
              {images.map((image) => (
                <Box key={image} sx={{ position: 'relative', margin: 1 }}>
                  <img src={image} alt="review" style={{ width: 50, height: 50 }} />
                  <IconButton
                    onClick={() => handleImageRemove(image)}
                    sx={{ position: 'absolute', bottom: -15, right: -15 }}
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
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              sx={{ marginTop: 2 }}
            />

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button sx={{
              marginTop: '10px', 
              bgcolor: '#7B52E1',
              color: 'white',
              '&:hover': {
                  bgcolor: '#6A47B1'
              }
              }} onClick={handleSubmit}>등록</Button>
          </Box>
          </>
        )}
      </Box>
    </Modal>

  );
};

export default ReviewModal;
