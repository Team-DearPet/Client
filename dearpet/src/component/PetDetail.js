import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const PetDetail = () => {
    const [pets, setPets] = useState([]);
    const [openPetModal, setOpenPetModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // 등록/수정 모드 관리
    const [photoPreview, setPhotoPreview] = useState(null);
    const [petData, setPetData] = useState({
        name: '',
        species: '',
        age: '',
        neutered: false,
        gender: 'MALE',
        weight: '',
        healthStatus: '',
    });

    const [editingPetData, setEditingPetData] = useState(null); // 수정할 반려동물 데이터

    useEffect(() => {
        // 반려동물 데이터 가져오기
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/pets', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets(response.data);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        };

        fetchPets();
    }, []);

    const handlePetModalOpen = (pet = null) => {
        if (pet) {
            // 수정 모드
            setIsEditMode(true);
            setEditingPetData(pet);
            setPetData({
                name: pet.name,
                species: pet.species,
                age: pet.age,
                neutered: pet.neutered,
                gender: pet.gender,
                weight: pet.weight,
                healthStatus: pet.healthStatus,
            });
            setPhotoPreview(pet.photo);
        } else {
            // 등록 모드
            setIsEditMode(false);
            setPetData({
                name: '',
                species: '',
                age: '',
                neutered: false,
                gender: 'MALE',
                weight: '',
                healthStatus: '',
            });
            setPhotoPreview(null);
        }
        setOpenPetModal(true);
    };

    const handlePetModalClose = () => setOpenPetModal(false);

    const handleRegisterPet = async () => {
        // 필수 입력 필드 확인
        if (!petData.name || !petData.species || !petData.age || !petData.gender || petData.healthStatus === '' || !petData.weight) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const photoUrl = photoPreview;

        const newPetData = {
            ...petData,
            photo: photoUrl,
        };

        try {
            if (isEditMode && editingPetData) {
                // 수정 모드에서의 처리
                const response = await axios.put(`http://localhost:8080/api/pets/${editingPetData.petId}`, newPetData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets(pets.map(pet => pet.petId === editingPetData.petId ? response.data : pet));
            } else {
                // 등록 모드에서의 처리
                const response = await axios.post('http://localhost:8080/api/pets', newPetData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets([...pets, response.data]);
            }

            handlePetModalClose();
        } catch (error) {
            console.error(error);
            alert('반려동물 등록/수정에 실패했습니다.');
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPetData((prev) => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDeletePet = async (petId) => {
        try {
            await axios.delete(`http://localhost:8080/api/pets/${petId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setPets(pets.filter(pet => pet.petId !== petId));
        } catch (error) {
            console.error('Failed to delete pet:', error);
            alert('반려동물 삭제에 실패했습니다.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 800, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>프로필</Typography>
                <Button onClick={() => handlePetModalOpen()} sx={{
                    width: '50px',
                    bgcolor: '#7B52E1',
                    color: 'white',
                    '&:hover': { bgcolor: '#6A47B1' }
                }}>추가</Button>
            </Box>
            {pets.map((pet) => (
                <Card key={pet.petId} onClick={() => handlePetModalOpen(pet)} style={{ margin: '10px 0', width: '100%', maxWidth: 800, display: 'flex', alignItems: 'center', backgroundColor:'#F7F4FD', cursor: 'pointer' }}>
                    <CardContent sx={{ flexGrow: 1, marginLeft:'1vw' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold'}}>{pet.name}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>종</span> {pet.species}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>나이</span> {pet.age} 살</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>성별</span> {pet.gender === 'MALE' ? '남아' : '여아'}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>중성화</span> {pet.neutered ? 'O' : 'X'}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>몸무게</span> {pet.weight} kg</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>건강상태</span> {pet.healthStatus}</Typography>
                    </CardContent>
                    <Avatar src={photoPreview} sx={{ width: 100, height: 100, marginRight: '20px' }}>
                        {!photoPreview && <PetsIcon sx={{ fontSize: 80 }}/>}
                    </Avatar>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleDeletePet(pet.petId); }}>
                        <DeleteIcon />
                    </IconButton>
                </Card>
            ))}
            <Modal open={openPetModal} onClose={handlePetModalClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px',
                    width: '80%', maxWidth: '500px'
                }}>
                    <h3 style={{ textAlign: 'center' }}>{isEditMode ? '마이펫 수정' : '마이펫 등록'}</h3>
                    <IconButton onClick={handlePetModalClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Box sx={{ position: 'relative', marginRight: 2 }}>
                            <Avatar src={photoPreview} sx={{ width: 100, height: 100, border: 'solid 2px #d9d9d9' }}>
                                {!photoPreview && <PetsIcon sx={{ fontSize: 80 }}/>}
                            </Avatar>
                            <IconButton variant="contained" component="label" sx={{
                                border: 'solid 2px #d9d9d9', bgcolor: 'white', position: 'absolute',
                                bottom: 5, left: 40, transform: 'translate(50%, 50%)'
                            }}>
                                <CameraAltIcon />
                                <input type="file" hidden onChange={handlePhotoUpload} />
                            </IconButton>
                        </Box>
                        <TextField label="이름" value={petData.name} onChange={(e) => setPetData({ ...petData, name: e.target.value })} />
                    </Box>
                    <TextField fullWidth label="종" value={petData.species} onChange={(e) => setPetData({ ...petData, species: e.target.value })} sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="나이" type="number" value={petData.age} onChange={(e) => setPetData({ ...petData, age: e.target.value })} sx={{ marginBottom: 2 }} />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>성별</InputLabel>
                        <Select value={petData.gender} onChange={(e) => setPetData({ ...petData, gender: e.target.value })}>
                            <MenuItem value="MALE">남아</MenuItem>
                            <MenuItem value="FEMALE">여아</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel control={<Checkbox checked={petData.neutered} onChange={(e) => setPetData({ ...petData, neutered: e.target.checked })} />} label="중성화 여부" sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="몸무게" value={petData.weight} onChange={(e) => setPetData({ ...petData, weight: e.target.value })} sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="건강상태" value={petData.healthStatus} onChange={(e) => setPetData({ ...petData, healthStatus: e.target.value })} sx={{ marginBottom: 2 }} />
                    <Button fullWidth variant="contained" onClick={handleRegisterPet} sx={{ bgcolor: '#7B52E1', color: 'white', '&:hover': { bgcolor: '#6A47B1' } }}>
                        {isEditMode ? '수정하기' : '등록하기'}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default PetDetail;
