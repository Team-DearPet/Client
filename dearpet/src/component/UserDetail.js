import React, { useState } from 'react';
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
    nickname: '춤추는 다람쥐',
    id: 'user123',
    currentPassword: '', //현재비밀번호
    newPassword: '', //새비밀번호
    confirmNewPassword: '', //새비밀번호 확인
    email: 'test@example.com',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isIdValid, setIsIdValid] = useState(false);

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file)); // 미리보기
    }
  };

  // ID 중복 확인 핸들러 (임시)
  const handleCheckId = () => {
    const isDuplicate = formData.id === 'user123';
    setIsIdValid(!isDuplicate);
    alert(isDuplicate ? '이미 사용 중인 ID입니다.' : '사용 가능한 ID입니다.');
  };

  // 저장 (임시)
  const handleSave = () => {
    console.log('Updated User Data:', formData);
    handleClose();
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
          bgcolor: 'background.paper',
        }}
      >
        <Avatar 
        src={photoPreview} 
        sx={{ width: 100, height: 100, marginRight: 2, }}
        >
        {!formData.photo && <PersonIcon sx={{ fontSize: 80 }}/>}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{formData.nickname}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.email}
          </Typography>
        </Box>

        <Button 
          onClick={handleOpen} 
          sx={{ 
            width: 48,
            borderRadius: '50px',  
            bgcolor: '#d9d9d9', 
            color: 'white', 
            '&:hover': { bgcolor: '#9f9f9f' } 
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
        <h3 style={{textAlign: 'center' }}>내 정보 수정창</h3>
        <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Box sx={{ position: 'relative', marginRight: 2 }}>
                <Avatar 
                src={photoPreview} 
                sx={{ width: 100, height: 100, border: 'solid 2px #d9d9d9' }}
                >
                {!photoPreview && <PersonIcon sx={{ fontSize: 80 }}/>}
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

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                margin="dense"
                label="ID"
                type="text"
                fullWidth
                name="id"
                value={formData.id}
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
        </DialogActions>
        </Dialog>

    </Box>
  );
};

export default UserDetail;
