import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../style/SignUp.css';
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
            backgroundColor: '#F5F5F5', // hover 시 배경색 변경
          },
        },
      },
    },
  },
});
export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username: id,
      password: password,
      email: email,
      nickname: nickname
    };
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('User created:', result);
        alert("회원가입이 완료됐습니다!")
        window.location.href = "/login";
      } else {
        console.error('Error creating user');
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
        <Container component="main" maxWidth="xs" className="signup-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', fontSize: '1.2rem', marginTop:'-20px' }}
            >
              아이디
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              name="id"
              autoComplete="id"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{
                mb: 1,
                mt: 1,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', fontSize: '1.2rem' }}
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
                mb: 1,
                mt: 1,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              닉네임
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              type="nickname"
              id="nickname"
              autoComplete="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              sx={{
                mb: 1,
                mt: 1,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              이메일
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 1,
                mt: 1,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  height: '50px',
                  '&:focus': {
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="signup-button"
              onClick={handleSubmit}
              style={{backgroundColor:'#7B52E1', height:"50px"}}
            >
              <div style={{fontSize:"1.2rem"}}>회원가입</div>
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}