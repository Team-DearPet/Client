import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../style/Login.css'; 
import boneLogo from '../images/bone.png';

const theme = createTheme({
  typography: {
    allVariants: {
      color: '#000',
      fontWeight: 'normal', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#333', 
          },
        },
        outlined: {
          color: '#000',
          borderColor: '#000',
          '&:hover': {
            borderColor: '#333',
            backgroundColor: '#f5f5f5', 
          },
        },
      },
    },
  },
});

export default function Login({ setIsLoggedIn, setUserId }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  // 로컬 로그인 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      username: id,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const token = await response.text(); 
        localStorage.setItem('token', token); 
        console.log(token)
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', id);
        setIsLoggedIn(true); 
        setUserId(id);

        navigate("/");
      } else {
        const errorText = await response.text();
        setErrorMessage("로그인에 실패했습니다. 다시 시도해 주세요."); 
        console.error('Login failed:', errorText);
      }
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };


  // Kakao 로그인 핸들러
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
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
          <Box sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}>
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 0, fontWeight: 'bold', textShadow: 'none', marginTop:'-40px', fontSize:'1.5rem' }}
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
              sx={{
                mb: 1,
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
              sx={{ alignSelf: 'flex-start', mb: 0, fontWeight: 'bold', textShadow: 'none', fontSize:'1.5rem' }}
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
              style={{backgroundColor:"#7B52E1", height:"50px", fontSize:"1.2rem"}}
            >
              로그인
            </Button>
            <Button
              fullWidth
              variant="outlined"
              style={{height:"50px"}}
              onClick={handleGoogleLogin} // Google 로그인 핸들러
              startIcon={<img
                className='icon-image'
                src={require('../images/Google.jpg')}
                alt="Google"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
              onClick={handleGoogleLogin}
            >
              <div style={{fontSize:"1.2rem"}}>구글로 시작하기</div>
            </Button>

            <Button
              fullWidth
              variant="outlined"
              style={{height:"50px"}}
              onClick={handleKakaoLogin} // Kakao 로그인 핸들러
              startIcon={<img
                className='icon-image'
                src={require('../images/kakao.jpg')}
                alt="kakao"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
              onClick={handleKakaoLogin}
            >
               <div style={{fontSize:"1.2rem"}}>카카오톡으로 시작하기</div>
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
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