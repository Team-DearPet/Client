import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, Typography, Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem, FormControl } from '@mui/material';
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

export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [emailFront, setEmailFront] = useState("");
  const [emailBack, setEmailBack] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("custom");
  const [nickname, setNickname] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sentVerificationCode, setSentVerificationCode] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });
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
      const response = await fetch(`https://www.carepet.site/api/auth/check-username?username=${id}`);
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValidations({
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      isLongEnough: value.length >= 8,
    });
  };

  const handleEmailBackChange = (e) => {
    const value = e.target.value;
    setSelectedDomain(value);
    setEmailBack(value !== "custom" ? value : "");
  };

  const handleEmailVerification = async () => {
    if (!emailFront || !emailBack) {
      openDialog("이메일을 올바르게 입력해주세요.");
      return;
    }
    const fullEmail = `${emailFront}@${emailBack}`;
    try {
      const response = await fetch("https://www.carepet.site/api/auth/send-verification-code", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: fullEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        setSentVerificationCode(data.verificationCode);
        openDialog("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
      } else {
        openDialog("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("이메일 인증번호 발송 오류:", error);
    }
  };

  const handleVerificationCodeCheck = () => {
    if (verificationCode === sentVerificationCode) {
      setIsEmailVerified(true);
      openDialog("이메일 인증이 완료되었습니다.");
    } else {
      openDialog("인증번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isUsernameChecked) {
      openDialog("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!isEmailVerified) {
      openDialog("이메일 인증을 완료해주세요.");
      return;
    }

    if (!Object.values(passwordValidations).every(Boolean)) {
      openDialog("비밀번호가 유효하지 않습니다. 모든 조건을 충족시켜 주세요.");
      return;
    }

    const userData = {
      username: id,
      password: password,
      email: `${emailFront}@${emailBack}`,
      nickname: nickname,
    };

    try {
      const response = await fetch("https://www.carepet.site/api/auth/signup", {
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
            {/* 아이디 입력 및 중복 확인 */}
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
                  width: '150px',
                  height: '56px',
                  bgcolor: '#7B52E1',
                  color: 'white',
                  fontSize: '0.9rem',
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

            {/* 비밀번호 입력 */}
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
              onChange={handlePasswordChange}
              sx={{ mb: 1, mt: 1 }}
            />
            <Box sx={{ alignSelf: 'flex-start', mt: 1, display: 'flex', flexDirection: 'row', gap: 2}}>
              <Typography
                variant="body2"
                sx={{ color: passwordValidations.hasLowerCase ? 'green' : 'red' }}
              >
                영어 소문자 포함
              </Typography>
              <Typography variant="body2" sx={{ color: passwordValidations.hasNumber ? 'green' : 'red', ml: 2 }}>
                숫자 포함
              </Typography>
              <Typography variant="body2" sx={{ color: passwordValidations.hasSpecialChar ? 'green' : 'red', ml: 2 }}>
                특수문자 포함
              </Typography>
              <Typography variant="body2" sx={{ color: passwordValidations.isLongEnough ? 'green' : 'red', ml: 2 }}>
                8자리 이상
              </Typography>
            </Box>

            {/* 닉네임 입력 */}
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem' }}>
              닉네임
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="nickname"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              sx={{ mb: 1, mt: 1 }}
            />

            {/* 이메일 입력 및 인증 */}
            <Typography variant="body1" sx={{ alignSelf: 'flex-start', mt: 1, fontWeight: '500', fontSize: '1.2rem' }}>
              이메일
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="emailFront"
                type="text"
                id="emailFront"
                value={emailFront}
                onChange={(e) => setEmailFront(e.target.value)}
                placeholder="이메일"
                sx={{ mb: 1, mt: 1 }}
              />
              <Typography sx={{ mt: 3 }}>@</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="emailBack"
                type="text"
                id="emailBack"
                value={emailBack}
                onChange={(e) => setEmailBack(e.target.value)}
                placeholder="도메인"
                disabled={selectedDomain !== "custom"}
                sx={{ mb: 1, mt: 1 }}
              />
              <FormControl sx={{ mt: 1, minWidth: 120, '& .MuiOutlinedInput-root': {
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
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#7B52E1',
              }, }}>
                <Select
                  value={selectedDomain}
                  onChange={handleEmailBackChange}
                >
                  <MenuItem value="gmail.com">gmail.com</MenuItem>
                  <MenuItem value="naver.com">naver.com</MenuItem>
                  <MenuItem value="nate.com">nate.com</MenuItem>
                  <MenuItem value="custom">직접 입력</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="outlined"
              onClick={handleEmailVerification}
              sx={{
                mt: 1,
                mb: 2,
                fontSize: '1.1rem',
                width: '100%',
                bgcolor: '#7B52E1',
                color: 'white',
                height: '50px',
                border: 'none',
                '&:hover': { bgcolor: '#6A47B1' },
              }}
            >
              인증번호 발송
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="verificationCode"
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호 입력"
                sx={{ mb: 1, mt: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleVerificationCodeCheck}
                disabled={sentVerificationCode === '' }
                sx={{
                  width: '150px',
                  bgcolor: '#7B52E1',
                  color: 'white',
                  fontSize: '0.9rem',
                  height: '56px',
                  marginLeft: '10px',
                  border: 'none',
                  '&:hover': { bgcolor: '#6A47B1' },
                }}
              >
                인증번호 확인
              </Button>
            </Box>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="signup-button"
              onClick={handleSubmit}
              style={{ backgroundColor: '#7B52E1', height: '50px' }}
            >
              <div style={{ fontWeight: '500', fontSize: '1.2rem' }}>회원가입</div>
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