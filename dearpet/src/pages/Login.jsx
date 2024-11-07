import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, Typography, Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#7B52E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7B52E1',
            },
          },
        },
      },
    },
  },
});

export default function Login({ setIsLoggedIn, setUserId }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const openDialog = (message) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      username: id,
      password: password,
    };

    try {
      const response = await fetch("https://www.carepet.site/api/auth/login", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const token = await response.text(); 
        localStorage.setItem('token', token); 
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', id);
        setIsLoggedIn(true); 
        setUserId(id);

        navigate("/");
      } else {
        openDialog("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
      
    } catch (error) {
      console.error('Error:', error);
      openDialog("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://www.carepet.site/oauth2/authorization/google";
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://www.carepet.site/oauth2/authorization/kakao";
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
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem', marginTop: '-20px' }}>
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
              sx={{ mb: 1, mt: 1 }}
            />
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem' }}>
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
              sx={{ mb: 2, mt: 1 }}
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
              onClick={handleGoogleLogin}
              startIcon={<img
                className='icon-image'
                src={require('../images/Google.jpg')}
                alt="Google"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
            >
              <div style={{fontSize:"1.2rem"}}>구글로 시작하기</div>
            </Button>

            <Button
              fullWidth
              variant="outlined"
              style={{height:"50px"}}
              onClick={handleKakaoLogin}
              startIcon={<img
                className='icon-image'
                src={require('../images/kakao.jpg')}
                alt="kakao"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
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

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: '15px', mb: '15px' }}>
          <Button onClick={handleDialogClose} sx={{ color: '#7B52E1' }}>취소</Button>
          <Button onClick={handleDialogClose} sx={{ color: 'white', bgcolor: '#7B52E1', '&:hover': { bgcolor: '#6A47B1' } }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
