import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

const ReviewFormModal = ({ open, item, onClose, onSubmit }) => {
  const [images, setImages] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImagePreviews]);
  };

  const handleImageRemove = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleReviewSubmit = async () => {
    console.log(item.productId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://3.34.219.248/api/products/${item.productId}/reviews`,
        {
          productId: item.productId,
          rating: reviewRating,
          comment: reviewText,
          image: images[0] || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onSubmit(item, response.data);
      setReviewText("");
      setImages([]);
      setReviewRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 450,
          padding: 4,
          margin: "auto",
          marginTop: "10%",
          backgroundColor: "white",
          borderRadius: 2,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
          리뷰 등록
        </Typography>

        {item && (
          <>
            <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
              {item.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                  borderColor: "#AC92ED !important",
                  color: "#AC92ED",
                  "&:hover": {
                    backgroundColor: "#E0D7F8",
                  },
                }}
              >
                이미지 업로드
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: "relative", margin: 1 }}>
                  <img
                    src={image}
                    alt={`review-${index}`}
                    style={{ width: 50, height: 50 }}
                  />
                  <IconButton
                    onClick={() => handleImageRemove(image)}
                    sx={{ position: "absolute", top: -10, right: -10 }}
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
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#6A47B1",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6A47B1",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#6A47B1",
                  },
                },
              }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            >
              <Button
                variant="contained"
                onClick={handleReviewSubmit}
                sx={{
                  backgroundColor: "#7B52E1",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#6A47B1",
                  },
                }}
              >
                등록
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReviewFormModal;
