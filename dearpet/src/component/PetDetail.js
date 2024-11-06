import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Checkbox, FormControlLabel, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const PetDetail = () => {
    const [pets, setPets] = useState([]);
    const [openPetModal, setOpenPetModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [photoPreview, setPhotoPreview] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [openPetDetail, setOpenPetDetail] = useState(false);
    const [healthAdvice, setHealthAdvice] = useState('정보를 가져오는 중입니다...');
    const [loading, setLoading] = useState(true);
    const [petData, setPetData] = useState({
        name: '',
        species: '',
        age: '',
        neutered: false,
        gender: 'MALE',
        weight: '',
        healthStatus: '',
    });

    const [editingPetData, setEditingPetData] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState(null);
    
    const handleDialogClose = () => setDialogOpen(false);
    const openDialog = (message, action) => {
        setDialogMessage(message);
        setDialogAction(() => action);
        setDialogOpen(true);
    };

    const handlePetDetailOpen = async (pet) => {
        setSelectedPet(pet);
        setOpenPetDetail(true);
        try {
            const advice = await getHealthAdvice(pet.petId);
            setHealthAdvice(advice); 
        } catch (error) {
            openDialog('건강 조언을 가져오는 데 실패했습니다.');
        }
    };
    const handlePetDetailClose = () => setOpenPetDetail(false);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('https://www.carepet.site/api/pets', {
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

    useEffect(() => {
        const fetchHealthAdvice = async () => {
            if (selectedPet) {
                setLoading(true); 
                try {
                    const advice = await getHealthAdvice(selectedPet.id);
                    setHealthAdvice(advice);
                } catch (error) {
                    setHealthAdvice("건강 조언을 가져오는 데 문제가 발생했습니다.");
                } finally {
                    setLoading(false); 
                }
            }
        };
        if (openPetDetail) {
            fetchHealthAdvice(); 
        }
    }, [openPetDetail, selectedPet]);

    const handlePetModalOpen = (pet = null) => {
        if (pet) {
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
        if (!petData.name || !petData.species || !petData.age || !petData.gender || petData.healthStatus === '' || !petData.weight) {
            openDialog('모든 필드를 입력해주세요.');
            return;
        }

        const photoUrl = photoPreview;
        const newPetData = { ...petData, photo: photoUrl };

        try {
            if (isEditMode && editingPetData) {
                const response = await axios.patch(`https://www.carepet.site/api/pets/${editingPetData.petId}`, newPetData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets(pets.map(pet => pet.petId === editingPetData.petId ? response.data : pet));
                setEditingPetData(null);
            } else {
                const response = await axios.post('https://www.carepet.site/api/pets', newPetData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets([...pets, response.data]);
            }
            handlePetModalClose();
        } catch (error) {
            console.error(error);
            openDialog('반려동물 등록/수정에 실패했습니다.');
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
            await axios.delete(`https://www.carepet.site/api/pets/${petId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setPets(pets.filter(pet => pet.petId !== petId));
        } catch (error) {
            console.error('Failed to delete pet:', error);
            openDialog('반려동물 삭제에 실패했습니다.');
        }
    };

    const getHealthAdvice = async (petId) => {
        try {
            const response = await axios.get(`https://www.carepet.site/api/pets/advice`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: { petId: petId },
            });
            const data = await response.data;
            return data;

        } catch (error) {
            console.error("Error fetching health advice:", error);
            throw error;
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: 15}}>
                        <Button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                handlePetDetailOpen(pet); 
                            }}
                            sx={{ color: '#6A47B1' }}
                        >
                            펫 맞춤 데이터 보러가기 &gt;
                        </Button>
                        </Box>
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
                        <TextField fullWidth label="이름" value={petData.name} onChange={(e) => setPetData({ ...petData, name: e.target.value })} 
                            sx={{ 
                                marginBottom: 2,
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
                            }}/>
                    </Box>
                    <TextField fullWidth label="종" value={petData.species} onChange={(e) => setPetData({ ...petData, species: e.target.value })} 
                        sx={{ 
                            marginBottom: 2,
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
                        }} />
                    <TextField fullWidth label="나이" type="number" value={petData.age} onChange={(e) => setPetData({ ...petData, age: e.target.value })} 
                        sx={{ 
                            marginBottom: 2,
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
                    <FormControl fullWidth 
                    sx={{ 
                        marginBottom: 2,
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
                    }}>
                        <InputLabel>성별</InputLabel>
                        <Select value={petData.gender} onChange={(e) => setPetData({ ...petData, gender: e.target.value })}>
                            <MenuItem value="MALE">남아</MenuItem>
                            <MenuItem value="FEMALE">여아</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel control={<Checkbox checked={petData.neutered} 
                        onChange={(e) => setPetData({ ...petData, neutered: e.target.checked })} 
                        sx={{
                            color: '#6A47B1',
                            '&.Mui-checked': {
                                color: '#6A47B1',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(106, 71, 177, 0.04)',
                            },
                        }}
                        />} label="중성화 여부" sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="몸무게" value={petData.weight} onChange={(e) => setPetData({ ...petData, weight: e.target.value })} 
                    sx={{ 
                        marginBottom: 2,
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
                    }} />
                    <TextField fullWidth label="건강상태" value={petData.healthStatus} onChange={(e) => setPetData({ ...petData, healthStatus: e.target.value })} 
                    sx={{ 
                        marginBottom: 2,
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
                    }} />
                    <Button fullWidth variant="contained" onClick={handleRegisterPet} sx={{ pt: '15px', pb: '15px', bgcolor: '#7B52E1', color: 'white', '&:hover': { bgcolor: '#6A47B1' } }}>
                        {isEditMode ? '수정하기' : '등록하기'}
                    </Button>
                </Box>
            </Modal>
            <Modal open={openPetDetail} onClose={handlePetDetailClose}>
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
                    maxWidth: '600px',
                    minHeight: '10vh',
                    overflow: 'hidden', 
                }}>
                    <h3 style={{ textAlign: 'center'}}>{selectedPet ? `${selectedPet.name}는 어떤 특성이 있나요?` : ''}</h3>
                    <IconButton 
                        onClick={handlePetDetailClose} 
                        sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8 
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                        <Typography sx={{ fontWeight: 'bold'}}>우리 {selectedPet ? selectedPet.name : ''}는...</Typography>
                    <Box sx={{ minHeight:'10vh', borderRadius:'5px', bgcolor:'#f8f8f8', display:'flex', justifyContent:'center', alignItems:'center', overflowY: 'auto',}}>
                        <Typography>{loading ? '정보를 가져오는 중입니다...' : healthAdvice}</Typography>
                    </Box>
                </Box>
            </Modal>

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
                <DialogTitle>알림</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ color: '#7B52E1' }}>취소</Button>
                    <Button onClick={() => { handleDialogClose(); if (dialogAction) dialogAction(); }} sx={{ color: 'white', bgcolor: '#7B52E1', '&:hover': { bgcolor: '#6A47B1' } }}>확인</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PetDetail;
