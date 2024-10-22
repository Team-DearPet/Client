import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Button, Link, IconButton } from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Person, ExitToApp, AccountCircle } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // const handleMypage = () => {
  //   navigate('/mypage');
  // }

  // const handleCart = () => {
  //   navigate('/cart')
  // }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', padding: '0 20px', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Box display="flex" alignItems="center" gap={5}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: '400', cursor: 'pointer', fontFamily: 'Licorice, cursive', color:'black' }}>
              DearPet
            </Typography>
          </Link>
        
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="찾으시는 상품명을 입력해주세요."
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            sx={{
              backgroundColor: '#d9d9d9',
              width: '40vw',
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {isLoggedIn ? (
            <>
              <IconButton aria-label='Mypage'>
                <AccountCircle />
              </IconButton>
              <IconButton aria-label="Shopping Cart">
                <ShoppingCart />
              </IconButton>
              <IconButton onClick={handleLogin} aria-label="Logout">
                <ExitToApp />
              </IconButton>
            </>
          ):(
            <>
            <Link href="/login" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
            로그인
            </Link>
            <Link href="/signup" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
              회원가입
            </Link>
            <IconButton onClick={handleLogin} aria-label="Login">
                <Person />
              </IconButton>
            </>
          )}
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
