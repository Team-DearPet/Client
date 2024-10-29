import { Box, Avatar, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/pets', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                console.log(response.data);
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('반려동물 목록을 가져오는 데 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleMypet = () => {
        navigate('/mypet');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: 3,
                    borderRadius: 2,
                    maxWidth: 800,
                    width: '100%',
                    bgcolor: '#F7F4FD',
                    gap: 2,
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}
                >
                    마이펫
                </Typography>

                {loading ? (
                    <Typography>로딩 중...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : pets.length > 0 ? (
                    pets.map((pet) => (
                        <Box 
                            key={pet.petId} 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                width: '100%', 
                                marginTop: 2,
                            }}
                        >
                            <Avatar 
                                src={pet.photo || ''} 
                                sx={{ width: 100, height: 100, marginLeft: '1vw' }}
                            >
                                {!pet.photo && <PetsIcon sx={{ fontSize: 80 }} />}
                            </Avatar>

                            <Box sx={{ flexGrow: 1, marginLeft: '2vw' }}>
                                <Typography variant="h6">{pet.name}</Typography>
                                <Typography variant="body2" color="text.secondary" paddingTop='15px'>
                                    {pet.species}
                                </Typography>
                            </Box>

                            <Button 
                                onClick={handleMypet} 
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
                    ))
                ) : (
                    <Typography>등록된 반려동물이 없습니다.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default PetList;
