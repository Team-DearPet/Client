import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, Box } from '@mui/material';

const Carousel = () => {
  const settings = {
    dots: false,               
    infinite: true,            
    speed: 500,                
    slidesToShow: 1,           
    slidesToScroll: 1,         
    autoplay: true,            
    autoplaySpeed: 2000,
  };

  const items = [
    { image: 'https://via.placeholder.com/600x300'},
    { image: 'https://via.placeholder.com/600x300'},
    { image: 'https://via.placeholder.com/600x300'},
  ];

  return (
    <Box sx={{ width: '80%', margin: '0 auto', mt: 4 }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Card key={index} sx={{ maxWidth: '100%' }}>
            <CardMedia
              component="img"
              height="300"
              image={item.image}
            />
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
