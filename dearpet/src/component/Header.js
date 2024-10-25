import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Button, Link, IconButton } from '@mui/material';
import { Person } from '@mui/icons-material';
import boneLogo from '../images/bone.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', padding: '0 20px', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ flex: 1, marginLeft: '10vw' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: '700', cursor: 'pointer', fontFamily: 'Fredoka, sans-serif !important', color:'black' }}>
              CarePet
              <img style={{width: '23px'}} src={boneLogo} alt='로고'></img>
            </Typography>
          </Link>      
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {isLoggedIn ? (
            <>
              <Link href="/map" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                인근병원검색
                </Link>
              <Link href="/emergency" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                응급처치
              </Link>
              <Link href="/mypage" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                마이페이지
                </Link>
              <Link href="/cart" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                장바구니
              </Link>
              <Button onClick={handleLogin} underline="none" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'black' }}>
                로그아웃
              </Button>
            </>
          ):(
            <>
              <Link href="/login" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                로그인
              </Link>
              <Link href="/signup" underline="none" sx={{ fontWeight: 'bold', color: 'black' }}>
                회원가입
              </Link>
              {/* 로그인 임시버튼 */}
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
