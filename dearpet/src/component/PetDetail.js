import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const PetDetail = () => {
    const [pets, setPets] = useState([]);
    const [openAddPet, setOpenAddPet] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [petData, setPetData] = useState({
        photo: '',
        name: '',
        species: '',
        age: '',
        neutered: false,
        gender: 'MALE', // 기본 성별을 MALE로 설정
        weight: '',
        healthStatus: '',
        userId: localStorage.getItem('userId')
    });

    const handleAddPetOpen = () => setOpenAddPet(true);
    const handleAddPetClose = () => setOpenAddPet(false);

    const handleRegisterPet = async () => {
        // 필수 입력 필드 확인
        if (!petData.name || !petData.species || !petData.age || !petData.gender || petData.healthStatus === '' || !petData.weight) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
      
        const formData = new FormData();
        formData.append('name', petData.name);
        formData.append('species', petData.species);
        formData.append('age', petData.age);
        formData.append('neutered', petData.neutered);
        formData.append('gender', petData.gender);
        formData.append('weight', petData.weight);
        formData.append('healthStatus', petData.healthStatus);
        formData.append('photo', petData.photo); // 사진 추가
      
        try {
            const response = await axios.post('http://localhost:8080/api/pets', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
      
            setPets([...pets, response.data]);
            setPetData({
                photo: '',
                name: '',
                species: '',
                age: '',
                neutered: false,
                gender: 'MALE', // 기본 성별을 MALE로 설정
                weight: '',
                healthStatus: '',
            });
            setPhotoPreview(null);
            handleAddPetClose();
        } catch (error) {
            console.error(error);
            alert('반려동물 등록에 실패했습니다.');
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPetData((prev) => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 800, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>프로필</Typography>
                <Button sx={{
                    width: '50px',
                    bgcolor: '#7B52E1',
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#6A47B1'
                    }
                }} onClick={handleAddPetOpen}>추가</Button>
            </Box>
            {pets.map((pet, index) => (
                <Card key={index} style={{ margin: '10px 0', width: '100%', maxWidth: 800, display: 'flex', alignItems: 'center', backgroundColor:'#F7F4FD' }}>
                    <CardContent sx={{ flexGrow: 1, marginLeft:'1vw' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold'}}>{pet.name}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>종류</span> {pet.species}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>나이</span> {pet.age} 살</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>성별</span> {pet.gender}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>중성화</span> {pet.neutered ? '예' : '아니오'}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>몸무게</span> {pet.weight} kg</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>건강상태</span> {pet.healthStatus}</Typography>
                    </CardContent>
                    <Avatar 
                        src={pet.photo ? URL.createObjectURL(pet.photo) : null} 
                        sx={{ width: 100, height: 100, marginRight: '20px' }}
                    >
                        {!pet.photo && <PetsIcon sx={{ fontSize: 80 }}/>}
                    </Avatar>
                </Card>
            ))}
            <Modal open={openAddPet} onClose={handleAddPetClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                    width: '80%',
                    maxWidth: '500px'
                }}>
                    <h3 style={{ textAlign: 'center' }}>마이펫 등록</h3>
                    <IconButton 
                      onClick={handleAddPetClose} 
                      sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8 
                      }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Box sx={{ position: 'relative', marginRight: 2 }}>
                            <Avatar 
                                src={photoPreview} 
                                sx={{ width: 100, height: 100, border: 'solid 2px #d9d9d9' }}
                            >
                                {!photoPreview && <PetsIcon sx={{ fontSize: 80 }}/>}
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
                        <TextField margin="dense" label="이름" value={petData.name} onChange={(e) => setPetData({ ...petData, name: e.target.value })} fullWidth/>
                    </Box>
                    <TextField margin="dense" label="종류" value={petData.species} onChange={(e) => setPetData({ ...petData, species: e.target.value })} fullWidth />
                    <TextField margin="dense" label="나이" value={petData.age} onChange={(e) => setPetData({ ...petData, age: e.target.value })} fullWidth />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>성별</InputLabel>
                        <Select
                            value={petData.gender}
                            onChange={(e) => setPetData({ ...petData, gender: e.target.value })}
                        >
                            <MenuItem value="MALE">남아</MenuItem>
                            <MenuItem value="FEMALE">여아</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel 
                        control={
                            <Checkbox
                                checked={petData.neutered}
                                onChange={(e) => setPetData({ ...petData, neutered: e.target.checked })}
                            />
                        } 
                        label="중성화 여부"
                    />
                    <TextField margin="dense" label="몸무게 (kg)" value={petData.weight} onChange={(e) => setPetData({ ...petData, weight: e.target.value })} fullWidth />
                    <TextField margin="dense" label="건강상태" value={petData.healthStatus} onChange={(e) => setPetData({ ...petData, healthStatus: e.target.value })} fullWidth />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleRegisterPet} variant="contained" color="primary">등록</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PetDetail;
