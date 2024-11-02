import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, Typography, Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../style/SignUp.css';
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
            backgroundColor: '#F5F5F5',
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
              borderColor: '#7B52E1', // 마우스를 올렸을 때 보라색
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7B52E1', // 클릭되었을 때 보라색
            },
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
  const [nickname, setNickname] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const navigate = useNavigate();

  const openDialog = (message, action) => {
    setDialogMessage(message);
    setDialogAction(() => action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const checkUsernameAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/check-username?username=${id}`);
      const isAvailable = await response.json();
      if (isAvailable) {
        openDialog("아이디 사용 가능", () => setIsUsernameChecked(true));
      } else {
        openDialog("아이디가 이미 사용 중입니다.", () => setIsUsernameChecked(false));
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isUsernameChecked) {
      openDialog("아이디 중복 확인을 해주세요.");
      return;
    }

    const userData = {
      username: id,
      password: password,
      email: email,
      nickname: nickname,
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
        openDialog("회원가입이 완료됐습니다!", () => navigate("/login"));
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
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem', marginTop:'-20px' }}>
              아이디
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                name="id"
                autoComplete="id"
                autoFocus
                value={id}
                onChange={(e) => { setId(e.target.value); setIsUsernameChecked(false); }}
                sx={{ mb: 1, mt: 1 }}
              />
              <Button variant="outlined" onClick={checkUsernameAvailability} sx={{
                  width: '100px',
                  height: '50px',
                  bgcolor: '#7B52E1',
                  color: 'white',
                  fontSize: '0.8rem',
                  marginLeft: '10px',
                  fontWeight: '500',
                  border: 'none', 
                  '&:hover': {
                    bgcolor: '#6A47B1'
                  }
                }}>
                중복 확인
              </Button>
            </Box>
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
              sx={{ mb: 1, mt: 1 }}
            />
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem' }}>
              닉네임
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              type="text"
              id="nickname"
              autoComplete="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              sx={{ mb: 1, mt: 1 }}
            />
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem' }}>
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
              sx={{ mb: 1, mt: 1 }}
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
              <div style={{ fontWeight: '500', fontSize:"1.2rem"}}>회원가입</div>
            </Button>
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
          <Button onClick={() => { handleDialogClose(); if (dialogAction) dialogAction(); }} sx={{ color: 'white', bgcolor: '#7B52E1', '&:hover': { bgcolor: '#6A47B1' } }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
