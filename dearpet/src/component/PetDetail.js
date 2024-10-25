import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';

const PetDetail = () => {
    const [pets, setPets] = useState([]);
    const [openAddPet, setOpenAddPet] = useState(false);
    const [openPetDetail, setOpenPetDetail] = useState(false);
    const [petData, setPetData] = useState({
        photo: '',
        name: '',
        type: '',
        age: '',
        gender: '',
        condition: '',
        weight: '' 
    });
    const [selectedPet, setSelectedPet] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddPetOpen = () => setOpenAddPet(true);
    const handleAddPetClose = () => setOpenAddPet(false);

    const handlePetDetailOpen = (pet) => {
        setSelectedPet(pet);
        setOpenPetDetail(true);
    };
    const handlePetDetailClose = () => setOpenPetDetail(false);

    const handleRegisterPet = () => {
      // 필수 입력 필드 확인
      if (!petData.name || !petData.type || !petData.age || !petData.gender || !petData.condition || !petData.weight) {
          setErrorMessage('모든 필드를 입력해주세요.');
          alert(errorMessage);
          return;
      }

      setPets([...pets, petData]);
      setPetData({ photo: '', name: '', type: '', age: '', gender: '', condition: '', weight: '' });
      setPhotoPreview(null); // Reset photo preview
      setErrorMessage(''); // Reset error message
      handleAddPetClose();
  };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPetData((prev) => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file)); // 미리보기
        }
    };

    const handleDeletePet = (index) => {
      setPets((prevPets) => prevPets.filter((_, i) => i !== index));
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
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>견종</span> {pet.type}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>나이</span> {pet.age} 살</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '30px' }}>성별</span> {pet.gender}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>중성화</span> {pet.condition}</Typography>
                        <Typography><span style={{ color: 'gray', marginRight: '13px' }}>몸무게</span> {pet.weight} kg</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: 15}}>
                        <Button onClick={() => handlePetDetailOpen(pet)}>
                            펫 맞춤 데이터 보러가기 &gt;
                        </Button>
                        </Box>
                    </CardContent>
                    <Box sx={{ position: 'relative' }}>
                        <Button 
                            onClick={() => handleDeletePet(index)} 
                            sx={{
                              position: 'absolute',
                              top: -50,
                              right: 10, 
                              width: 48,
                              border: '1px solid #AC92ED',
                              borderRadius: '50px',  
                              bgcolor: 'white', 
                                color: '#AC92ED', 
                                '&:hover': { bgcolor: '#E0D7F8' }  
                            }}
                        >삭제
                        </Button>
                        <Avatar 
                            src={pet.photo ? URL.createObjectURL(pet.photo) : null} 
                            sx={{ width: 100, height: 100, marginRight: '20px' }}
                        >
                            {!pet.photo && <PetsIcon sx={{ fontSize: 80 }}/>}
                        </Avatar>
                        
                    </Box>
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
                    <TextField margin="dense" label="견종" value={petData.type} onChange={(e) => setPetData({ ...petData, type: e.target.value })} fullWidth />
                    <TextField margin="dense" label="나이" type="number" value={petData.age} onChange={(e) => setPetData({ ...petData, age: e.target.value })} fullWidth />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel>성별</InputLabel>
                        <Select margin="dense" value={petData.gender} onChange={(e) => setPetData({ ...petData, gender: e.target.value })}>
                            <MenuItem value="남아">남아</MenuItem>
                            <MenuItem value="여아">여아</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel>중성화 여부</InputLabel>
                        <Select value={petData.condition} onChange={(e) => setPetData({ ...petData, condition: e.target.value })}>
                            <MenuItem value="수술 전">수술 전</MenuItem>
                            <MenuItem value="수술 후">수술 후</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField margin="dense" label="몸무게" type="number" value={petData.weight} onChange={(e) => setPetData({ ...petData, weight: e.target.value })} fullWidth />
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                      <Button sx={{
                        marginTop: '10px', 
                        bgcolor: '#7B52E1',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#6A47B1'
                        }
                        }} onClick={handleRegisterPet}>등록</Button>
                    </Box>
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
                    maxWidth: '500px'
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
                    <Box sx={{ height:'20vh', borderRadius:'5px', bgcolor:'#f8f8f8', display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <Typography>펫 맞춤 데이터</Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PetDetail;
