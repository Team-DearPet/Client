import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import banner1 from '../images/banner1.jpg';
import banner2 from '../images/banner2.jpg';
import banner3 from '../images/banner3.jpg';
import banner4 from '../images/banner4.jpg';
import mainImage from "../images/main2.png"

const Carousel = () => {
  const settings = {
    dots: false,               
    infinite: true,            
    speed: 500,                
    slidesToShow: 1,           
    slidesToScroll: 1,         
    autoplay: true,            
    autoplaySpeed: 3000,
  };

  const items = [
    {image: mainImage, link: '#'},
    {image: banner1, link: '/map'},
    {image: banner2, link: '/emergency'},
    {image: banner3, link: '#'},
    {image: banner4, link: '#'}
  ];

  return (
    <Box sx={{ width: '80%', margin: '0 auto', mt: 4 }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Link to={item.link}>
            <Card key={index} sx={{ maxWidth: '100%', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                height="auto"
                image={item.image}
              />
            </Card>
          </Link>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
