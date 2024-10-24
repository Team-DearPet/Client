import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../style/Login.css';  // 스타일을 위한 CSS 파일
import boneLogo from '../images/bone.png';

// Material UI 테마
const theme = createTheme({
  typography: {
    allVariants: {
      color: '#000', // 모든 텍스트 색상을 검은색으로 설정
      fontWeight: 'normal', // 모든 텍스트 굵기 제거
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000', // 버튼 배경색을 검은색으로 설정
          color: '#fff', // 버튼 글씨 색상을 흰색으로 설정
          '&:hover': {
            backgroundColor: '#333', // 버튼 hover 시 어두운 색상으로 변경
          },
        },
        outlined: {
          color: '#000', // outlined 버튼 글씨 색상을 검은색으로 설정
          borderColor: '#000', // outlined 버튼 테두리 색상을 검은색으로 설정
          '&:hover': {
            borderColor: '#333', // outlined 버튼 hover 시 테두리 색상 변경
            backgroundColor: '#f5f5f5', // hover 시 배경색 변경
          },
        },
      },
    },
  },
});

export default function Login({ setIsLoggedIn, setUserId }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  // 로컬 로그인 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      username: id,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const textResponse = await response.text(); 

      if (response.ok) {
        const token = textResponse;  // JWT 토큰 문자열 처리
        console.log('Login successful:', token);
        localStorage.setItem('token', token);  // 로그인 토큰 저장
        localStorage.setItem('isLoggedIn', true);  // 로그인 상태 저장
        localStorage.setItem('userId', id);
        setIsLoggedIn(true);  // 상태 업데이트

      } else {
        console.error('Login failed:', textResponse);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="main-content">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: '700', cursor: 'pointer', fontFamily: 'Fredoka, sans-serif !important', color:'black', fontSize: '3.5rem', marginBottom:'10px'}}>
              CarePet
              <img style={{width: '40px'}} src={boneLogo} alt='로고'></img>
            </Typography>
      </Link>  
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="login-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 가운데 정렬
            }}
          >
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', textShadow: 'none', marginTop:'-20px', fontSize:'1.5rem' }}
            >
              아이디
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#7B52E1',
                  },
                }}}
              />

            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', textShadow: 'none', fontSize:'1.5rem' }}
            >
              비밀번호
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#7B52E1',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="login-button"
              onClick={handleSubmit}
              style={{backgroundColor:"#7B52E1"}}
            >
              로그인
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img
                className='icon-image'
                src={require('../images/Google.jpg')}
                alt="Google"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
            >
              구글로 로그인
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<img
                className='icon-image'
                src={require('../images/kakao.jpg')}
                alt="kakao"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
            >
              카카오톡으로 로그인
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              회원가입하지 않으셨나요?{" "}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#7B52E1' }}>
                회원가입하러가기
              </Link>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

