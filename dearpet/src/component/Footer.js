import React from 'react';
import { Box, Typography, Link, Grid2 } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import boneLogo from '../images/bone.png';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        marginTop: 'auto',
        borderTop: '1px solid #dee2e6',
        
      }}
    >
      <Grid2 container spacing={2} justifyContent="space-between" alignItems="center" sx={{ maxWidth: '1000px', margin: '0 auto'}}>
        <Grid2 item xs={12} sm={4} textAlign="center">
          <Typography variant="h4" component="div" sx={{ fontWeight: '700', cursor: 'pointer', fontFamily: 'Fredoka, sans-serif !important', color:'black' }}>
            CarePet
            <img style={{width: '23px'}} src={boneLogo} alt='로고'></img>
          </Typography>
          <Typography variant="body2">Email: ureca.carepet@gmail.com</Typography>
          <Typography variant="body2">Phone: +82 (010) 7175-4872</Typography>
        </Grid2>

        <Grid2 item xs={12} sm={4} textAlign="center">
        <Link href="#" underline="none" variant="body2" sx={{ margin: '0 10px', color:'black' }}>
            about us
          </Link>
          <Link href="#" underline="none" variant="body2" sx={{ margin: '0 10px', color:'black' }}>
            개인정보 처리 방침
          </Link>
          <Link href="#" underline="none" variant="body2" sx={{ margin: '0 10px', color:'black' }}>
            이용 약관
          </Link>
        </Grid2>

        <Grid2 item xs={12} sm={4} textAlign="center">
          <Typography variant="body2">Follow us:</Typography>
          <Box>
            <Link href="#" aria-label="Facebook" sx={{ margin: '0 10px' }}>
              <FacebookIcon />
            </Link>
            <Link href="#" aria-label="Twitter" sx={{ margin: '0 10px' }}>
              <TwitterIcon />
            </Link>
            <Link href="#" aria-label="Instagram" sx={{ margin: '0 10px' }}>
              <InstagramIcon />
            </Link>
          </Box>
        </Grid2>

      </Grid2>
    </Box>
  );
};

export default Footer;
