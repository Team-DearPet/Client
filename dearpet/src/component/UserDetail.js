import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 추가
import { 
  Box, Typography, Avatar, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

const UserDetail = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    photo: '',
    nickname: '',
    username: '',
    currentPassword: '', 
    newPassword: '', 
    confirmNewPassword: '', 
    email: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isIdValid, setIsIdValid] = useState(false);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 저장소에서 가져오기
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // 미리보기
    }
  };

  const handleCheckId = () => {
    const isDuplicate = formData.username === 'user123';
    setIsIdValid(!isDuplicate);
    alert(isDuplicate ? '이미 사용 중인 ID입니다.' : '사용 가능한 ID입니다.');
  };

  const handleSave = async () => {
    // 서버에 수정된 데이터 전송
    const updatedData = { 
      ...formData,
      photo: photoPreview, 
    };

    try {
      const response = await axios.patch('http://localhost:8080/api/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Updated User Data:', response.data);
      setFormData((prev) => ({ ...prev, photo: photoPreview })); // 저장된 데이터를 다시 반영
      handleClose();
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  const handleDefaultPhoto = () => {
    setPhotoPreview('');
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('정말로 회원탈퇴 하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:8080/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('회원탈퇴가 완료되었습니다.');
        localStorage.removeItem('token');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
      } catch (error) {
        console.error('Failed to delete user account:', error);
        alert('회원탈퇴에 실패했습니다.');
      }
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
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8 
          }}
        >
          <CloseIcon />
        </IconButton>
        <h3 style={{ textAlign: 'center' }}>내 정보 수정창</h3>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Box sx={{ position: 'relative', marginRight: 2 }}>
              <Avatar 
                src={photoPreview} 
                sx={{ width: 100, height: 100, border: 'solid 2px #d9d9d9' }}
              >
                {!photoPreview && <PersonIcon sx={{ fontSize: 80 }}/> }
              </Avatar>

              <IconButton 
                variant="contained" 
                component="label" 
                sx={{
                  border: 'solid 2px #d9d9d9',
                  bgcolor: 'white', 
                  position: 'absolute', 
                  bottom: 5, 
                  left: 40, 
                  transform: 'translate(50%, 50%)'
                }}
              >
                <CameraAltIcon />
                <input type="file" hidden onChange={handlePhotoUpload} />
              </IconButton>
            </Box>

            <Box width="100%">
              <Button
                onClick={handleDefaultPhoto}
                sx={{
                  marginBottom: '5px', 
                  border: '1px solid #AC92ED', 
                  bgcolor: 'white', 
                  color: '#AC92ED', 
                  '&:hover': { bgcolor: '#E0D7F8' } 
                }}
              >
                기본이미지로 변경
              </Button>
              <TextField
                margin="dense"
                label="닉네임"
                type="text"
                fullWidth
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!isIdValid}
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
          />

          <TextField
            margin="dense"
            label="새 비밀번호"
            type="password"
            fullWidth
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
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
          />

          <TextField
            margin="dense"
            label="이메일"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
          <Button onClick={handleSave} sx={{ 
            bgcolor: '#7B52E1',
            color: 'white',
            '&:hover': {
              bgcolor: '#6A47B1'
            }
          }}>
            수정
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            회원탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetail;