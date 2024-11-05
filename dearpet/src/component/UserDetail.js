import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Avatar, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UserDetail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const [formData, setFormData] = useState({
    photo: '',
    nickname: '',
    username: '',
    email: '',
    currentPassword: '', 
    newPassword: '', 
    confirmNewPassword: '', 
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isIdValid, setIsIdValid] = useState(true);
  const [isIdChecked, setIsIdChecked] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData((prev) => ({
          ...prev,
          nickname: response.data.nickname,
          username: response.data.username,
          email: response.data.email,
          photo: response.data.photo || '',
        }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const openDialog = (message, action) => {
    setDialogMessage(message);
    setDialogAction(() => action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      setIsIdChecked(false);
    }
  };

  const handleCheckId = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/check-username?username=${formData.username}`);
      const isAvailable = await response.data;
      setIsIdValid(isAvailable);
      setIsIdChecked(true);

      if (isAvailable) {
        openDialog("사용 가능한 아이디입니다.");
      } else {
        openDialog("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      openDialog("아이디 중복 확인에 실패했습니다.");
    }
  };

  const handleSave = async () => {
    if (!isIdChecked && formData.username) {
      openDialog("아이디 중복 확인을 해야 합니다.");
      return;
    }
  
    const updatedData = { 
      nickname: formData.nickname,
      email: formData.email,
      username: formData.username,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };
  
    try {
      await axios.patch('http://localhost:8080/api/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      openDialog('회원정보가 변경되었습니다!', () => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      openDialog('프로필 업데이트에 실패했습니다.');
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5vh 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          maxWidth: 800,
          width: '100%',
          bgcolor: '#F7F4FD',
        }}
      >
        <Avatar 
          src={formData.photo} 
          sx={{ width: 100, height: 100, marginLeft: '1vw' }}
        >
          {!formData.photo && <PersonIcon sx={{ fontSize: 80 }}/> }
        </Avatar>

        <Box sx={{ flexGrow: 1, marginLeft: '2vw' }}>
          <Typography variant="h6">{formData.nickname}</Typography>
          <Typography variant="body2" color="text.secondary" paddingTop='15px'>
            {formData.email}
          </Typography>
        </Box>

        <Button 
          onClick={handleOpen} 
          sx={{
            marginRight: '1vw', 
            width: 48,
            border: '1px solid #AC92ED',
            borderRadius: '50px',  
            bgcolor: 'white', 
            color: '#AC92ED', 
            '&:hover': { bgcolor: '#E0D7F8' } 
          }}
        >
          편집
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Box sx={{ position: 'relative', marginRight: 2 }}>
              <Avatar 
                src={photoPreview} 
                sx={{ width: 100, height: 100, border: 'solid 2px #d9d9d9' }}
              >
                {!photoPreview && <PersonIcon sx={{ fontSize: 80 }}/> }
              </Avatar>
            </Box>

            <Box width="100%">
              <TextField
                margin="dense"
                label="닉네임"
                type="text"
                fullWidth
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                sx={{ 
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#6A47B1',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6A47B1',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                            color: '#6A47B1',
                        },
                    },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              margin="dense"
              label="아이디"
              type="text"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!isIdValid}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#6A47B1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6A47B1',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6A47B1',
                    },
                },
              }}
            />
            <Button 
              sx={{
                width: '100px',
                height: '55px',
                bgcolor: '#7B52E1',
                color: 'white',
                '&:hover': {
                  bgcolor: '#6A47B1'
                }
              }} 
              onClick={handleCheckId}
            >
              중복 확인
            </Button>
          </Box>

          <TextField
            margin="dense"
            label="기존 비밀번호"
            type="password"
            fullWidth
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            sx={{ 
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#6A47B1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6A47B1',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6A47B1',
                    },
                },
            }}
          />

          <TextField
            margin="dense"
            label="새 비밀번호"
            type="password"
            fullWidth
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            sx={{ 
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#6A47B1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6A47B1',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6A47B1',
                    },
                },
            }}
          />

          <TextField
            margin="dense"
            label="새 비밀번호 확인"
            type="password"
            fullWidth
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            error={formData.newPassword !== formData.confirmNewPassword}
            helperText={
              formData.newPassword !== formData.confirmNewPassword 
                ? '비밀번호가 일치하지 않습니다.' 
                : ''
            }
            sx={{ 
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#6A47B1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6A47B1',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6A47B1',
                    },
                },
            }}
          />

          <TextField
            margin="dense"
            label="이메일"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ 
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#6A47B1',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6A47B1',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6A47B1',
                    },
                },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ pt:'0px', mb: '15px', mr:'10px' }}>
          <Button onClick={handleSave} sx={{ 
            bgcolor: '#7B52E1',
            color: 'white',
            '&:hover': {
              bgcolor: '#6A47B1'
            }
          }}>
            수정
          </Button>
          <Button onClick={handleClose} sx={{color:'#6A47B1', '&:hover': { bgcolor: 'rgba(106, 71, 177, 0.1)' }}}>취소</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: '15px', mb: '15px' }}>
          <Button onClick={handleDialogClose} sx={{ color: '#7B52E1' }}>취소</Button>
          <Button onClick={() => { handleDialogClose(); if (dialogAction) dialogAction(); }} sx={{ color: 'white', bgcolor: '#7B52E1', '&:hover': { bgcolor: '#6A47B1' } }}>확인</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetail;
