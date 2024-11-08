import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Link, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import boneLogo from '../images/bone.png';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(
    () => parseInt(localStorage.getItem('timeLeft')) || 3600
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('timeLeft');
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timer);
            handleLogout();
            return 0;
          }
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoggedIn]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', padding: '0 20px', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, marginLeft: '10vw' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: '700', cursor: 'pointer', fontFamily: 'Fredoka, sans-serif !important', color: 'black' }}>
              CarePet
              <img style={{ width: '23px' }} src={boneLogo} alt='로고' />
            </Typography>
          </Link>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {isLoggedIn ? (
            <>
            <Tooltip title="로그인 유효 시간" arrow>
              <Typography sx={{ fontWeight: '600', fontSize: '0.9rem', color: 'gray' }}>
                {formatTime(timeLeft)}
              </Typography>
            </Tooltip>
              <Link href="/map" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                인근병원검색
              </Link>
              <Link href="/emergency" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                응급처치
              </Link>
              <Link href="/mypage" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                마이페이지
              </Link>
              <Link href="/cart" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                장바구니
              </Link>
              <Button onClick={handleLogout} sx={{ fontWeight: '600', fontSize: '0.99rem', color: 'black' }}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link href="/map" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                인근병원검색
              </Link>
              <Link href="/emergency" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                응급처치
              </Link>
              <Link href="/login" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                로그인
              </Link>
              <Link href="/signup" underline="none" sx={{ fontWeight: '600', color: 'black' }}>
                회원가입
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
